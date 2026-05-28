"use client"

import type { Match } from "@/lib/wc2026-data"
import { participants, PRIZES } from "@/lib/wc2026-data"
import { Calendar, Users, Swords, Trophy } from "lucide-react"

function formatCOPShort(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

export function StatsCards({ allMatches }: { allMatches: Match[] }) {
  const totalMatches = allMatches.length
  const finishedMatches = allMatches.filter((m) => m.status === "finished").length
  const totalParticipants = participants.length
  const totalPrize = PRIZES.champion + PRIZES.runnerUp

  const stats = [
    {
      label: "Total Partidos",
      value: totalMatches,
      sub: "FIFA WC 2026",
      icon: Swords,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Participantes",
      value: totalParticipants,
      sub: "2 equipos c/u",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Jugados",
      value: finishedMatches,
      sub: `de ${totalMatches} partidos`,
      icon: Calendar,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Premio Total",
      value: formatCOPShort(totalPrize),
      sub: `Campeon ${formatCOPShort(PRIZES.champion)}`,
      icon: Trophy,
      color: "text-primary",
      bg: "bg-primary/10",
      pulse: false,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-card border border-border rounded-lg px-4 py-4 flex items-start gap-3"
        >
          <div className={`${s.bg} p-2 rounded-lg flex-shrink-0 relative`}>
            <s.icon className={`w-4 h-4 ${s.color}`} />
            {s.pulse && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-accent animate-pulse" />
            )}
          </div>
          <div className="min-w-0">
            <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-xs font-semibold text-foreground/80 leading-tight">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
