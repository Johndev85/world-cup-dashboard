"use client"

import { useState, useMemo, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sidebar } from "./layout/Sidebar"
import { Header } from "./layout/Header"
import { StatsCards } from "./dashboard/StatsCards"
import { Leaderboard } from "./dashboard/Leaderboard"
import { UpcomingMatches } from "./dashboard/UpcomingMatches"
import { WorldCupCountdown } from "./dashboard/WorldCupCountdown"
import { WinnersBanner } from "./dashboard/WinnersBanner"
import { CalendarView } from "./calendar/CalendarView"
import { GroupStandingsView } from "./calendar/GroupStandings"
import { KnockoutBracket } from "./bracket/KnockoutBracket"
import { PollaView } from "./polla/PollaView"
import { useWorldCupData } from "@/hooks/useWorldCupData"
import { computeLeaderboard } from "@/lib/api/leaderboard"

type View = "dashboard" | "calendar" | "standings" | "bracket" | "polla"

export function DashboardShell() {
  const [activeView, setActiveView] = useState<View>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (window.innerWidth < 1024) setSidebarOpen(false)
  }, [])
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"
  const toggleTheme = () => setTheme(isDark ? "light" : "dark")

  const { data, loading, error, refresh } = useWorldCupData()

  const leaderboard = useMemo(
    () => (data ? computeLeaderboard(data.allMatches) : []),
    [data],
  )

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          activeView={activeView}
          onMenuToggle={() => setSidebarOpen((v) => !v)}
          onThemeToggle={toggleTheme}
          isDark={isDark}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {loading && !data && (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Cargando datos del mundial...
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-sm text-accent">Error: {error}</span>
                <button
                  onClick={refresh}
                  className="text-xs px-3 py-1.5 rounded bg-primary text-primary-foreground"
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}

          {data && (
            <>
              {activeView === "dashboard" && (
                <div className="space-y-6 max-w-6xl mx-auto">
                  <WorldCupCountdown />
                  <WinnersBanner allMatches={data.allMatches} />
                  <StatsCards allMatches={data.allMatches} />
                  <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 items-start">
                    <UpcomingMatches allMatches={data.allMatches} />
                    <Leaderboard entries={leaderboard} />
                  </div>
                </div>
              )}

              {activeView === "polla" && (
                <div className="max-w-7xl mx-auto">
                  <PollaView />
                </div>
              )}

              {activeView === "calendar" && (
                <div className="max-w-7xl mx-auto">
                  <CalendarView allMatches={data.allMatches} />
                </div>
              )}

              {activeView === "standings" && (
                <div className="max-w-7xl mx-auto">
                  <GroupStandingsView groupStandings={data.groupStandings} />
                </div>
              )}

              {activeView === "bracket" && (
                <div className="max-w-full">
                  <div className="mb-4">
                    <h2 className="text-base font-semibold text-foreground/80">
                      Cuadro de Eliminatorias
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      48 equipos · 32avos · 16avos · Octavos · Cuartos · Semis ·
                      Final
                    </p>
                  </div>
                  <KnockoutBracket allMatches={data.allMatches} />
                </div>
              )}
            </>
          )}

          {/* Footer */}
          <footer className="mt-auto pt-8 pb-6 border-t border-border/40">
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()}</span>
              <a
                href="https://github.com/Johndev85"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground/70 hover:text-primary transition-colors"
              >
                johndev85
              </a>
              <span>☕</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
