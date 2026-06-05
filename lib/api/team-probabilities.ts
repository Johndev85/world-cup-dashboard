import type { Match } from "../wc2026-data"

export interface TeamProbability {
  name: string
  flag: string
  quarterFinals: number
  semiFinals: number
  final: number
  winner: number
}

export const TEAM_PROBABILITIES: TeamProbability[] = [
  { name: "España",          flag: "🇪🇸", quarterFinals: 52.1, semiFinals: 39.0, final: 25.6, winner: 16.1 },
  { name: "Francia",         flag: "🇫🇷", quarterFinals: 47.9, semiFinals: 33.4, final: 21.2, winner: 13.0 },
  { name: "Inglaterra",      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", quarterFinals: 47.7, semiFinals: 30.3, final: 19.0, winner: 11.2 },
  { name: "Argentina",       flag: "🇦🇷", quarterFinals: 45.2, semiFinals: 30.3, final: 18.1, winner: 10.4 },
  { name: "Portugal",        flag: "🇵🇹", quarterFinals: 40.2, semiFinals: 23.7, final: 13.0, winner: 7.0 },
  { name: "Brasil",          flag: "🇧🇷", quarterFinals: 38.2, semiFinals: 22.1, final: 12.3, winner: 6.6 },
  { name: "Alemania",        flag: "🇩🇪", quarterFinals: 33.8, semiFinals: 20.2, final: 10.6, winner: 5.1 },
  { name: "Paises Bajos",    flag: "🇳🇱", quarterFinals: 29.5, semiFinals: 15.2, final: 7.9, winner: 3.6 },
  { name: "Noruega",         flag: "🇳🇴", quarterFinals: 27.2, semiFinals: 14.5, final: 7.4, winner: 3.5 },
  { name: "Belgica",         flag: "🇧🇪", quarterFinals: 28.9, semiFinals: 12.8, final: 5.6, winner: 2.4 },
  { name: "Colombia",        flag: "🇨🇴", quarterFinals: 22.0, semiFinals: 11.1, final: 5.0, winner: 2.1 },
  { name: "Marruecos",       flag: "🇲🇦", quarterFinals: 23.5, semiFinals: 10.6, final: 4.6, winner: 1.9 },
  { name: "Uruguay",         flag: "🇺🇾", quarterFinals: 20.7, semiFinals: 10.4, final: 4.4, winner: 1.7 },
  { name: "Suiza",           flag: "🇨🇭", quarterFinals: 23.7, semiFinals: 10.0, final: 4.1, winner: 1.7 },
  { name: "Croacia",         flag: "🇭🇷", quarterFinals: 18.6, semiFinals: 9.1, final: 3.9, winner: 1.6 },
  { name: "Ecuador",         flag: "🇪🇨", quarterFinals: 19.3, semiFinals: 8.8, final: 3.7, winner: 1.4 },
  { name: "Japon",           flag: "🇯🇵", quarterFinals: 17.0, semiFinals: 7.4, final: 3.3, winner: 1.2 },
  { name: "Estados Unidos",  flag: "🇺🇸", quarterFinals: 19.4, semiFinals: 8.2, final: 3.3, winner: 1.2 },
  { name: "Senegal",         flag: "🇸🇳", quarterFinals: 14.2, semiFinals: 6.0, final: 2.4, winner: 1.0 },
  { name: "Mexico",          flag: "🇲🇽", quarterFinals: 24.2, semiFinals: 8.4, final: 3.0, winner: 1.0 },
]

export function getTeamProbability(teamName: string): TeamProbability | undefined {
  return TEAM_PROBABILITIES.find((t) => t.name === teamName)
}

export type TournamentPhase = "groups" | "roundOf32" | "quarterFinals" | "semiFinals" | "final" | "finished"

export function getCurrentPhase(allMatches: Match[]): TournamentPhase {
  const finalMatch = allMatches.find((m) => m.phase === "Final")
  if (finalMatch?.status === "finished") return "finished"

  const semiMatches = allMatches.filter((m) => m.phase === "Semifinal" || m.phase === "Semifinales")
  if (semiMatches.some((m) => m.status === "finished")) return "semiFinals"

  const quarterMatches = allMatches.filter((m) => m.phase === "Cuartos de Final")
  if (quarterMatches.some((m) => m.status === "finished")) return "quarterFinals"

  const roundOf32 = allMatches.filter((m) => m.phase === "Octavos de Final")
  if (roundOf32.some((m) => m.status === "finished")) return "roundOf32"

  return "groups"
}

export function getRelevantProbability(
  prob: TeamProbability,
  phase: TournamentPhase,
): { value: number; label: string; icon: string } {
  switch (phase) {
    case "groups":
      return { value: prob.quarterFinals, label: "Cuartos", icon: "W" }
    case "roundOf32":
      return { value: prob.semiFinals, label: "Semis", icon: "W" }
    case "quarterFinals":
      return { value: prob.final, label: "Final", icon: "W" }
    case "semiFinals":
      return { value: prob.winner, label: "Campeón", icon: "W" }
    case "finished":
      return { value: prob.winner, label: "Campeón", icon: "W" }
  }
}

export function getProbabilityColor(value: number): string {
  if (value >= 20) return "text-green-500"
  if (value >= 10) return "text-amber-500"
  if (value >= 5) return "text-orange-400"
  return "text-muted-foreground"
}

export function getProbabilityBg(value: number): string {
  if (value >= 20) return "bg-green-500/10 border-green-500/20"
  if (value >= 10) return "bg-amber-500/10 border-amber-500/20"
  if (value >= 5) return "bg-orange-400/10 border-orange-400/20"
  return "bg-muted/50 border-border/50"
}

export function getTopContenders(count: number = 5): TeamProbability[] {
  return [...TEAM_PROBABILITIES].sort((a, b) => b.winner - a.winner).slice(0, count)
}
