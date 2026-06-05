"use client"

import { useMemo } from "react"
import type { Match } from "@/lib/wc2026-data"
import {
  getTopContenders,
  getCurrentPhase,
  getRelevantProbability,
  getProbabilityColor,
} from "@/lib/api/team-probabilities"
import { TrendingUp } from "lucide-react"

const PHASE_LABELS: Record<string, string> = {
  groups: "Fase de Grupos",
  roundOf32: "Octavos de Final",
  quarterFinals: "Cuartos de Final",
  semiFinals: "Semifinales",
  finished: "Finalizado",
}

function ProbabilityBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  const colorClass = getProbabilityColor(value)

  return (
    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${
          value >= 20 ? "bg-green-500" : value >= 10 ? "bg-amber-500" : value >= 5 ? "bg-orange-400" : "bg-muted-foreground/50"
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function TopContenders({ allMatches }: { allMatches: Match[] }) {
  const phase = useMemo(() => getCurrentPhase(allMatches), [allMatches])
  const contenders = useMemo(() => getTopContenders(5), [])

  const data = useMemo(() => {
    return contenders.map((team) => {
      const relevant = getRelevantProbability(team, phase)
      const colorClass = getProbabilityColor(relevant.value)
      return { team, relevant, colorClass }
    })
  }, [contenders, phase])

  const maxValue = data.length > 0 ? Math.max(...data.map((d) => d.relevant.value)) : 100

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold tracking-wider uppercase text-foreground/80">
            Top Contenders
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono">
          {PHASE_LABELS[phase] || phase}
        </span>
      </div>

      <div className="divide-y divide-border/50">
        {data.map((d, i) => (
          <div
            key={d.team.name}
            className="px-4 py-3 flex items-center gap-3 hover:bg-secondary/40 transition-colors"
          >
            {/* Position */}
            <span className="text-xs font-bold text-muted-foreground w-4 text-center font-mono">
              {i + 1}
            </span>

            {/* Flag + Name */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-lg flex-shrink-0">{d.team.flag}</span>
              <span className="text-sm font-medium text-foreground truncate">
                {d.team.name}
              </span>
            </div>

            {/* Probability */}
            <div className="flex items-center gap-2 flex-shrink-0 w-36">
              <ProbabilityBar value={d.relevant.value} max={maxValue} />
              <span className={`text-xs font-bold font-mono w-12 text-right ${d.colorClass}`}>
                {d.relevant.value.toFixed(1)}%
              </span>
            </div>

            {/* Label */}
            <span className="text-[10px] text-muted-foreground w-14 text-right hidden sm:block">
              {d.relevant.icon} {d.relevant.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
