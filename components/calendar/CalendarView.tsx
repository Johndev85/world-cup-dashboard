"use client"

import { useState, useMemo } from "react"
import type { Match, Phase } from "@/lib/wc2026-data"
import { ALL_PHASES, GROUP_PHASES, KNOCKOUT_PHASES, PHASE_COLORS } from "@/lib/wc2026-data"
import { MatchCard } from "./MatchCard"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, Filter } from "lucide-react"

type FilterType = "all" | "groups" | "knockout" | Phase

function formatDate(iso: string) {
  const [y, mo, d] = iso.split("-").map(Number)
  const date = new Date(Date.UTC(y, mo - 1, d, 12, 0, 0))
  return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Bogota" })
}

function groupByDate(matches: Match[]) {
  const map = new Map<string, Match[]>()
  for (const m of matches) {
    const key = m.date.slice(0, 10)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(m)
  }
  return map
}

export function CalendarView({ allMatches }: { allMatches: Match[] }) {
  const [filter, setFilter] = useState<FilterType>("all")
  const [collapsedDates, setCollapsedDates] = useState<Set<string>>(new Set())
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  const filtered = useMemo(() => {
    if (filter === "all") return allMatches
    if (filter === "groups") return allMatches.filter((m) => GROUP_PHASES.includes(m.phase as Phase))
    if (filter === "knockout") return allMatches.filter((m) => KNOCKOUT_PHASES.includes(m.phase as Phase))
    return allMatches.filter((m) => m.phase === filter)
  }, [filter, allMatches])

  const byDate = useMemo(() => groupByDate(filtered), [filtered])
  const sortedDates = Array.from(byDate.keys()).sort()

  function toggleDate(date: string) {
    setCollapsedDates((prev) => {
      const next = new Set(prev)
      if (next.has(date)) next.delete(date)
      else next.add(date)
      return next
    })
  }

  const filterOptions: { label: string; value: FilterType }[] = [
    { label: "Todos", value: "all" },
    { label: "Fase de Grupos", value: "groups" },
    { label: "Eliminatorias", value: "knockout" },
    ...ALL_PHASES.map((p) => ({ label: p, value: p as FilterType })),
  ]

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex items-center gap-3">
        {/* Quick filters */}
        <div className="hidden md:flex items-center gap-1.5 flex-wrap">
          {[
            { label: "Todos", value: "all" as FilterType },
            { label: "Grupos", value: "groups" as FilterType },
            { label: "Eliminatorias", value: "knockout" as FilterType },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-full border transition-all font-medium",
                filter === opt.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/50 text-muted-foreground border-border hover:border-border hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Phase dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={cn(
              "flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-all font-medium",
              ALL_PHASES.includes(filter as Phase)
                ? "bg-primary/20 text-primary border-primary/40"
                : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
            )}
          >
            <Filter className="w-3 h-3" />
            {ALL_PHASES.includes(filter as Phase) ? filter : "Fase específica"}
            <ChevronDown className="w-3 h-3" />
          </button>

          {showFilterMenu && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden">
              <div className="max-h-72 overflow-y-auto">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setFilter(opt.value); setShowFilterMenu(false) }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2",
                      filter === opt.value
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-secondary text-foreground/80"
                    )}
                  >
                    {ALL_PHASES.includes(opt.value as Phase) && (
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        PHASE_COLORS[opt.value]?.split(" ")[0]?.replace("bg-", "bg-") ?? "bg-muted"
                      )} />
                    )}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Match count */}
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} partidos
        </span>
      </div>

      {/* Dates */}
      <div className="space-y-4">
        {sortedDates.map((date) => {
          const dayMatches = byDate.get(date)!
          const isCollapsed = collapsedDates.has(date)

          return (
            <div key={date} className="space-y-2">
              {/* Date header */}
              <button
                onClick={() => toggleDate(date)}
                className="flex items-center gap-2 w-full group"
              >
                {isCollapsed
                  ? <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  : <ChevronDown className="w-4 h-4 text-primary" />
                }
                <span className="text-sm font-semibold capitalize text-foreground/80 group-hover:text-foreground transition-colors">
                  {formatDate(date)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({dayMatches.length} {dayMatches.length === 1 ? "partido" : "partidos"})
                </span>
                <div className="flex-1 h-px bg-border/50 ml-2" />
              </button>

              {/* Matches grid */}
              {!isCollapsed && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {dayMatches.map((m) => (
                    <MatchCard key={m.id} match={m} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
