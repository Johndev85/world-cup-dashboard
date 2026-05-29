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
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="animate-pulse-glow rounded-lg w-11 h-11 min-[400px]:w-14 min-[400px]:h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-green-500/30"
        style={{ background: "linear-gradient(135deg, rgba(60,172,59,0.25) 0%, rgba(10,46,10,0.9) 100%)" }}
      >
        <span className="text-lg min-[400px]:text-2xl sm:text-3xl font-black font-mono text-white tabular-nums drop-shadow-lg">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[8px] min-[400px]:text-[10px] sm:text-[11px] text-green-300/80 uppercase tracking-[0.2em] font-bold">
        {label}
      </span>
    </div>
  )
}

function BallImage({ delay }: { delay?: string }) {
  return (
    <img
      src="/icon-balon.png"
      alt=""
      className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
      style={{ animation: `bounce-ball 2.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite${delay ? ` ${delay}` : ""}` }}
    />
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
    <div className="relative overflow-hidden rounded-2xl">
      {/* Animated gradient border */}
      <div className="absolute inset-0 animate-border-dance rounded-2xl p-[2px]">
        <div className="w-full h-full rounded-2xl" />
      </div>

      {/* Main content */}
      <div className="relative rounded-2xl overflow-hidden border border-green-500/20">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #051505 0%, #0a2e0a 25%, #0d1f0d 50%, #0a1a2e 75%, #051505 100%)" }} />

        {/* Floating orbs */}
        <div className="absolute top-[-30%] left-[-10%] w-[50%] h-[160%] bg-green-500/10 rounded-full blur-3xl" style={{ animation: "spin 15s linear infinite" }} />
        <div className="absolute bottom-[-30%] right-[-10%] w-[40%] h-[160%] bg-amber-500/8 rounded-full blur-3xl" style={{ animation: "spin 20s linear infinite reverse" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[120%] bg-emerald-500/6 rounded-full blur-3xl" style={{ animation: "spin 25s linear infinite" }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(60,172,59,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(60,172,59,0.3) 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }} />

        {/* Shimmer */}
        <div className="absolute inset-0 animate-shimmer" />

        {/* Content */}
        <div className="relative px-5 py-5 sm:px-8 sm:py-6">
          {/* Row 1: Trophy + Title + Balls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4">
            <BallImage />
            <div className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border border-green-500/30"
                style={{ background: "linear-gradient(135deg, rgba(60,172,59,0.3) 0%, rgba(10,46,10,0.8) 100%)" }}>
                <FifaTrophy className="w-7 h-9 sm:w-9 sm:h-11" />
              </div>
            </div>
            <BallImage delay="0.3s" />
          </div>

          {/* Row 2: Title */}
          <div className="text-center mb-3">
            <p className="text-xs sm:text-sm font-black text-green-300 uppercase tracking-[0.3em]">
              FIFA World Cup 2026
            </p>
            <p className="text-[10px] sm:text-[11px] text-white/40 mt-1">
              USA · Canada · Mexico · 11 Jun — 19 Jul
            </p>
          </div>

          {/* Row 3: Empieza en */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-green-500/50" />
            <span className="text-sm sm:text-base font-black text-green-400 uppercase tracking-[0.25em] animate-float">
              Empieza en
            </span>
            <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-green-500/50" />
          </div>

          {/* Row 4: Countdown */}
          <div className="flex items-center justify-center gap-2 min-[400px]:gap-3 sm:gap-4">
            <TimeUnit value={time.days} label="Días" />
            <span className="text-xl sm:text-2xl font-black text-green-500/50 -mt-5 animate-pulse">:</span>
            <TimeUnit value={time.hours} label="Horas" />
            <span className="text-xl sm:text-2xl font-black text-green-500/50 -mt-5 animate-pulse">:</span>
            <TimeUnit value={time.minutes} label="Min" />
            <span className="text-xl sm:text-2xl font-black text-green-500/50 -mt-5 animate-pulse">:</span>
            <TimeUnit value={time.seconds} label="Seg" />
          </div>
        </div>
      </div>
    </div>
  )
}
