"use client"

import type { Match } from "@/lib/wc2026-data"
import { PHASE_COLORS } from "@/lib/wc2026-data"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short" })
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
}

export function UpcomingMatches({ allMatches }: { allMatches: Match[] }) {
  const upcoming = allMatches
    .filter((m) => m.status === "pending" && m.phase.startsWith("Grupo"))
    .slice(0, 8)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold tracking-wider uppercase text-foreground/80">
            Próximos Partidos
          </span>
        </div>
        <span className="text-xs text-muted-foreground">fase de grupos</span>
      </div>

      <div className="divide-y divide-border/50">
        {upcoming.map((match) => (
          <div
            key={match.id}
            className="px-4 py-3 flex items-center gap-3 hover:bg-secondary/40 transition-colors"
          >
            {/* Date */}
            <div className="text-center w-12 flex-shrink-0">
              <div className="text-xs font-bold text-primary">{formatDate(match.date)}</div>
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
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-sm">{match.homeFlag}</span>
              <span className="text-sm font-medium text-foreground/90 truncate hidden md:block">
                {match.homeTeam}
              </span>
              <span className="text-xs text-muted-foreground mx-1">vs</span>
              <span className="text-sm font-medium text-foreground/90 truncate hidden md:block">
                {match.awayTeam}
              </span>
              <span className="text-sm">{match.awayFlag}</span>
            </div>

            {/* Venue */}
            <div className="text-xs text-muted-foreground text-right hidden lg:block max-w-[120px] truncate">
              {match.city}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
