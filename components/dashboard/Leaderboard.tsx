"use client"

import { participants } from "@/lib/wc2026-data"
import { TrendingUp, TrendingDown, Minus, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export function Leaderboard() {
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
          {participants.length} participantes
        </span>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[2rem_1fr_3rem_3rem_3rem_3rem] items-center px-4 py-2 border-b border-border/50">
        <span className="text-xs text-muted-foreground">#</span>
        <span className="text-xs text-muted-foreground">Nombre</span>
        <span className="text-xs text-muted-foreground text-center">Pts</span>
        <span className="text-xs text-muted-foreground text-center hidden sm:block">Res</span>
        <span className="text-xs text-muted-foreground text-center hidden sm:block">Exac</span>
        <span className="text-xs text-muted-foreground text-center hidden sm:block">Pred</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border/50">
        {participants.map((p, idx) => (
          <div
            key={p.id}
            className={cn(
              "grid grid-cols-[2rem_1fr_3rem_3rem_3rem_3rem] items-center px-4 py-3 transition-colors hover:bg-secondary/40",
              idx === 0 && "bg-primary/5"
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

            {/* Name + avatar */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                  idx === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {p.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={cn(
                    "text-sm font-medium truncate",
                    idx === 0 ? "text-foreground" : "text-foreground/80"
                  )}>
                    {p.name}
                  </span>
                  {p.trend === "up" && <TrendingUp className="w-3 h-3 text-green-400 flex-shrink-0" />}
                  {p.trend === "down" && <TrendingDown className="w-3 h-3 text-accent flex-shrink-0" />}
                  {p.trend === "same" && <Minus className="w-3 h-3 text-muted-foreground flex-shrink-0" />}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs">{p.teams[0].flag}</span>
                  <span className="text-xs text-muted-foreground truncate">{p.teams[0].name}</span>
                  <span className="text-xs text-muted-foreground/40">·</span>
                  <span className="text-xs">{p.teams[1].flag}</span>
                  <span className="text-xs text-muted-foreground truncate hidden sm:inline">{p.teams[1].name}</span>
                </div>
              </div>
            </div>

            {/* Points */}
            <div className="text-center">
              <span className={cn(
                "font-bold text-sm",
                idx === 0 ? "text-primary" : "text-foreground/90"
              )}>
                {p.points}
              </span>
            </div>

            {/* Correct results */}
            <div className="text-center hidden sm:block">
              <span className="text-sm text-muted-foreground">{p.correctResults}</span>
            </div>

            {/* Exact scores */}
            <div className="text-center hidden sm:block">
              <span className="text-sm text-muted-foreground">{p.correctScores}</span>
            </div>

            {/* Total predictions */}
            <div className="text-center hidden sm:block">
              <span className="text-sm text-muted-foreground">{p.totalPredictions}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="px-4 py-2 border-t border-border/50 flex gap-4 flex-wrap">
        <span className="text-xs text-muted-foreground">Pts = Puntos</span>
        <span className="text-xs text-muted-foreground">Res = Resultado correcto</span>
        <span className="text-xs text-muted-foreground">Exac = Marcador exacto</span>
      </div>
    </div>
  )
}
