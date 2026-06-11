"use client"

import type { Match } from "@/lib/wc2026-data"
import { PHASE_COLORS } from "@/lib/wc2026-data"
import { Clock, CalendarX } from "lucide-react"
import { cn, abbreviateTeamName } from "@/lib/utils"
import { useState, useEffect } from "react"

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", timeZone: "America/Bogota" })
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString("es-ES", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Bogota" })
}

function isMatchLive(matchDate: string): boolean {
  const start = new Date(matchDate).getTime()
  const end = start + 120 * 60 * 1000 // 120 minutos
  const now = Date.now()
  return now >= start && now <= end
}

export function UpcomingMatches({ allMatches }: { allMatches: Match[] }) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(interval)
  }, [])

  const upcoming = allMatches
    .filter((m) => {
      const isGroup = m.phase.startsWith("Grupo")
      const isPending = m.status === "pending"
      const isLiveNow = isMatchLive(m.date)
      return isGroup && (isPending || isLiveNow)
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-semibold tracking-wider uppercase text-foreground/80">
            Próximos Partidos
          </span>
        </div>
        <span className="text-xs text-muted-foreground">fase de grupos</span>
      </div>

      {upcoming.length === 0 ? (
        <div className="px-4 py-8 flex flex-col items-center gap-2 text-center">
          <CalendarX className="w-8 h-8 text-muted-foreground/50" />
          <span className="text-sm text-muted-foreground">No hay próximos partidos de grupos</span>
        </div>
      ) : (
        <div className="divide-y divide-border/50">
          {upcoming.map((match) => (
            <div
              key={match.id}
              className="px-4 py-3 flex items-center gap-3 hover:bg-secondary/40 transition-colors"
            >
              {/* Date */}
              <div className="text-center w-16 flex-shrink-0 whitespace-nowrap">
                <div className="text-xs font-bold text-green-700 dark:text-green-400">{formatDate(match.date)}</div>
                <div className="text-xs text-muted-foreground">{formatTime(match.date)}</div>
              </div>

              {/* Phase badge */}
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded font-mono font-semibold flex-shrink-0 hidden sm:inline",
                PHASE_COLORS[match.phase]
              )}>
                {match.phase.replace("Grupo ", "G")}
              </span>

              {/* Match */}
              <div className="flex items-center gap-2 flex-1 min-w-0 flex-wrap">
                <span className="text-sm">{match.homeFlag}</span>
                <span className="text-sm font-medium text-foreground sm:hidden">
                  {abbreviateTeamName(match.homeTeam)}
                </span>
                <span className="text-sm font-medium text-foreground hidden sm:inline truncate">
                  {match.homeTeam}
                </span>
                <span className="text-xs text-muted-foreground mx-1">vs</span>
                <span className="text-sm font-medium text-foreground sm:hidden">
                  {abbreviateTeamName(match.awayTeam)}
                </span>
                <span className="text-sm font-medium text-foreground hidden sm:inline truncate">
                  {match.awayTeam}
                </span>
                <span className="text-sm">{match.awayFlag}</span>
              </div>

              {/* Live badge */}
              {isMatchLive(match.date) && (
                <span className="text-[0.65rem] font-semibold px-2 py-px rounded-full bg-red-500 text-white shrink-0 ml-auto sm:ml-1.5">
                  Jugando
                </span>
              )}

              {/* Venue */}
              <div className="text-xs text-muted-foreground text-right hidden lg:block max-w-[120px] truncate">
                {match.city}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
