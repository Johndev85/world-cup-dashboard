"use client"

import { LayoutDashboard, CalendarDays, Trophy, Table2, Menu, X, Users } from "lucide-react"
import { FifaTrophy } from "@/components/ui/fifa-trophy"
import { cn } from "@/lib/utils"

type View = "dashboard" | "calendar" | "standings" | "bracket" | "polla"

interface SidebarProps {
  activeView: View
  onViewChange: (view: View) => void
  isOpen: boolean
  onToggle: () => void
}

const navItems: { id: View; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: "dashboard",  label: "Resumen",       icon: LayoutDashboard },
  { id: "polla",      label: "Polla",         icon: Users },
  { id: "calendar",   label: "Calendario",    icon: CalendarDays },
  { id: "standings",  label: "Grupos",        icon: Table2 },
  { id: "bracket",    label: "Eliminatorias", icon: Trophy },
]

export function Sidebar({ activeView, onViewChange, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 shrink-0",
        /* Desktop: relative, takes space in flex */
        "hidden lg:flex",
        isOpen ? "lg:w-56" : "lg:w-16",
        /* Mobile: fixed overlay, hidden when closed */
        "fixed top-0 left-0 h-full z-50 lg:relative lg:z-auto lg:h-auto",
        isOpen ? "flex w-56" : "lg:flex -ml-56 lg:ml-0"
      )}>
        {/* Logo */}
        <div className={cn(
          "flex items-center border-b border-sidebar-border h-16 flex-shrink-0",
          isOpen ? "px-4 gap-3" : "justify-center px-2"
        )}>
          <FifaTrophy className={cn(
            "text-primary flex-shrink-0",
            isOpen ? "w-8 h-10" : "w-6 h-8"
          )} />
          {isOpen && (
            <div className="min-w-0">
              <div className="text-sm font-bold text-sidebar-foreground leading-tight font-mono">
                POLLA 2026
              </div>
              <div className="text-[10px] text-sidebar-foreground/50 uppercase tracking-widest">
                FIFA World Cup
              </div>
            </div>
          )}
        </div>

        {/* Toggle button (desktop) */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-[4.5rem] w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors hidden lg:flex"
        >
          {isOpen
            ? <X className="w-3 h-3 text-muted-foreground" />
            : <Menu className="w-3 h-3 text-muted-foreground" />
          }
        </button>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => { onViewChange(item.id); if (window.innerWidth < 1024) onToggle() }}
                className={cn(
                  "w-full flex items-center rounded-lg transition-all",
                  isOpen ? "gap-3 px-3 py-2.5" : "justify-center p-2.5",
                  isActive
                    ? "bg-sidebar-primary/15 text-sidebar-primary"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className={cn("flex-shrink-0", isOpen ? "w-4 h-4" : "w-5 h-5")} />
                {isOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {isActive && isOpen && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="text-[10px] text-sidebar-foreground/50 text-center leading-relaxed">
              USA · CANADA · MEXICO<br />
              <span className="text-sidebar-primary/70">11 JUN — 19 JUL 2026</span>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
