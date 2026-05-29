import type { Match, GroupStanding, Phase } from "../wc2026-data"
import { getTeamInfo } from "./team-mappings"
import { getCountryByGround, getCityFromGround, getVenueFromGround } from "./venue-mappings"

const API_URL = "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json"

interface ApiMatch {
  round: string
  date: string
  time: string
  team1: string
  team2: string
  group?: string
  ground: string
  num?: number
  score?: {
    ft?: [number, number]
    ht?: [number, number]
    et?: [number, number]
    p?: [number, number]
  }
}

interface ApiResponse {
  name: string
  matches: ApiMatch[]
}

const ROUND_TO_PHASE: Record<string, Phase> = {
  "Round of 32":            "Octavos de Final",
  "Round of 16":            "Cuartos de Final",
  "Quarter-final":          "Semifinal",
  "Semi-final":             "Semifinales",
  "Match for third place":  "Tercer Lugar",
  "Final":                  "Final",
}

function parseDateTime(date: string, time: string): string {
  const match = time.match(/(\d{1,2}:\d{2})\s*UTC([+-]\d+)/)
  if (!match) return `${date}T${time}:00-05:00`
  const [, localTime, offsetStr] = match
  const venueOffset = parseInt(offsetStr)
  const [h, m] = localTime.split(":").map(Number)
  // Convert venue local time to UTC: utc = local - offset
  const utcHours = h - venueOffset
  // Convert UTC to COT (UTC-5): cot = utc - 5
  let cotHours = utcHours - 5
  let dayOffset = 0
  if (cotHours < 0) {
    cotHours += 24
    dayOffset = -1
  } else if (cotHours >= 24) {
    cotHours -= 24
    dayOffset = 1
  }
  const baseDate = new Date(`${date}T00:00:00Z`)
  baseDate.setUTCDate(baseDate.getUTCDate() + dayOffset)
  const yyyy = baseDate.getUTCFullYear()
  const mm = String(baseDate.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(baseDate.getUTCDate()).padStart(2, "0")
  const hh = String(cotHours).padStart(2, "0")
  const mi = String(m).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:00-05:00`
}

function mapRound(round: string, group?: string): Phase {
  if (group) {
    const groupLetter = group.replace("Group ", "")
    return `Grupo ${groupLetter}` as Phase
  }
  return ROUND_TO_PHASE[round] ?? "Final"
}

function determineStatus(match: ApiMatch): Match["status"] {
  if (match.score?.ft) return "finished"
  return "pending"
}

function apiMatchToMatch(apiMatch: ApiMatch, id: number): Match {
  const team1Info = getTeamInfo(apiMatch.team1)
  const team2Info = getTeamInfo(apiMatch.team2)
  const country = getCountryByGround(apiMatch.ground)

  return {
    id,
    phase: mapRound(apiMatch.round, apiMatch.group),
    date: parseDateTime(apiMatch.date, apiMatch.time),
    homeTeam: team1Info.name,
    awayTeam: team2Info.name,
    homeFlag: team1Info.flag,
    awayFlag: team2Info.flag,
    homeScore: apiMatch.score?.ft?.[0] ?? null,
    awayScore: apiMatch.score?.ft?.[1] ?? null,
    homePenalties: apiMatch.score?.p?.[0] ?? null,
    awayPenalties: apiMatch.score?.p?.[1] ?? null,
    venue: getVenueFromGround(apiMatch.ground),
    city: getCityFromGround(apiMatch.ground),
    country,
    status: determineStatus(apiMatch),
  }
}

function computeGroupStandings(matches: Match[]): GroupStanding[] {
  const groups = new Map<string, GroupStanding>()

  for (const match of matches) {
    if (!match.phase.startsWith("Grupo")) continue
    const groupLetter = match.phase.replace("Grupo ", "")

    if (!groups.has(groupLetter)) {
      groups.set(groupLetter, { group: groupLetter, teams: [] })
    }

    const group = groups.get(groupLetter)!

    const ensureTeam = (name: string, flag: string) => {
      if (!group.teams.find((t) => t.name === name)) {
        group.teams.push({
          name, flag,
          played: 0, wins: 0, draws: 0, losses: 0,
          gf: 0, ga: 0, gd: 0, points: 0,
        })
      }
    }

    ensureTeam(match.homeTeam, match.homeFlag)
    ensureTeam(match.awayTeam, match.awayFlag)

    if (match.status === "finished" && match.homeScore !== null && match.awayScore !== null) {
      const home = group.teams.find((t) => t.name === match.homeTeam)!
      const away = group.teams.find((t) => t.name === match.awayTeam)!

      home.played++
      away.played++
      home.gf += match.homeScore
      home.ga += match.awayScore
      away.gf += match.awayScore
      away.ga += match.homeScore
      home.gd = home.gf - home.ga
      away.gd = away.gf - away.ga

      if (match.homeScore > match.awayScore) {
        home.wins++
        home.points += 3
        away.losses++
      } else if (match.homeScore < match.awayScore) {
        away.wins++
        away.points += 3
        home.losses++
      } else {
        home.draws++
        away.draws++
        home.points++
        away.points++
      }
    }
  }

  const result = Array.from(groups.values())
  for (const group of result) {
    group.teams.sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf)
  }
  return result
}

export interface WorldCupData {
  allMatches: Match[]
  groupStandings: GroupStanding[]
}

let cache: WorldCupData | null = null
let lastFetch = 0
const CACHE_TTL = 5 * 60 * 1000

export async function fetchWorldCupData(): Promise<WorldCupData> {
  const now = Date.now()
  if (cache && now - lastFetch < CACHE_TTL) return cache

  const res = await fetch(API_URL)
  if (!res.ok) throw new Error(`Failed to fetch World Cup data: ${res.status}`)

  const data: ApiResponse = await res.json()
  const allMatches = data.matches.map((m, i) => apiMatchToMatch(m, i + 1))
  const groupStandings = computeGroupStandings(allMatches)

  cache = { allMatches, groupStandings }
  lastFetch = now
  return cache
}
