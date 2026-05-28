"use client"

import { Menu, Sun, Moon } from "lucide-react"

type View = "dashboard" | "calendar" | "standings" | "bracket" | "polla"

interface HeaderProps {
  activeView: View
  onMenuToggle: () => void
  onThemeToggle: () => void
  isDark: boolean
}

const VIEW_TITLES: Record<View, { title: string; sub: string }> = {
  dashboard:  { title: "Resumen General",  sub: "Clasificación y estadísticas de tu polla" },
  polla:      { title: "La Polla",         sub: "Participantes, equipos asignados y premios" },
  calendar:   { title: "Calendario",       sub: "Todos los partidos del Mundial FIFA 2026" },
  standings:  { title: "Fase de Grupos",   sub: "Tablas de posiciones — 12 grupos" },
  bracket:    { title: "Eliminatorias",    sub: "Cuadro de octavos a la gran final" },
}

export function Header({ activeView, onMenuToggle, onThemeToggle, isDark }: HeaderProps) {
  const { title, sub } = VIEW_TITLES[activeView]

  return (
    <header className="h-16 border-b border-border flex items-center px-4 lg:px-6 gap-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
      >
        <Menu className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-foreground font-mono truncate">{title}</h1>
        <p className="text-xs text-muted-foreground truncate hidden sm:block">{sub}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
        >
          {isDark
            ? <Sun className="w-4 h-4 text-primary" />
            : <Moon className="w-4 h-4 text-muted-foreground" />
          }
        </button>

        {/* WC Badge */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[11px] font-bold text-primary tracking-widest font-mono">FIFA</span>
          <span className="text-[9px] text-muted-foreground tracking-wider uppercase">WORLD CUP 2026</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
          <span className="text-base leading-none">⚽</span>
        </div>
      </div>
    </header>
  )
}
