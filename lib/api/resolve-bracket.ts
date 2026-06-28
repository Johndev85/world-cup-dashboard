import type { Match, GroupStanding } from "../wc2026-data"

/**
 * Resolves knockout round placeholders (1A, 2K, 3A/B/C/D/F) to actual team names.
 * Mutates allMatches in-place.
 *
 * Uses FIFA Annex C logic: 8 best third-place teams advance and are assigned
 * to specific slots based on which groups they come from.
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

  // Most-constrained-first assignment:
  // Teams with fewer valid slots get assigned first to avoid conflicts
  const assigned = new Map<number, { name: string; flag: string }>()
  const usedSlots = new Set<number>()

  // Calculate valid slots for each team
  const teamSlots = bestThird.map(({ group, team }) => {
    const validSlots = thirdPlaceSlots.filter(s => s.groups.includes(group))
    return { group, team, validSlots }
  })

  // Assign iteratively: pick team with fewest valid slots, break ties by quality
  const remaining = [...teamSlots]
  while (remaining.length > 0) {
    // Filter to only slots not yet used for each team
    for (const t of remaining) {
      t.validSlots = t.validSlots.filter(s => !usedSlots.has(s.matchId))
    }

    // Remove teams with no valid slots (can't be assigned yet)
    const assignable = remaining.filter(t => t.validSlots.length > 0)
    if (assignable.length === 0) break

    // Pick the most constrained team (fewest slots), break ties by quality (best first)
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

    // Remove assigned team from remaining
    const idx = remaining.indexOf(best)
    remaining.splice(idx, 1)
  }

  // Resolve each knockout match
  for (const match of allMatches) {
    if (match.phase !== "Octavos de Final") continue

    const resolve = (teamName: string): { name: string; flag: string } | null => {
      // Simple 1X or 2X pattern
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

      // 3rd-place pool pattern: 3X/Y/Z/...
      if (teamName.startsWith("3") && teamName.includes("/")) {
        const assignedTeam = assigned.get(match.id)
        if (assignedTeam) return assignedTeam
        return null
      }

      return null
    }

    const homeResolved = resolve(match.homeTeam)
    if (homeResolved) {
      match.homeTeam = homeResolved.name
      match.homeFlag = homeResolved.flag
    }

    const awayResolved = resolve(match.awayTeam)
    if (awayResolved) {
      match.awayTeam = awayResolved.name
      match.awayFlag = awayResolved.flag
    }
  }
}
