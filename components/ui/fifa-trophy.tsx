export function FifaTrophy({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Globe top */}
      <ellipse cx="32" cy="18" rx="14" ry="12" fill="currentColor" opacity="0.9" />
      <path d="M18 18c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M32 4c0 7.732-6.268 14-14 14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M32 4c0 7.732 6.268 14 14 14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Horizontal lines on globe */}
      <path d="M18.5 12h27" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <path d="M18.5 24h27" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

      {/* Body / stem */}
      <path
        d="M22 28c0 0 2 8 2 16s-2 12-2 12h20c0 0-2-4-2-12s2-16 2-16H22z"
        fill="currentColor"
        opacity="0.85"
      />

      {/* Side handles */}
      <path
        d="M18 30c-6 0-10 4-10 10s4 10 10 10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M46 30c6 0 10 4 10 10s-4 10-10 10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Base */}
      <rect x="16" y="60" width="32" height="6" rx="2" fill="currentColor" opacity="0.9" />
      <rect x="12" y="66" width="40" height="8" rx="3" fill="currentColor" />
    </svg>
  )
}
