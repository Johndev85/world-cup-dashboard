"use client"

import type { LeaderboardEntry } from "@/lib/api/leaderboard"
import type { Match } from "@/lib/wc2026-data"
import { Trophy } from "lucide-react"
import { cn, abbreviateTeamName } from "@/lib/utils"
import { TeamProbabilityBadge } from "@/components/ui/team-probability-badge"

function formatCOP(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n)
}

export function Leaderboard({ entries, allMatches }: { entries: LeaderboardEntry[]; allMatches: Match[] }) {
  const leaderId = entries.length > 0 ? entries[0].id : null

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
        {entries.map((entry, idx) => {
          const isLeader = entry.points > 0 && entry.id === leaderId
          const isChampion = entry.prize >= 1_000_000
          const isRunnerUp = entry.prize > 0 && entry.prize < 1_000_000
          const hasPrize = entry.prize > 0

          return (
            <div
              key={entry.id}
              className={cn(
                "grid grid-cols-[2rem_1fr_4rem] items-center px-4 py-3 transition-colors hover:bg-secondary/40",
                isLeader && !hasPrize && "bg-primary/5",
                !isLeader && hasPrize && "bg-amber-500/5",
                isLeader && hasPrize && "bg-primary/5"
              )}
            >
              {/* Position */}
              <div className="flex items-center justify-center">
                {isLeader ? (
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
                    isLeader
                      ? "bg-primary text-primary-foreground"
                      : hasPrize
                        ? "bg-amber-500 text-white"
                        : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {entry.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "text-sm font-medium truncate",
                      isLeader ? "text-foreground" : "text-foreground/80"
                    )}>
                      {entry.name}
                    </span>
                    {/* Badges */}
                    {isLeader && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-primary/15 text-primary flex-shrink-0">
                        Líder
                      </span>
                    )}
                    {isChampion && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 flex-shrink-0">
                        🏆 Campeón
                      </span>
                    )}
                    {isRunnerUp && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-500 flex-shrink-0">
                        🥈 Subcampeón
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs flex-shrink-0">{entry.teams[0].flag}</span>
                    <span className="text-xs text-muted-foreground min-w-0 flex-1 sm:hidden">
                      {abbreviateTeamName(entry.teams[0].name)}
                    </span>
                    <span className="text-xs text-muted-foreground min-w-0 flex-1 hidden sm:inline truncate">
                      {entry.teams[0].name}
                    </span>
                    <TeamProbabilityBadge teamName={entry.teams[0].name} allMatches={allMatches} compact />
                    <span className="text-xs text-muted-foreground/40 flex-shrink-0">·</span>
                    <span className="text-xs flex-shrink-0">{entry.teams[1].flag}</span>
                    <span className="text-xs text-muted-foreground min-w-0 flex-1 sm:hidden">
                      {abbreviateTeamName(entry.teams[1].name)}
                    </span>
                    <span className="text-xs text-muted-foreground min-w-0 flex-1 hidden sm:inline truncate">
                      {entry.teams[1].name}
                    </span>
                    <TeamProbabilityBadge teamName={entry.teams[1].name} allMatches={allMatches} compact />
                  </div>
                </div>
              </div>

              {/* Points + Prize */}
              <div className="text-right">
                <span className={cn(
                  "font-bold text-sm",
                  isLeader ? "text-primary" : "text-foreground/90"
                )}>
                  {entry.points}
                </span>
                {hasPrize && (
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                    {formatCOP(entry.prize)}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-t border-border/50 flex gap-3 flex-wrap">
        <span className="text-xs text-muted-foreground">Victoria = 3 pts</span>
        <span className="text-xs text-muted-foreground">Empate = 1 pt</span>
        <span className="text-xs text-muted-foreground">Derrota = 0 pts</span>
        <span className="text-xs text-primary/70">· Líder = más puntos</span>
        <span className="text-xs text-amber-600/70 dark:text-amber-400/70">· 🏆 = equipo campeón</span>
      </div>
    </div>
  )
}
