"use client"

import { useState, useEffect } from "react"
import { FifaTrophy } from "@/components/ui/fifa-trophy"

const WORLD_CUP_START = new Date("2026-06-11T13:00:00-06:00")

function getTimeLeft() {
  const now = new Date()
  const diff = WORLD_CUP_START.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isStarted: false,
  }
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="bg-white/10 backdrop-blur-sm rounded-md w-11 h-11 min-[400px]:w-14 min-[400px]:h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-white/15">
        <span className="text-lg min-[400px]:text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[9px] min-[400px]:text-[10px] sm:text-xs text-white/60 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  )
}

export function WorldCupCountdown() {
  const [time, setTime] = useState(getTimeLeft)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted || time.isStarted) return null

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e0a] via-[#0d1f0d] to-[#0a1a2e]">
        {/* Animated orbs */}
        <div className="absolute top-[-50%] left-[-20%] w-[60%] h-[200%] bg-primary/8 rounded-full blur-3xl" style={{ animation: "spin 20s linear infinite" }} />
        <div className="absolute bottom-[-50%] right-[-20%] w-[50%] h-[200%] bg-amber-500/6 rounded-full blur-3xl" style={{ animation: "spin 25s linear infinite reverse" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[150%] bg-emerald-500/5 rounded-full blur-3xl" style={{ animation: "spin 30s linear infinite" }} />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="relative flex flex-col sm:flex-row items-center justify-between px-4 py-4 sm:px-8 sm:py-5 gap-3 sm:gap-4">
        {/* Left: Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/15">
            <FifaTrophy className="w-7 h-9 sm:w-10 sm:h-12" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-sm font-semibold text-white/90 uppercase tracking-widest">
              FIFA World Cup 2026
            </p>
            <p className="text-[9px] sm:text-xs text-white/50 mt-0.5">
              USA · Canada · Mexico
            </p>
            <p className="text-[9px] sm:text-xs text-white/50">
              11 Jun — 19 Jul 2026
            </p>
          </div>
        </div>

        {/* Right: Countdown */}
        <div className="flex items-center gap-1.5 min-[400px]:gap-2.5 sm:gap-3">
          <TimeUnit value={time.days} label="Días" />
          <span className="text-lg sm:text-xl font-bold text-white/30 -mt-4">:</span>
          <TimeUnit value={time.hours} label="Horas" />
          <span className="text-lg sm:text-xl font-bold text-white/30 -mt-4">:</span>
          <TimeUnit value={time.minutes} label="Min" />
          <span className="text-lg sm:text-xl font-bold text-white/30 -mt-4">:</span>
          <TimeUnit value={time.seconds} label="Seg" />
        </div>
      </div>
    </div>
  )
}
