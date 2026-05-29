"use client"

import type { Match } from "@/lib/wc2026-data"
import { PHASE_COLORS } from "@/lib/wc2026-data"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface MatchCardProps {
  match: Match
  compact?: boolean
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
}

export function MatchCard({ match, compact = false }: MatchCardProps) {
  const isLive = match.status === "live"
  const isFinished = match.status === "finished"
  const isPending = match.status === "pending"

  return (
    <div
      className={cn(
        "group bg-card border rounded-lg transition-all hover:border-border hover:bg-card/80",
        isLive
          ? "border-accent/60 shadow-[0_0_12px_rgba(0,0,0,0.3)]"
          : "border-border/60",
        compact ? "p-3" : "p-4"
      )}
    >
      {/* Top row: phase badge + time + status */}
      <div className="flex items-center justify-between mb-3">
        <span className={cn(
          "text-[11px] px-2 py-0.5 rounded font-mono font-semibold uppercase tracking-wide",
          PHASE_COLORS[match.phase]
        )}>
          {match.phase}
        </span>

        <div className="flex items-center gap-2">
          {isLive && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-bold text-accent uppercase">En Vivo</span>
            </span>
          )}
          {isPending && (
            <span className="text-[11px] text-muted-foreground font-mono">
              {formatTime(match.date)}
            </span>
          )}
          {isFinished && (
            <span className="text-[11px] text-muted-foreground uppercase">Finalizado</span>
          )}
        </div>
      </div>

      {/* Teams + Score */}
      <div className="flex items-center gap-3">
        {/* Home */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className="text-lg leading-none flex-shrink-0">{match.homeFlag}</span>
          <span className={cn(
            "text-sm font-semibold truncate",
            isLive || isFinished ? "text-foreground" : "text-foreground"
          )}>
            {match.homeTeam}
          </span>
        </div>

        {/* Score / vs */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isFinished || isLive ? (
            <>
              <span className={cn(
                "w-8 h-8 flex items-center justify-center rounded text-sm font-bold font-mono",
                isLive ? "bg-accent/20 text-accent" : "bg-secondary text-foreground"
              )}>
                {match.homeScore ?? "-"}
              </span>
              <span className="text-muted-foreground text-xs">:</span>
              <span className={cn(
                "w-8 h-8 flex items-center justify-center rounded text-sm font-bold font-mono",
                isLive ? "bg-accent/20 text-accent" : "bg-secondary text-foreground"
              )}>
                {match.awayScore ?? "-"}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground text-xs font-mono px-2">vs</span>
          )}
        </div>

        {/* Away */}
        <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
          <span className={cn(
            "text-sm font-semibold truncate text-right",
            isLive || isFinished ? "text-foreground" : "text-foreground"
          )}>
            {match.awayTeam}
          </span>
          <span className="text-lg leading-none flex-shrink-0">{match.awayFlag}</span>
        </div>
      </div>

      {/* Venue */}
      {!compact && (
        <div className="flex items-center gap-1 mt-3 pt-2 border-t border-border/40">
          <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <span className="text-xs text-muted-foreground truncate">
            {match.venue} — {match.city}
          </span>
        </div>
      )}
    </div>
  )
}
