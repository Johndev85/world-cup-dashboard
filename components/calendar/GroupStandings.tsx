"use client"

import { useState } from "react"
import type { GroupStanding } from "@/lib/wc2026-data"
import { cn } from "@/lib/utils"

const GROUP_ACCENT: Record<string, { border: string; header: string; badge: string }> = {
  A: { border: "border-l-blue-500",    header: "text-blue-500",    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  B: { border: "border-l-purple-500",  header: "text-purple-500",  badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30" },
  C: { border: "border-l-emerald-500", header: "text-emerald-500", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
  D: { border: "border-l-yellow-500",  header: "text-yellow-600",  badge: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30" },
  E: { border: "border-l-pink-500",    header: "text-pink-500",    badge: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30" },
  F: { border: "border-l-orange-500",  header: "text-orange-500",  badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  G: { border: "border-l-teal-500",    header: "text-teal-500",    badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30" },
  H: { border: "border-l-red-500",     header: "text-red-500",     badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30" },
  I: { border: "border-l-indigo-500",  header: "text-indigo-500",  badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30" },
  J: { border: "border-l-cyan-500",    header: "text-cyan-500",    badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30" },
  K: { border: "border-l-lime-500",    header: "text-lime-600",    badge: "bg-lime-500/10 text-lime-700 dark:text-lime-400 border-lime-500/30" },
  L: { border: "border-l-rose-500",    header: "text-rose-500",    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30" },
}

const STAT_COLS = [
  { key: "played", label: "PJ", title: "Partidos jugados" },
  { key: "wins",   label: "G",  title: "Ganados" },
  { key: "draws",  label: "E",  title: "Empatados" },
  { key: "losses", label: "P",  title: "Perdidos" },
  { key: "gf",     label: "GF", title: "Goles a favor" },
  { key: "ga",     label: "GC", title: "Goles en contra" },
  { key: "gd",     label: "DG", title: "Diferencia de goles" },
  { key: "points", label: "Pts",title: "Puntos" },
]

export function GroupStandingsView({ groupStandings }: { groupStandings: GroupStanding[] }) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const displayed = selectedGroup
    ? groupStandings.filter((g) => g.group === selectedGroup)
    : groupStandings

  return (
    <div className="space-y-5">
      {/* Group selector */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedGroup(null)}
          className={cn(
            "text-xs px-3 py-1.5 rounded-full border transition-all font-semibold",
            !selectedGroup
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary/60 text-muted-foreground border-border hover:text-foreground hover:border-foreground/20"
          )}
        >
          Todos
        </button>
        {groupStandings.map((g) => {
          const accent = GROUP_ACCENT[g.group]
          return (
            <button
              key={g.group}
              onClick={() => setSelectedGroup(g.group === selectedGroup ? null : g.group)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border transition-all font-bold",
                selectedGroup === g.group
                  ? cn("border", accent.badge)
                  : "bg-secondary/60 text-muted-foreground border-border hover:text-foreground hover:border-foreground/20"
              )}
            >
              {g.group}
            </button>
          )
        })}
      </div>

      {/* Groups grid — 1 col on mobile, 2 on lg, 3 on 2xl */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        {displayed.map((g) => {
          const accent = GROUP_ACCENT[g.group]
          return (
            <div
              key={g.group}
              className={cn(
                "bg-card border border-border border-l-4 rounded-xl overflow-hidden shadow-sm",
                accent.border
              )}
            >
              {/* Header row */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                <span className={cn("text-sm font-bold tracking-widest font-mono", accent.header)}>
                  GRUPO {g.group}
                </span>
                {/* Stat header labels */}
                <div className="flex items-center gap-0">
                  {STAT_COLS.map((col) => (
                    <span
                      key={col.key}
                      title={col.title}
                      className="text-[10px] font-semibold text-muted-foreground w-8 text-center uppercase tracking-wide"
                    >
                      {col.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Teams */}
              <div className="divide-y divide-border/40 overflow-x-auto">
                {g.teams.map((team, idx) => {
                  const isQualified = idx < 2
                  const statValues = [
                    team.played, team.wins, team.draws, team.losses,
                    team.gf, team.ga,
                    team.gd > 0 ? `+${team.gd}` : team.gd,
                    team.points,
                  ]
                  return (
                    <div
                      key={team.name}
                      className={cn(
                        "flex items-center px-4 py-2.5 gap-3 group",
                        isQualified ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30",
                        "transition-colors"
                      )}
                    >
                      {/* Qualification indicator */}
                      <div className={cn(
                        "w-1 h-6 rounded-full flex-shrink-0",
                        idx === 0 ? "bg-primary" : idx === 1 ? "bg-primary/40" : "bg-transparent"
                      )} />

                      {/* Position number */}
                      <span className="text-xs font-bold text-muted-foreground w-4 text-center flex-shrink-0">
                        {idx + 1}
                      </span>

                      {/* Flag + name — flex-1 so it takes all remaining space */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-base leading-none flex-shrink-0">{team.flag}</span>
                        <span className="text-sm font-medium text-foreground whitespace-nowrap">
                          {team.name}
                        </span>
                      </div>

                      {/* Stats — fixed widths, no shrinking */}
                      <div className="flex items-center flex-shrink-0">
                        {statValues.map((val, i) => (
                          <span
                            key={i}
                            className={cn(
                              "w-8 text-center text-xs font-mono flex-shrink-0",
                              i === 7
                                ? "font-bold text-foreground"
                                : i < 4
                                  ? "text-muted-foreground"
                                  : "text-foreground/70"
                            )}
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer legend */}
              <div className="px-4 py-2 border-t border-border/40 bg-muted/20 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-[10px] text-muted-foreground font-medium">Clasifican a octavos</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
