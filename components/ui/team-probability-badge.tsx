"use client"

import { useMemo } from "react"
import type { Match } from "@/lib/wc2026-data"
import {
  getTeamProbability,
  getCurrentPhase,
  getRelevantProbability,
  getProbabilityColor,
  getProbabilityBg,
  type TournamentPhase,
} from "@/lib/api/team-probabilities"

interface TeamProbabilityBadgeProps {
  teamName: string
  allMatches: Match[]
  compact?: boolean
}

export function TeamProbabilityBadge({ teamName, allMatches, compact = false }: TeamProbabilityBadgeProps) {
  const phase = useMemo(() => getCurrentPhase(allMatches), [allMatches])

  const data = useMemo(() => {
    const prob = getTeamProbability(teamName)
    if (!prob) return null
    const relevant = getRelevantProbability(prob, phase)
    const colorClass = getProbabilityColor(relevant.value)
    const bgClass = getProbabilityBg(relevant.value)
    return { prob, relevant, colorClass, bgClass }
  }, [teamName, allMatches, phase])

  if (!data || data.relevant.value === 0) return null

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold font-mono px-1 py-0.5 rounded border flex-shrink-0 ${data.bgClass} ${data.colorClass}`}>
        <span>{data.relevant.icon}</span>
        <span>{data.relevant.value.toFixed(1)}%</span>
      </span>
    )
  }

  return (
    <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold font-mono px-2 py-1 rounded-md border flex-shrink-0 ${data.bgClass}`}>
      <span className={data.colorClass}>{data.relevant.icon}</span>
      <span className={data.colorClass}>{data.relevant.value.toFixed(1)}%</span>
      <span className="text-muted-foreground font-normal">{data.relevant.label}</span>
    </div>
  )
}
