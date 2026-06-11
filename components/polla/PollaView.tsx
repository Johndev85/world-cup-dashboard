"use client"

import { useMemo } from "react"
import { participants, PRIZES, type Participant, type Match } from "@/lib/wc2026-data"
import { computeLeaderboard } from "@/lib/api/leaderboard"
import { Trophy, Medal, Star } from "lucide-react"
import { cn, abbreviateTeamName } from "@/lib/utils"
import { TeamProbabilityBadge } from "@/components/ui/team-probability-badge"

const AVATAR_COLORS = [
  "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
  "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30",
  "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30",
  "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30",
  "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
  "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30",
  "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  "bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/30",
  "bg-pink-500/20 text-pink-700 dark:text-pink-300 border-pink-500/30",
  "bg-lime-500/20 text-lime-700 dark:text-lime-300 border-lime-500/30",
  "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30",
]

function formatCOP(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n)
}

function ParticipantCard({ p, index, allMatches }: { p: Participant; index: number; allMatches: Match[] }) {
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length]

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors">
      {/* Card header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60">
        <div
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border flex-shrink-0",
            colorClass
          )}
        >
          {p.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
          <p className="text-xs text-muted-foreground">2 equipos asignados</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-xs text-muted-foreground">Puntos</p>
          <p className="text-base font-bold text-primary font-mono">{p.points}</p>
        </div>
      </div>

      {/* Teams */}
      <div className="px-4 py-3 space-y-2">
        {p.teams.map((team, ti) => (
          <div
            key={team.name}
            className="flex items-center gap-2.5 bg-secondary/30 rounded-md px-3 py-2"
          >
            <span className="text-lg leading-none">{team.flag}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground sm:hidden">
                  {abbreviateTeamName(team.name)}
                </p>
                <p className="text-sm font-medium text-foreground hidden sm:inline truncate">
                  {team.name}
                </p>
                <TeamProbabilityBadge teamName={team.name} allMatches={allMatches} compact />
              </div>
              <p className="text-xs text-muted-foreground">Grupo {team.group}</p>
            </div>
            {ti === 0 ? (
              <span className="text-xs bg-primary/15 text-primary px-1.5 py-0.5 rounded font-medium">
                Equipo 1
              </span>
            ) : (
              <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-medium">
                Equipo 2
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function PollaView({ allMatches }: { allMatches: Match[] }) {
  const leaderboard = useMemo(() => computeLeaderboard(allMatches), [allMatches])

  const sortedParticipants = useMemo(() => {
    return [...participants]
      .map((p) => {
        const entry = leaderboard.find((e) => e.id === p.id)
        return { ...p, points: entry?.points ?? 0 }
      })
      .sort((a, b) => b.points - a.points)
  }, [leaderboard])
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Prize banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl px-5 py-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-green-300">
              Premio Campeon
            </p>
            <p className="text-2xl font-bold text-primary font-mono">
              {formatCOP(PRIZES.champion)}
            </p>
            <p className="text-xs text-muted-foreground">
              Si tu equipo gana la Final
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-xl px-5 py-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Medal className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-300">
              Premio Subcampeon
            </p>
            <p className="text-2xl font-bold text-accent font-mono">
              {formatCOP(PRIZES.runnerUp)}
            </p>
            <p className="text-xs text-muted-foreground">
              Si tu equipo llega a la Final
            </p>
          </div>
        </div>
      </div>

      {/* Section title */}
      <div className="flex items-center gap-3">
        <Star className="w-4 h-4 text-primary flex-shrink-0" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground/70">
          {sortedParticipants.length} Participantes — Equipos Asignados
        </h2>
        <div className="flex-1 border-t border-border/50" />
      </div>

      {/* Grid of participant cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedParticipants.map((p, idx) => (
          <ParticipantCard key={p.id} p={p} index={idx} allMatches={allMatches} />
        ))}
      </div>

      {/* Rules footer */}
      <div className="bg-card border border-border rounded-lg px-5 py-4 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground/80 mb-1">Reglas de la polla</p>
        <ul className="space-y-1 text-xs list-disc list-inside">
          <li>A cada participante se le asignaron 2 equipos antes del torneo.</li>
          <li>
            Si uno de tus equipos es <strong className="text-primary">Campeon</strong>, ganas{" "}
            <strong className="text-primary">{formatCOP(PRIZES.champion)}</strong>.
          </li>
          <li>
            Si uno de tus equipos es <strong className="text-accent">Subcampeon</strong>, ganas{" "}
            <strong className="text-accent">{formatCOP(PRIZES.runnerUp)}</strong>.
          </li>
          <li>Solo los 2 primeros lugares reciben premio.</li>
        </ul>
      </div>
    </div>
  )
}
