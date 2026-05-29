"use client"

import type { CSSProperties } from "react"

export function SoccerBall({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} style={style} aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="white" stroke="#ccc" strokeWidth="0.5" />
      <polygon points="50,32 62,40 58,54 42,54 38,40" fill="#1a1a1a" />
      <polygon points="50,12 60,20 56,32 44,32 40,20" fill="#1a1a1a" />
      <polygon points="72,20 80,32 72,42 62,40 64,26" fill="#1a1a1a" />
      <polygon points="80,52 76,66 64,68 62,56 72,48" fill="#1a1a1a" />
      <polygon points="28,52 24,66 36,68 38,56 28,48" fill="#1a1a1a" />
      <polygon points="28,20 20,32 28,42 38,40 36,26" fill="#1a1a1a" />
      <polygon points="50,68 60,64 58,54 42,54 40,64" fill="#1a1a1a" />
      <polygon points="72,80 80,68 72,62 64,68 66,78" fill="#1a1a1a" />
      <polygon points="28,80 20,68 28,62 36,68 34,78" fill="#1a1a1a" />
      <line x1="50" y1="32" x2="50" y2="12" stroke="white" strokeWidth="1.5" />
      <line x1="62" y1="40" x2="72" y2="20" stroke="white" strokeWidth="1.5" />
      <line x1="72" y1="42" x2="80" y2="52" stroke="white" strokeWidth="1.5" />
      <line x1="64" y1="68" x2="50" y2="68" stroke="white" strokeWidth="1.5" />
      <line x1="36" y1="68" x2="50" y2="68" stroke="white" strokeWidth="1.5" />
      <line x1="28" y1="42" x2="20" y2="52" stroke="white" strokeWidth="1.5" />
      <line x1="38" y1="40" x2="28" y2="20" stroke="white" strokeWidth="1.5" />
      <line x1="44" y1="32" x2="40" y2="20" stroke="white" strokeWidth="1.5" />
      <line x1="56" y1="32" x2="64" y2="26" stroke="white" strokeWidth="1.5" />
      <line x1="60" y1="20" x2="64" y2="26" stroke="white" strokeWidth="1.5" />
      <line x1="72" y1="42" x2="72" y2="48" stroke="white" strokeWidth="1.5" />
      <line x1="64" y1="68" x2="66" y2="78" stroke="white" strokeWidth="1.5" />
      <line x1="36" y1="68" x2="34" y2="78" stroke="white" strokeWidth="1.5" />
      <line x1="28" y1="42" x2="28" y2="48" stroke="white" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="36" y2="26" stroke="white" strokeWidth="1.5" />
      <ellipse cx="36" cy="32" rx="10" ry="8" fill="white" opacity="0.35" transform="rotate(-25, 36, 32)" />
    </svg>
  )
}
