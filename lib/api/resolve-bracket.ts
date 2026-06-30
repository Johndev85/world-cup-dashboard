import type { Match, GroupStanding } from "../wc2026-data"

/**
 * Resolves knockout round placeholders to actual team names.
 * Mutates allMatches in-place.
 *
 * Handles:
 * - R32 (Octavos): 1A, 2K, 3A/B/C/D/F → group standings lookup
 * - R16 (Cuartos) onwards: W74, W89, L101 → winner/loser of referenced match
 *
 * Uses multi-pass loop to cascade: R32 → R16 → QF → SF → Final
 */
export function resolveKnockoutPlaceholders(
  allMatches: Match[],
  standings: GroupStanding[]
): void {
  // Build group standings lookup
  const groupMap = new Map<string, GroupStanding["teams"]>()
  for (const group of standings) {
    groupMap.set(group.group, group.teams)
  }

  // Get 3rd-place teams from each group (index 2 after sorting)
  const thirdPlaceTeams: { group: string; team: GroupStanding["teams"][0] }[] = []
  for (const group of standings) {
    if (group.teams.length >= 3) {
      thirdPlaceTeams.push({ group: group.group, team: group.teams[2] })
    }
  }

  // Rank 3rd-place teams by points → GD → GF (top 8 advance)
  thirdPlaceTeams.sort((a, b) =>
    b.team.points - a.team.points ||
    b.team.gd - a.team.gd ||
    b.team.gf - a.team.gf
  )
  const bestThird = thirdPlaceTeams.slice(0, 8)

  // Slots that accept 3rd-place teams (from FIFA Annex C)
  const thirdPlaceSlots = [
    { matchId: 74, groups: ["A", "B", "C", "D", "F"] },
    { matchId: 77, groups: ["C", "D", "F", "G", "H"] },
    { matchId: 79, groups: ["C", "E", "F", "H", "I"] },
    { matchId: 80, groups: ["E", "H", "I", "J", "K"] },
    { matchId: 81, groups: ["B", "E", "F", "I", "J"] },
    { matchId: 82, groups: ["A", "E", "H", "I", "J"] },
    { matchId: 85, groups: ["E", "F", "G", "I", "J"] },
    { matchId: 87, groups: ["D", "E", "I", "J", "L"] },
  ]

  // Most-constrained-first assignment
  const assigned = new Map<number, { name: string; flag: string }>()
  const usedSlots = new Set<number>()

  const teamSlots = bestThird.map(({ group, team }) => {
    const validSlots = thirdPlaceSlots.filter(s => s.groups.includes(group))
    return { group, team, validSlots }
  })

  const remaining = [...teamSlots]
  while (remaining.length > 0) {
    for (const t of remaining) {
      t.validSlots = t.validSlots.filter(s => !usedSlots.has(s.matchId))
    }

    const assignable = remaining.filter(t => t.validSlots.length > 0)
    if (assignable.length === 0) break

    assignable.sort((a, b) =>
      a.validSlots.length - b.validSlots.length ||
      b.team.points - a.team.points ||
      b.team.gd - a.team.gd ||
      b.team.gf - a.team.gf
    )

    const best = assignable[0]
    const slot = best.validSlots[0]
    assigned.set(slot.matchId, { name: best.team.name, flag: best.team.flag })
    usedSlots.add(slot.matchId)

    const idx = remaining.indexOf(best)
    remaining.splice(idx, 1)
  }

  // Build match lookup by ID
  const matchById = new Map<number, Match>()
  for (const m of allMatches) {
    matchById.set(m.id, m)
  }

  // Helper: determine winner/loser of a finished match
  function getMatchResult(match: Match): { winner: { name: string; flag: string } | null; loser: { name: string; flag: string } | null } {
    if (match.status !== "finished" || match.homeScore === null || match.awayScore === null) {
      return { winner: null, loser: null }
    }

    let homeWon: boolean
    if (match.homeScore !== match.awayScore) {
      homeWon = (match.homeScore ?? 0) > (match.awayScore ?? 0)
    } else if (match.homePenalties != null && match.awayPenalties != null) {
      homeWon = match.homePenalties > match.awayPenalties
    } else {
      return { winner: null, loser: null }
    }

    const winner = { name: homeWon ? match.homeTeam : match.awayTeam, flag: homeWon ? match.homeFlag : match.awayFlag }
    const loser = { name: homeWon ? match.awayTeam : match.homeTeam, flag: homeWon ? match.awayFlag : match.homeFlag }
    return { winner, loser }
  }

  // Multi-pass resolution: keep resolving until no changes
  let changed = true
  while (changed) {
    changed = false

    for (const match of allMatches) {
      const resolveTeam = (teamName: string): { name: string; flag: string } | null => {
        // Pattern: 1X, 2X (group position)
        const simpleMatch = teamName.match(/^([12])([A-L])$/)
        if (simpleMatch) {
          const [, pos, groupLetter] = simpleMatch
          const group = groupMap.get(groupLetter)
          if (group && group.length >= 2) {
            const idx = pos === "1" ? 0 : 1
            return { name: group[idx].name, flag: group[idx].flag }
          }
          return null
        }

        // Pattern: 3X/Y/Z/... (3rd-place pool)
        if (teamName.startsWith("3") && teamName.includes("/")) {
          if (match.phase === "Octavos de Final") {
            return assigned.get(match.id) ?? null
          }
          return null
        }

        // Pattern: W## (winner of match)
        const winnerMatch = teamName.match(/^W(\d+)$/)
        if (winnerMatch) {
          const refId = parseInt(winnerMatch[1])
          const refMatch = matchById.get(refId)
          if (refMatch) {
            const { winner } = getMatchResult(refMatch)
            return winner
          }
          return null
        }

        // Pattern: L## (loser of match)
        const loserMatch = teamName.match(/^L(\d+)$/)
        if (loserMatch) {
          const refId = parseInt(loserMatch[1])
          const refMatch = matchById.get(refId)
          if (refMatch) {
            const { loser } = getMatchResult(refMatch)
            return loser
          }
          return null
        }

        return null
      }

      const homeResolved = resolveTeam(match.homeTeam)
      if (homeResolved && homeResolved.name !== match.homeTeam) {
        match.homeTeam = homeResolved.name
        match.homeFlag = homeResolved.flag
        changed = true
      }

      const awayResolved = resolveTeam(match.awayTeam)
      if (awayResolved && awayResolved.name !== match.awayTeam) {
        match.awayTeam = awayResolved.name
        match.awayFlag = awayResolved.flag
        changed = true
      }
    }
  }
}
