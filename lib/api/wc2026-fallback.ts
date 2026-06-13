import { resolveFallbackName } from "./team-mappings"

const FALLBACK_BASE = "/api/scores"

interface FallbackGame {
  id: string
  home_score: string
  away_score: string
  finished: string
  home_team_name_en: string
  away_team_name_en: string
}

interface FallbackGamesResponse {
  games: FallbackGame[]
}

export interface MatchScoreUpdate {
  id: number
  homeScore: number
  awayScore: number
  homeTeam: string
  awayTeam: string
}

let cache: MatchScoreUpdate[] | null = null
let lastFetch = 0
const CACHE_TTL = 5 * 60 * 1000

export async function fetchFallbackScores(): Promise<MatchScoreUpdate[]> {
  const now = Date.now()
  if (cache && now - lastFetch < CACHE_TTL) return cache

  try {
    const res = await fetch(FALLBACK_BASE)
    if (!res.ok) return []

    const data: FallbackGamesResponse = await res.json()

    cache = data.games
      .filter((g) => g.finished === "TRUE")
      .map((g) => ({
        id: parseInt(g.id),
        homeScore: parseInt(g.home_score) || 0,
        awayScore: parseInt(g.away_score) || 0,
        homeTeam: resolveFallbackName(g.home_team_name_en),
        awayTeam: resolveFallbackName(g.away_team_name_en),
      }))

    lastFetch = now
    return cache
  } catch {
    return []
  }
}
