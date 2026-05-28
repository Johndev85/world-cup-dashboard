"use client"

import type { Match } from "@/lib/wc2026-data"
import { cn } from "@/lib/utils"

interface BracketMatchProps {
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  homeScore: number | null
  awayScore: number | null
  isLive?: boolean
  isFinished?: boolean
  label?: string
}

function BracketMatch({
  homeTeam, awayTeam, homeFlag, awayFlag,
  homeScore, awayScore, isLive, isFinished, label
}: BracketMatchProps) {
  const isKnown = !homeTeam.startsWith("G") && !homeTeam.startsWith("3") && !homeTeam.startsWith("W") && !homeTeam.startsWith("L")

  return (
    <div className="relative">
      {label && (
        <div className="text-[9px] text-muted-foreground font-mono uppercase mb-1 text-center">
          {label}
        </div>
      )}
      <div className={cn(
        "bg-card border rounded overflow-hidden w-40",
        isLive ? "border-accent/60" : "border-border/60"
      )}>
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1 border-b border-border/40",
          isFinished && homeScore !== null && awayScore !== null && homeScore > awayScore
            ? "bg-primary/10"
            : ""
        )}>
          <span className="text-xs flex-shrink-0">{isKnown ? homeFlag : "🏳️"}</span>
          <span className={cn(
            "text-[11px] font-medium flex-1 truncate",
            isKnown ? "text-foreground/90" : "text-muted-foreground"
          )}>
            {isKnown ? homeTeam : "Por definir"}
          </span>
          {(isLive || isFinished) && (
            <span className={cn(
              "text-[11px] font-bold font-mono w-4 text-right",
              isLive ? "text-accent" : "text-foreground"
            )}>
              {homeScore ?? "-"}
            </span>
          )}
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1",
          isFinished && homeScore !== null && awayScore !== null && awayScore > homeScore
            ? "bg-primary/10"
            : ""
        )}>
          <span className="text-xs flex-shrink-0">{isKnown ? awayFlag : "🏳️"}</span>
          <span className={cn(
            "text-[11px] font-medium flex-1 truncate",
            isKnown ? "text-foreground/90" : "text-muted-foreground"
          )}>
            {isKnown ? awayTeam : "Por definir"}
          </span>
          {(isLive || isFinished) && (
            <span className={cn(
              "text-[11px] font-bold font-mono w-4 text-right",
              isLive ? "text-accent" : "text-foreground"
            )}>
              {awayScore ?? "-"}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function KnockoutBracket({ allMatches }: { allMatches: Match[] }) {
  const r32 = allMatches.filter((m) => m.phase === "Octavos de Final")
  const r16 = allMatches.filter((m) => m.phase === "Cuartos de Final")
  const qf  = allMatches.filter((m) => m.phase === "Semifinal")
  const sf  = allMatches.filter((m) => m.phase === "Semifinales")
  const tp  = allMatches.filter((m) => m.phase === "Tercer Lugar")
  const fin = allMatches.filter((m) => m.phase === "Final")

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[1100px]">
        <div className="grid grid-cols-[1fr_1fr_1fr_auto_1fr_1fr] gap-3 mb-3 px-2">
          {["32avos (1-8)", "16avos (1-4)", "Octavos (1-2)", "FINAL", "Octavos (3-4)", "16avos (5-8)"].map((label) => (
            <div key={label} className="text-center">
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                label === "FINAL" ? "text-primary" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_1fr_1fr_auto_1fr_1fr] gap-3 items-center">
          {/* R32 left (matches 1-8) */}
          <div className="flex flex-col gap-2">
            {r32.slice(0, 8).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* R16 left (matches 1-4) */}
          <div className="flex flex-col gap-8 py-4">
            {r16.slice(0, 4).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* QF left (matches 1-2) */}
          <div className="flex flex-col gap-20 py-12">
            {qf.slice(0, 2).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* Final + 3rd */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-lg">🏆</span>
              </div>
              <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Final</span>
            </div>

            {fin.map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}

            <div className="mt-2 border-t border-border/40 pt-3 w-full flex flex-col items-center gap-1">
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest">3er Lugar</span>
              {tp.map((m) => (
                <BracketMatch
                  key={m.id}
                  homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                  homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                  homeScore={m.homeScore} awayScore={m.awayScore}
                  isLive={m.status === "live"} isFinished={m.status === "finished"}
                />
              ))}
            </div>
          </div>

          {/* QF right (matches 3-4) */}
          <div className="flex flex-col gap-20 py-12">
            {qf.slice(2, 4).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* R16 right (matches 5-8) */}
          <div className="flex flex-col gap-8 py-4">
            {r16.slice(4, 8).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* R32 right (matches 9-16) */}
          <div className="flex flex-col gap-2">
            {r32.slice(8, 16).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
