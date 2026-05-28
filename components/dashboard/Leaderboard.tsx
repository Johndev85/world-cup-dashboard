"use client"

import type { LeaderboardEntry } from "@/lib/api/leaderboard"
import { Trophy, Medal } from "lucide-react"
import { cn } from "@/lib/utils"

function formatCOP(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n)
}

export function Leaderboard({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold tracking-wider uppercase text-foreground/80">
            Clasificación
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {entries.length} participantes
        </span>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[2rem_1fr_4rem] items-center px-4 py-2 border-b border-border/50">
        <span className="text-xs text-muted-foreground">#</span>
        <span className="text-xs text-muted-foreground">Nombre</span>
        <span className="text-xs text-muted-foreground text-right">Puntos</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border/50">
        {entries.map((entry, idx) => (
          <div
            key={entry.id}
            className={cn(
              "grid grid-cols-[2rem_1fr_4rem] items-center px-4 py-3 transition-colors hover:bg-secondary/40",
              idx === 0 && "bg-primary/5",
              entry.prize > 0 && "bg-primary/5"
            )}
          >
            {/* Position */}
            <div className="flex items-center justify-center">
              {idx === 0 ? (
                <span className="text-primary font-bold text-sm">1</span>
              ) : (
                <span className="text-muted-foreground text-sm">{idx + 1}</span>
              )}
            </div>

            {/* Name + teams */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                  idx === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {entry.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={cn(
                    "text-sm font-medium truncate",
                    idx === 0 ? "text-foreground" : "text-foreground/80"
                  )}>
                    {entry.name}
                  </span>
                  {entry.prize > 0 && (
                    <Medal className="w-3 h-3 text-primary flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs">{entry.teams[0].flag}</span>
                  <span className="text-xs text-muted-foreground truncate">{entry.teams[0].name}</span>
                  <span className="text-xs text-muted-foreground/40">·</span>
                  <span className="text-xs">{entry.teams[1].flag}</span>
                  <span className="text-xs text-muted-foreground truncate hidden sm:inline">{entry.teams[1].name}</span>
                </div>
              </div>
            </div>

            {/* Points + Prize */}
            <div className="text-right">
              <span className={cn(
                "font-bold text-sm",
                idx === 0 ? "text-primary" : "text-foreground/90"
              )}>
                {entry.points}
              </span>
              {entry.prize > 0 && (
                <div className="text-[10px] text-primary font-medium">
                  {formatCOP(entry.prize)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-t border-border/50 flex gap-4 flex-wrap">
        <span className="text-xs text-muted-foreground">Victoria = 3 pts</span>
        <span className="text-xs text-muted-foreground">Empate = 1 pt</span>
        <span className="text-xs text-muted-foreground">Derrota = 0 pts</span>
      </div>
    </div>
  )
}
