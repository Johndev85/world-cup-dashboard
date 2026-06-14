import type { Match, Participant } from "../wc2026-data"
import { participants, PRIZES } from "../wc2026-data"

export interface LeaderboardEntry {
  id: number
  name: string
  initials: string
  teams: { name: string; flag: string }[]
  points: number
  prize: number
  firstPointDate: string
}

function getMatchPoints(match: Match, teamName: string): number {
  if (match.status !== "finished") return 0
  if (match.homeScore === null || match.awayScore === null) return 0

  const isHome = match.homeTeam === teamName
  const isAway = match.awayTeam === teamName
  if (!isHome && !isAway) return 0

  const teamScore = isHome ? match.homeScore : match.awayScore
  const opponentScore = isHome ? match.awayScore : match.homeScore

  if (teamScore > opponentScore) return 3
  if (teamScore === opponentScore) return 1
  return 0
}

export function getChampionRunnerUp(matches: Match[]): { champion: string | null; runnerUp: string | null } {
  const finalMatch = matches.find(
    (m) => m.phase === "Final" && m.status === "finished"
  )
  if (!finalMatch || finalMatch.homeScore === null || finalMatch.awayScore === null) {
    return { champion: null, runnerUp: null }
  }

  let champion: string
  let runnerUp: string

  if (finalMatch.homePenalties != null && finalMatch.awayPenalties != null) {
    champion = finalMatch.homePenalties > finalMatch.awayPenalties
      ? finalMatch.homeTeam
      : finalMatch.awayTeam
    runnerUp = finalMatch.homePenalties > finalMatch.awayPenalties
      ? finalMatch.awayTeam
      : finalMatch.homeTeam
  } else {
    champion = finalMatch.homeScore > finalMatch.awayScore
      ? finalMatch.homeTeam
      : finalMatch.awayTeam
    runnerUp = finalMatch.homeScore > finalMatch.awayScore
      ? finalMatch.awayTeam
      : finalMatch.homeTeam
  }

  return { champion, runnerUp }
}

export function computeLeaderboard(allMatches: Match[]): LeaderboardEntry[] {
  const { champion, runnerUp } = getChampionRunnerUp(allMatches)

  const entries: LeaderboardEntry[] = participants.map((p) => {
    let points = 0
    let firstPointDate = ""

    for (const match of allMatches) {
      const pts0 = getMatchPoints(match, p.teams[0].name)
      const pts1 = getMatchPoints(match, p.teams[1].name)
      const matchPts = pts0 + pts1
      if (matchPts > 0 && (!firstPointDate || match.date < firstPointDate)) {
        firstPointDate = match.date
      }
      points += matchPts
    }

    let prize = 0
    if (champion && (p.teams[0].name === champion || p.teams[1].name === champion)) {
      prize += PRIZES.champion
    }
    if (runnerUp && (p.teams[0].name === runnerUp || p.teams[1].name === runnerUp)) {
      prize += PRIZES.runnerUp
    }

    return {
      id: p.id,
      name: p.name,
      initials: p.initials,
      teams: p.teams.map((t) => ({ name: t.name, flag: t.flag })),
      points,
      prize,
      firstPointDate,
    }
  })

  entries.sort((a, b) => b.points - a.points || a.firstPointDate.localeCompare(b.firstPointDate))

  return entries
}
