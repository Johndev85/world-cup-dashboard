"use client"

import { useMemo } from "react"
import type { Match } from "@/lib/wc2026-data"
import { Trophy } from "lucide-react"
import { abbreviateTeamName } from "@/lib/utils"

interface ScorerEntry {
  name: string
  team: string
  goals: number
  reachedAt: number
}

export function TopScorers({ allMatches }: { allMatches: Match[] }) {
  const scorers = useMemo(() => {
    const map = new Map<string, ScorerEntry>()
    let goalOrder = 0

    for (const match of allMatches) {
      for (const g of match.goals ?? []) {
        const key = `${g.name}|${g.team}`
        goalOrder++
        const existing = map.get(key)
        if (existing) {
          existing.goals++
          existing.reachedAt = goalOrder
        } else {
          map.set(key, { name: g.name, team: g.team, goals: 1, reachedAt: goalOrder })
        }
      }
    }

    return Array.from(map.values())
      .sort((a, b) => b.goals - a.goals || a.reachedAt - b.reachedAt)
      .slice(0, 15)
  }, [allMatches])

  if (scorers.length === 0) return null

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold tracking-wider uppercase text-foreground/80">
            Tabla de Goleadores
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono">
          {scorers.length} jugadores
        </span>
      </div>

      <div className="divide-y divide-border/50">
        {scorers.map((s, i) => (
          <div
            key={`${s.name}|${s.team}`}
            className="px-4 py-3 flex items-center gap-3 hover:bg-secondary/40 transition-colors"
          >
            <span className="text-xs font-bold text-muted-foreground w-4 text-center font-mono">
              {i + 1}
            </span>

            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-foreground truncate block">
                {s.name}
              </span>
            </div>

            <span className="text-xs text-muted-foreground sm:hidden flex-shrink-0">
              {abbreviateTeamName(s.team)}
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline flex-shrink-0">
              {s.team}
            </span>

            <span className="text-sm font-bold font-mono text-primary flex-shrink-0 w-6 text-right">
              {s.goals}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
