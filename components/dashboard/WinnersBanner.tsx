"use client"

import { useMemo } from "react"
import { abbreviateTeamName } from "@/lib/utils"
import type { Match } from "@/lib/wc2026-data"
import { participants, PRIZES } from "@/lib/wc2026-data"
import { getChampionRunnerUp } from "@/lib/api/leaderboard"
import Image from "next/image"

function formatCOP(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n)
}

interface WinnerInfo {
  name: string
  teamName: string
  teamFlag: string
  prize: number
  label: string
  type: "champion" | "runnerUp"
}

function ChampionCard({ winner }: { winner: WinnerInfo }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-amber-500/15 rounded-3xl blur-2xl" />

      <div className="relative w-full max-w-[240px] sm:w-64 rounded-2xl overflow-hidden border border-amber-500/30"
        style={{ background: "linear-gradient(180deg, rgba(50,35,10,0.9) 0%, rgba(25,18,5,0.95) 100%)" }}>

        {/* Top accent line */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, #F59E0B, #FBBF24, #F59E0B, transparent)" }} />

        <div className="px-4 py-5 sm:px-5 sm:py-6 flex flex-col items-center gap-2.5 sm:gap-3">
          {/* Trophy */}
          <div className="relative">
            <Image src="/world-cup-icon.png" alt="Trofeo" width={88} height={88} className="!w-16 !h-16 sm:!w-22 sm:!h-22 object-contain drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
          </div>

          {/* Label */}
          <div className="flex items-center gap-2">
            <div className="h-px w-5 sm:w-6 bg-gradient-to-r from-transparent to-amber-500/60" />
            <span className="text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-[0.25em]">
              Campeón
            </span>
            <div className="h-px w-5 sm:w-6 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>

          {/* Prize */}
          <div className="px-3 sm:px-4 py-1.5 rounded-full border border-amber-500/30"
            style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.05) 100%)" }}>
            <span className="text-sm sm:text-lg font-black text-amber-300">
              {formatCOP(winner.prize)}
            </span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

          {/* Name */}
          <span className="text-sm sm:text-lg font-bold text-white text-center leading-tight">
            {winner.name}
          </span>

          {/* Team */}
          <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-lg sm:text-xl">{winner.teamFlag}</span>
            <span className="text-[11px] sm:text-xs text-white/70 font-semibold sm:hidden">
              {abbreviateTeamName(winner.teamName)}
            </span>
            <span className="text-[11px] sm:text-xs text-white/70 font-semibold hidden sm:inline">
              {winner.teamName}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function RunnerUpCard({ winner }: { winner: WinnerInfo }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Glow behind card */}
      <div className="absolute -inset-3 bg-gray-400/10 rounded-3xl blur-2xl" />

      <div className="relative w-full max-w-[200px] sm:w-56 rounded-2xl overflow-hidden border border-gray-400/20"
        style={{ background: "linear-gradient(180deg, rgba(35,35,45,0.9) 0%, rgba(18,18,22,0.95) 100%)" }}>

        {/* Top accent line */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, #9CA3AF, #D1D5DB, #9CA3AF, transparent)" }} />

        <div className="px-3 py-4 sm:px-4 sm:py-5 flex flex-col items-center gap-2.5 sm:gap-3">
          {/* Silver medal icon */}
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 border-gray-400/30"
            style={{ background: "linear-gradient(135deg, rgba(80,80,90,0.5) 0%, rgba(40,40,50,0.7) 100%)" }}>
            <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7 sm:w-9 sm:h-9" aria-hidden="true">
              <circle cx="20" cy="20" r="17" fill="url(#silverG)" stroke="#9CA3AF" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="12" fill="none" stroke="#D1D5DB" strokeWidth="0.8" opacity="0.4" />
              <text x="20" y="19" textAnchor="middle" fill="#1F2937" fontSize="8" fontWeight="900" fontFamily="sans-serif">2do</text>
              <text x="20" y="27" textAnchor="middle" fill="#1F2937" fontSize="5" fontWeight="700" fontFamily="sans-serif">LUGAR</text>
              <defs>
                <linearGradient id="silverG" x1="20" y1="3" x2="20" y2="37" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#E5E7EB" />
                  <stop offset="50%" stopColor="#C0C0C0" />
                  <stop offset="100%" stopColor="#9CA3AF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Label */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="h-px w-4 sm:w-5 bg-gradient-to-r from-transparent to-gray-400/50" />
            <span className="text-[9px] sm:text-xs font-black text-gray-300 uppercase tracking-[0.2em] sm:tracking-[0.25em]">
              Subcampeón
            </span>
            <div className="h-px w-4 sm:w-5 bg-gradient-to-l from-transparent to-gray-400/50" />
          </div>

          {/* Prize */}
          <div className="px-3 sm:px-4 py-1.5 rounded-full border border-gray-400/20"
            style={{ background: "linear-gradient(135deg, rgba(156,163,175,0.1) 0%, rgba(156,163,175,0.03) 100%)" }}>
            <span className="text-sm sm:text-lg font-black text-gray-300">
              {formatCOP(winner.prize)}
            </span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400/20 to-transparent" />

          {/* Name */}
          <span className="text-xs sm:text-base font-bold text-white text-center leading-tight">
            {winner.name}
          </span>

          {/* Team */}
          <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-base sm:text-lg">{winner.teamFlag}</span>
            <span className="text-[10px] sm:text-[11px] text-white/60 font-semibold sm:hidden">
              {abbreviateTeamName(winner.teamName)}
            </span>
            <span className="text-[10px] sm:text-[11px] text-white/60 font-semibold hidden sm:inline">
              {winner.teamName}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WinnersBanner({ allMatches }: { allMatches: Match[] }) {
  const winners = useMemo(() => {
    const { champion, runnerUp } = getChampionRunnerUp(allMatches)
    if (!champion || !runnerUp) return null

    const champParticipant = participants.find(
      (p) => p.teams[0].name === champion || p.teams[1].name === champion
    )
    const runnerParticipant = participants.find(
      (p) => p.teams[0].name === runnerUp || p.teams[1].name === runnerUp
    )

    const champTeam = champParticipant?.teams.find((t) => t.name === champion)
    const runnerTeam = runnerParticipant?.teams.find((t) => t.name === runnerUp)

    if (!champParticipant || !champTeam) return null

    const samePerson = champParticipant.id === runnerParticipant?.id

    return {
      championWinner: {
        name: champParticipant.name,
        teamName: champTeam.name,
        teamFlag: champTeam.flag,
        prize: PRIZES.champion,
        label: "Campeón",
        type: "champion" as const,
      },
      runnerUpWinner: runnerParticipant && runnerTeam ? {
        name: runnerParticipant.name,
        teamName: runnerTeam.name,
        teamFlag: runnerTeam.flag,
        prize: PRIZES.runnerUp,
        label: "Subcampeón",
        type: "runnerUp" as const,
      } : null,
      samePerson,
    }
  }, [allMatches])

  if (!winners) return null

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Animated gradient border */}
      <div className="absolute inset-0 animate-border-dance rounded-2xl p-[2px]" />

      {/* Main content */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-500/20">
        {/* Background - deep golden */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(160deg, #1a1208 0%, #2a1c0a 30%, #1f1508 60%, #2d1f0a 100%)"
        }} />

        {/* Floating orbs */}
        <div className="absolute top-[-40%] left-[-15%] w-[60%] h-[180%] bg-amber-500/10 rounded-full blur-3xl" style={{ animation: "spin 18s linear infinite" }} />
        <div className="absolute bottom-[-40%] right-[-15%] w-[50%] h-[180%] bg-orange-400/7 rounded-full blur-3xl" style={{ animation: "spin 22s linear infinite reverse" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[140%] bg-yellow-400/4 rounded-full blur-3xl" style={{ animation: "spin 28s linear infinite" }} />

        {/* Shimmer */}
        <div className="absolute inset-0 animate-shimmer" />

        {/* Content */}
        <div className="relative px-5 py-7 sm:px-10 sm:py-9">
          {/* Title */}
          <div className="text-center mb-6">
            <p className="text-sm sm:text-xl font-black text-amber-300 uppercase tracking-[0.35em] animate-float">
              ¡Campeones de la Polla!
            </p>
            <p className="text-[10px] sm:text-xs text-white/35 mt-2 uppercase tracking-widest">
              FIFA World Cup 2026 · Resultados oficiales
            </p>
          </div>

          {/* Winners */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-5 sm:gap-10">
            {winners.samePerson ? (
              <ChampionCard winner={winners.championWinner} />
            ) : (
              <>
                <ChampionCard winner={winners.championWinner} />
                {winners.runnerUpWinner && <RunnerUpCard winner={winners.runnerUpWinner} />}
              </>
            )}
          </div>

          {/* Same person message */}
          {winners.samePerson && (
            <div className="mt-5 text-center">
              <span className="text-xs sm:text-sm text-amber-300/80 font-semibold">
                ¡Mismo participante gana ambos premios!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
