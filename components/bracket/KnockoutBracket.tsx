"use client"

import type { Match } from "@/lib/wc2026-data"
import { cn, abbreviateTeamName } from "@/lib/utils"
import Image from "next/image"

interface BracketMatchProps {
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  homeScore: number | null
  awayScore: number | null
  isLive?: boolean
  isFinished?: boolean
}

function BracketMatch({
  homeTeam, awayTeam, homeFlag, awayFlag,
  homeScore, awayScore, isLive, isFinished
}: BracketMatchProps) {
  const isKnown = !homeTeam.startsWith("G") && !homeTeam.startsWith("3") && !homeTeam.startsWith("W") && !homeTeam.startsWith("L") && !/^\d[A-L]/.test(homeTeam)

  return (
    <div className="relative">
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
            "text-[11px] font-medium flex-1 sm:hidden",
            isKnown ? "text-foreground" : "text-muted-foreground"
          )}>
            {isKnown ? abbreviateTeamName(homeTeam) : "Por definir"}
          </span>
          <span className={cn(
            "text-[11px] font-medium flex-1 hidden sm:inline truncate",
            isKnown ? "text-foreground" : "text-muted-foreground"
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
            "text-[11px] font-medium flex-1 sm:hidden",
            isKnown ? "text-foreground" : "text-muted-foreground"
          )}>
            {isKnown ? abbreviateTeamName(awayTeam) : "Por definir"}
          </span>
          <span className={cn(
            "text-[11px] font-medium flex-1 hidden sm:inline truncate",
            isKnown ? "text-foreground" : "text-muted-foreground"
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
  const octavos   = allMatches.filter((m) => m.phase === "Octavos de Final")
  const cuartos   = allMatches.filter((m) => m.phase === "Cuartos de Final")
  const sf        = allMatches.filter((m) => m.phase === "Semifinales")
  const semis     = allMatches.filter((m) => m.phase === "Semifinal")
  const tp        = allMatches.filter((m) => m.phase === "Tercer Lugar")
  const fin       = allMatches.filter((m) => m.phase === "Final")

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[1300px]">
        {/* Column labels */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto_1fr_1fr_1fr_1fr] gap-3 mb-3">
          {[
            "Octavos (1-8)", "Cuartos (1-4)", "Cuartos Finales (1-2)", "Semifinal",
            "FINAL",
            "Semifinal", "Cuartos Finales (3-4)", "Cuartos (5-8)", "Octavos (9-16)"
          ].map((label) => (
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

        {/* Bracket body */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto_1fr_1fr_1fr_1fr] gap-3 items-center">
          {/* Octavos left (1-8) */}
          <div className="flex flex-col gap-2">
            {octavos.slice(0, 8).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* Cuartos left (1-4) */}
          <div className="flex flex-col gap-8 py-4">
            {cuartos.slice(0, 4).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* Cuartos Finales left (1-2) = Quarter-finals */}
          <div className="flex flex-col gap-20 py-8">
            {sf.slice(0, 2).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* Semifinal left */}
          <div className="flex flex-col gap-28 py-14">
            {semis.slice(0, 1).map((m) => (
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
              <Image src="/world-cup-icon.png" alt="Final" width={80} height={80} className="!w-1/2 !h-auto" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Final</span>
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
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">3er Lugar</span>
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

          {/* Semifinal right */}
          <div className="flex flex-col gap-28 py-14">
            {semis.slice(1, 2).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* Cuartos Finales right (3-4) = Quarter-finals */}
          <div className="flex flex-col gap-20 py-8">
            {sf.slice(2, 4).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* Cuartos right (5-8) */}
          <div className="flex flex-col gap-8 py-4">
            {cuartos.slice(4, 8).map((m) => (
              <BracketMatch
                key={m.id}
                homeTeam={m.homeTeam} awayTeam={m.awayTeam}
                homeFlag={m.homeFlag} awayFlag={m.awayFlag}
                homeScore={m.homeScore} awayScore={m.awayScore}
                isLive={m.status === "live"} isFinished={m.status === "finished"}
              />
            ))}
          </div>

          {/* Octavos right (9-16) */}
          <div className="flex flex-col gap-2">
            {octavos.slice(8, 16).map((m) => (
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
