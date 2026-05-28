// FIFA World Cup 2026 — Full Data
// Hosts: USA, Canada, Mexico | 48 teams | 104 matches

export type Phase =
  | "Grupo A" | "Grupo B" | "Grupo C" | "Grupo D"
  | "Grupo E" | "Grupo F" | "Grupo G" | "Grupo H"
  | "Grupo I" | "Grupo J" | "Grupo K" | "Grupo L"
  | "Octavos de Final"
  | "Cuartos de Final"
  | "Semifinal"
  | "Semifinales"
  | "Tercer Lugar"
  | "Final"

export type MatchStatus = "pending" | "live" | "finished"

export interface Match {
  id: number
  phase: Phase
  date: string      // ISO date-time
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
  homeScore: number | null
  awayScore: number | null
  venue: string
  city: string
  country: "USA" | "CAN" | "MEX"
  status: MatchStatus
}

export interface PollaTeam {
  name: string
  flag: string
  group: string
}

export interface Participant {
  id: number
  name: string
  avatar: string
  initials: string
  teams: [PollaTeam, PollaTeam]
  points: number
  correctScores: number
  correctResults: number
  totalPredictions: number
  position: number
  trend: "up" | "down" | "same"
}

export const PRIZES = {
  champion: 1_000_000,
  runnerUp: 200_000,
}

export interface GroupStanding {
  group: string
  teams: {
    name: string
    flag: string
    played: number
    wins: number
    draws: number
    losses: number
    gf: number
    ga: number
    gd: number
    points: number
  }[]
}

// ───────────────────────────────────────────
// GROUP PHASE — 12 groups × 6 matches = 72 matches
// ───────────────────────────────────────────
const groupMatches: Match[] = [
  // ── GRUPO A ──
  { id: 1,  phase: "Grupo A", date: "2026-06-11T19:00:00", homeTeam: "México",    awayTeam: "Argentina",  homeFlag: "🇲🇽", awayFlag: "🇦🇷", homeScore: null, awayScore: null, venue: "Estadio Azteca",      city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 2,  phase: "Grupo A", date: "2026-06-11T22:00:00", homeTeam: "Ecuador",   awayTeam: "Hungría",    homeFlag: "🇪🇨", awayFlag: "🇭🇺", homeScore: null, awayScore: null, venue: "Estadio Azteca",      city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 3,  phase: "Grupo A", date: "2026-06-15T19:00:00", homeTeam: "Argentina", awayTeam: "Ecuador",    homeFlag: "🇦🇷", awayFlag: "🇪🇨", homeScore: null, awayScore: null, venue: "Estadio Azteca",      city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 4,  phase: "Grupo A", date: "2026-06-15T22:00:00", homeTeam: "Hungría",   awayTeam: "México",     homeFlag: "🇭🇺", awayFlag: "🇲🇽", homeScore: null, awayScore: null, venue: "Estadio Azteca",      city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 5,  phase: "Grupo A", date: "2026-06-19T19:00:00", homeTeam: "México",    awayTeam: "Ecuador",    homeFlag: "🇲🇽", awayFlag: "🇪🇨", homeScore: null, awayScore: null, venue: "Estadio Azteca",      city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 6,  phase: "Grupo A", date: "2026-06-19T19:00:00", homeTeam: "Argentina", awayTeam: "Hungría",    homeFlag: "🇦🇷", awayFlag: "🇭🇺", homeScore: null, awayScore: null, venue: "Estadio Azteca",      city: "Ciudad de México", country: "MEX", status: "pending" },

  // ── GRUPO B ──
  { id: 7,  phase: "Grupo B", date: "2026-06-12T16:00:00", homeTeam: "USA",       awayTeam: "Brasil",     homeFlag: "🇺🇸", awayFlag: "🇧🇷", homeScore: null, awayScore: null, venue: "MetLife Stadium",     city: "Nueva York",       country: "USA", status: "pending" },
  { id: 8,  phase: "Grupo B", date: "2026-06-12T20:00:00", homeTeam: "Alemania",  awayTeam: "Japón",      homeFlag: "🇩🇪", awayFlag: "🇯🇵", homeScore: null, awayScore: null, venue: "MetLife Stadium",     city: "Nueva York",       country: "USA", status: "pending" },
  { id: 9,  phase: "Grupo B", date: "2026-06-16T16:00:00", homeTeam: "Brasil",    awayTeam: "Alemania",   homeFlag: "🇧🇷", awayFlag: "🇩🇪", homeScore: null, awayScore: null, venue: "MetLife Stadium",     city: "Nueva York",       country: "USA", status: "pending" },
  { id: 10, phase: "Grupo B", date: "2026-06-16T20:00:00", homeTeam: "Japón",     awayTeam: "USA",        homeFlag: "🇯🇵", awayFlag: "🇺🇸", homeScore: null, awayScore: null, venue: "MetLife Stadium",     city: "Nueva York",       country: "USA", status: "pending" },
  { id: 11, phase: "Grupo B", date: "2026-06-20T20:00:00", homeTeam: "USA",       awayTeam: "Alemania",   homeFlag: "🇺🇸", awayFlag: "🇩🇪", homeScore: null, awayScore: null, venue: "MetLife Stadium",     city: "Nueva York",       country: "USA", status: "pending" },
  { id: 12, phase: "Grupo B", date: "2026-06-20T20:00:00", homeTeam: "Brasil",    awayTeam: "Japón",      homeFlag: "🇧🇷", awayFlag: "🇯🇵", homeScore: null, awayScore: null, venue: "MetLife Stadium",     city: "Nueva York",       country: "USA", status: "pending" },

  // ── GRUPO C ──
  { id: 13, phase: "Grupo C", date: "2026-06-12T18:00:00", homeTeam: "España",    awayTeam: "Colombia",   homeFlag: "🇪🇸", awayFlag: "🇨🇴", homeScore: null, awayScore: null, venue: "SoFi Stadium",        city: "Los Ángeles",      country: "USA", status: "pending" },
  { id: 14, phase: "Grupo C", date: "2026-06-12T21:00:00", homeTeam: "Marruecos", awayTeam: "Bélgica",    homeFlag: "🇲🇦", awayFlag: "🇧🇪", homeScore: null, awayScore: null, venue: "SoFi Stadium",        city: "Los Ángeles",      country: "USA", status: "pending" },
  { id: 15, phase: "Grupo C", date: "2026-06-16T18:00:00", homeTeam: "Colombia",  awayTeam: "Marruecos",  homeFlag: "🇨🇴", awayFlag: "🇲🇦", homeScore: null, awayScore: null, venue: "SoFi Stadium",        city: "Los Ángeles",      country: "USA", status: "pending" },
  { id: 16, phase: "Grupo C", date: "2026-06-16T21:00:00", homeTeam: "Bélgica",   awayTeam: "España",     homeFlag: "🇧🇪", awayFlag: "🇪🇸", homeScore: null, awayScore: null, venue: "SoFi Stadium",        city: "Los Ángeles",      country: "USA", status: "pending" },
  { id: 17, phase: "Grupo C", date: "2026-06-20T20:00:00", homeTeam: "España",    awayTeam: "Marruecos",  homeFlag: "🇪🇸", awayFlag: "🇲🇦", homeScore: null, awayScore: null, venue: "SoFi Stadium",        city: "Los Ángeles",      country: "USA", status: "pending" },
  { id: 18, phase: "Grupo C", date: "2026-06-20T20:00:00", homeTeam: "Colombia",  awayTeam: "Bélgica",    homeFlag: "🇨🇴", awayFlag: "🇧🇪", homeScore: null, awayScore: null, venue: "SoFi Stadium",        city: "Los Ángeles",      country: "USA", status: "pending" },

  // ── GRUPO D ──
  { id: 19, phase: "Grupo D", date: "2026-06-13T17:00:00", homeTeam: "Francia",   awayTeam: "Uruguay",    homeFlag: "🇫🇷", awayFlag: "🇺🇾", homeScore: null, awayScore: null, venue: "AT&T Stadium",        city: "Dallas",           country: "USA", status: "pending" },
  { id: 20, phase: "Grupo D", date: "2026-06-13T20:00:00", homeTeam: "Senegal",   awayTeam: "Polonia",    homeFlag: "🇸🇳", awayFlag: "🇵🇱", homeScore: null, awayScore: null, venue: "AT&T Stadium",        city: "Dallas",           country: "USA", status: "pending" },
  { id: 21, phase: "Grupo D", date: "2026-06-17T17:00:00", homeTeam: "Uruguay",   awayTeam: "Senegal",    homeFlag: "🇺🇾", awayFlag: "🇸🇳", homeScore: null, awayScore: null, venue: "AT&T Stadium",        city: "Dallas",           country: "USA", status: "pending" },
  { id: 22, phase: "Grupo D", date: "2026-06-17T20:00:00", homeTeam: "Polonia",   awayTeam: "Francia",    homeFlag: "🇵🇱", awayFlag: "🇫🇷", homeScore: null, awayScore: null, venue: "AT&T Stadium",        city: "Dallas",           country: "USA", status: "pending" },
  { id: 23, phase: "Grupo D", date: "2026-06-21T20:00:00", homeTeam: "Francia",   awayTeam: "Senegal",    homeFlag: "🇫🇷", awayFlag: "🇸🇳", homeScore: null, awayScore: null, venue: "AT&T Stadium",        city: "Dallas",           country: "USA", status: "pending" },
  { id: 24, phase: "Grupo D", date: "2026-06-21T20:00:00", homeTeam: "Uruguay",   awayTeam: "Polonia",    homeFlag: "🇺🇾", awayFlag: "🇵🇱", homeScore: null, awayScore: null, venue: "AT&T Stadium",        city: "Dallas",           country: "USA", status: "pending" },

  // ── GRUPO E ──
  { id: 25, phase: "Grupo E", date: "2026-06-13T18:00:00", homeTeam: "Inglaterra","awayTeam": "Países Bajos", homeFlag: "🇬🇧", awayFlag: "🇳🇱", homeScore: null, awayScore: null, venue: "Levi's Stadium",     city: "San Francisco",    country: "USA", status: "pending" },
  { id: 26, phase: "Grupo E", date: "2026-06-13T21:00:00", homeTeam: "Serbia",    awayTeam: "Ghana",      homeFlag: "🇷🇸", awayFlag: "🇬🇭", homeScore: null, awayScore: null, venue: "Levi's Stadium",     city: "San Francisco",    country: "USA", status: "pending" },
  { id: 27, phase: "Grupo E", date: "2026-06-17T18:00:00", homeTeam: "Países Bajos", awayTeam: "Serbia", homeFlag: "🇳🇱", awayFlag: "🇷🇸", homeScore: null, awayScore: null, venue: "Levi's Stadium",     city: "San Francisco",    country: "USA", status: "pending" },
  { id: 28, phase: "Grupo E", date: "2026-06-17T21:00:00", homeTeam: "Ghana",     awayTeam: "Inglaterra", homeFlag: "🇬🇭", awayFlag: "🇬🇧", homeScore: null, awayScore: null, venue: "Levi's Stadium",     city: "San Francisco",    country: "USA", status: "pending" },
  { id: 29, phase: "Grupo E", date: "2026-06-21T20:00:00", homeTeam: "Inglaterra","awayTeam": "Serbia",   homeFlag: "🇬🇧", awayFlag: "🇷🇸", homeScore: null, awayScore: null, venue: "Levi's Stadium",     city: "San Francisco",    country: "USA", status: "pending" },
  { id: 30, phase: "Grupo E", date: "2026-06-21T20:00:00", homeTeam: "Países Bajos", awayTeam: "Ghana", homeFlag: "🇳🇱", awayFlag: "🇬🇭", homeScore: null, awayScore: null, venue: "Levi's Stadium",     city: "San Francisco",    country: "USA", status: "pending" },

  // ── GRUPO F ──
  { id: 31, phase: "Grupo F", date: "2026-06-14T17:00:00", homeTeam: "Portugal",  awayTeam: "México",     homeFlag: "🇵🇹", awayFlag: "🇲🇽", homeScore: null, awayScore: null, venue: "Estadio BBVA",        city: "Monterrey",        country: "MEX", status: "pending" },
  { id: 32, phase: "Grupo F", date: "2026-06-14T20:00:00", homeTeam: "Turquía",   awayTeam: "Camerún",    homeFlag: "🇹🇷", awayFlag: "🇨🇲", homeScore: null, awayScore: null, venue: "Estadio BBVA",        city: "Monterrey",        country: "MEX", status: "pending" },
  { id: 33, phase: "Grupo F", date: "2026-06-18T17:00:00", homeTeam: "México",    awayTeam: "Turquía",    homeFlag: "🇲🇽", awayFlag: "🇹🇷", homeScore: null, awayScore: null, venue: "Estadio BBVA",        city: "Monterrey",        country: "MEX", status: "pending" },
  { id: 34, phase: "Grupo F", date: "2026-06-18T20:00:00", homeTeam: "Camerún",   awayTeam: "Portugal",   homeFlag: "🇨🇲", awayFlag: "🇵🇹", homeScore: null, awayScore: null, venue: "Estadio BBVA",        city: "Monterrey",        country: "MEX", status: "pending" },
  { id: 35, phase: "Grupo F", date: "2026-06-22T20:00:00", homeTeam: "Portugal",  awayTeam: "Turquía",    homeFlag: "🇵🇹", awayFlag: "🇹🇷", homeScore: null, awayScore: null, venue: "Estadio BBVA",        city: "Monterrey",        country: "MEX", status: "pending" },
  { id: 36, phase: "Grupo F", date: "2026-06-22T20:00:00", homeTeam: "México",    awayTeam: "Camerún",    homeFlag: "🇲🇽", awayFlag: "🇨🇲", homeScore: null, awayScore: null, venue: "Estadio BBVA",        city: "Monterrey",        country: "MEX", status: "pending" },

  // ── GRUPO G ──
  { id: 37, phase: "Grupo G", date: "2026-06-14T18:00:00", homeTeam: "Canadá",    awayTeam: "Croacia",    homeFlag: "🇨🇦", awayFlag: "🇭🇷", homeScore: null, awayScore: null, venue: "BC Place",            city: "Vancouver",        country: "CAN", status: "pending" },
  { id: 38, phase: "Grupo G", date: "2026-06-14T21:00:00", homeTeam: "Chile",     awayTeam: "Nigeria",    homeFlag: "🇨🇱", awayFlag: "🇳🇬", homeScore: null, awayScore: null, venue: "BC Place",            city: "Vancouver",        country: "CAN", status: "pending" },
  { id: 39, phase: "Grupo G", date: "2026-06-18T18:00:00", homeTeam: "Croacia",   awayTeam: "Chile",      homeFlag: "🇭🇷", awayFlag: "🇨🇱", homeScore: null, awayScore: null, venue: "BC Place",            city: "Vancouver",        country: "CAN", status: "pending" },
  { id: 40, phase: "Grupo G", date: "2026-06-18T21:00:00", homeTeam: "Nigeria",   awayTeam: "Canadá",     homeFlag: "🇳🇬", awayFlag: "🇨🇦", homeScore: null, awayScore: null, venue: "BC Place",            city: "Vancouver",        country: "CAN", status: "pending" },
  { id: 41, phase: "Grupo G", date: "2026-06-22T20:00:00", homeTeam: "Canadá",    awayTeam: "Chile",      homeFlag: "🇨🇦", awayFlag: "🇨🇱", homeScore: null, awayScore: null, venue: "BC Place",            city: "Vancouver",        country: "CAN", status: "pending" },
  { id: 42, phase: "Grupo G", date: "2026-06-22T20:00:00", homeTeam: "Croacia",   awayTeam: "Nigeria",    homeFlag: "🇭🇷", awayFlag: "🇳🇬", homeScore: null, awayScore: null, venue: "BC Place",            city: "Vancouver",        country: "CAN", status: "pending" },

  // ── GRUPO H ──
  { id: 43, phase: "Grupo H", date: "2026-06-15T17:00:00", homeTeam: "Italia",    awayTeam: "Perú",       homeFlag: "🇮🇹", awayFlag: "🇵🇪", homeScore: null, awayScore: null, venue: "Estadio Olímpico",    city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 44, phase: "Grupo H", date: "2026-06-15T20:00:00", homeTeam: "Dinamarca", awayTeam: "Irán",       homeFlag: "🇩🇰", awayFlag: "🇮🇷", homeScore: null, awayScore: null, venue: "Estadio Olímpico",    city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 45, phase: "Grupo H", date: "2026-06-19T17:00:00", homeTeam: "Perú",      awayTeam: "Dinamarca",  homeFlag: "🇵🇪", awayFlag: "🇩🇰", homeScore: null, awayScore: null, venue: "Estadio Olímpico",    city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 46, phase: "Grupo H", date: "2026-06-19T20:00:00", homeTeam: "Irán",      awayTeam: "Italia",     homeFlag: "🇮🇷", awayFlag: "🇮🇹", homeScore: null, awayScore: null, venue: "Estadio Olímpico",    city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 47, phase: "Grupo H", date: "2026-06-23T20:00:00", homeTeam: "Italia",    awayTeam: "Dinamarca",  homeFlag: "🇮🇹", awayFlag: "🇩🇰", homeScore: null, awayScore: null, venue: "Estadio Olímpico",    city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 48, phase: "Grupo H", date: "2026-06-23T20:00:00", homeTeam: "Perú",      awayTeam: "Irán",       homeFlag: "🇵🇪", awayFlag: "🇮🇷", homeScore: null, awayScore: null, venue: "Estadio Olímpico",    city: "Ciudad de México", country: "MEX", status: "pending" },

  // ── GRUPO I ──
  { id: 49, phase: "Grupo I", date: "2026-06-15T18:00:00", homeTeam: "Austria",   awayTeam: "Australia",  homeFlag: "🇦🇹", awayFlag: "🇦🇺", homeScore: null, awayScore: null, venue: "Dignity Health Park",  city: "Los Ángeles",      country: "USA", status: "pending" },
  { id: 50, phase: "Grupo I", date: "2026-06-15T21:00:00", homeTeam: "Suiza",     awayTeam: "Venezuela",  homeFlag: "🇨🇭", awayFlag: "🇻🇪", homeScore: null, awayScore: null, venue: "Dignity Health Park",  city: "Los Ángeles",      country: "USA", status: "pending" },
  { id: 51, phase: "Grupo I", date: "2026-06-19T18:00:00", homeTeam: "Australia", awayTeam: "Suiza",      homeFlag: "🇦🇺", awayFlag: "🇨🇭", homeScore: null, awayScore: null, venue: "Dignity Health Park",  city: "Los Ángeles",      country: "USA", status: "pending" },
  { id: 52, phase: "Grupo I", date: "2026-06-19T21:00:00", homeTeam: "Venezuela", awayTeam: "Austria",    homeFlag: "🇻🇪", awayFlag: "🇦🇹", homeScore: null, awayScore: null, venue: "Dignity Health Park",  city: "Los Ángeles",      country: "USA", status: "pending" },
  { id: 53, phase: "Grupo I", date: "2026-06-23T20:00:00", homeTeam: "Austria",   awayTeam: "Suiza",      homeFlag: "🇦🇹", awayFlag: "🇨🇭", homeScore: null, awayScore: null, venue: "Dignity Health Park",  city: "Los Ángeles",      country: "USA", status: "pending" },
  { id: 54, phase: "Grupo I", date: "2026-06-23T20:00:00", homeTeam: "Australia", awayTeam: "Venezuela",  homeFlag: "🇦🇺", awayFlag: "🇻🇪", homeScore: null, awayScore: null, venue: "Dignity Health Park",  city: "Los Ángeles",      country: "USA", status: "pending" },

  // ── GRUPO J ──
  { id: 55, phase: "Grupo J", date: "2026-06-16T17:00:00", homeTeam: "Corea del Sur", awayTeam: "Costa Rica", homeFlag: "🇰🇷", awayFlag: "🇨🇷", homeScore: null, awayScore: null, venue: "Arrowhead Stadium", city: "Kansas City",     country: "USA", status: "pending" },
  { id: 56, phase: "Grupo J", date: "2026-06-16T20:00:00", homeTeam: "Rumania",   awayTeam: "Bolivia",    homeFlag: "🇷🇴", awayFlag: "🇧🇴", homeScore: null, awayScore: null, venue: "Arrowhead Stadium",  city: "Kansas City",      country: "USA", status: "pending" },
  { id: 57, phase: "Grupo J", date: "2026-06-20T17:00:00", homeTeam: "Costa Rica","awayTeam": "Rumania",  homeFlag: "🇨🇷", awayFlag: "🇷🇴", homeScore: null, awayScore: null, venue: "Arrowhead Stadium",  city: "Kansas City",      country: "USA", status: "pending" },
  { id: 58, phase: "Grupo J", date: "2026-06-20T20:00:00", homeTeam: "Bolivia",   awayTeam: "Corea del Sur", homeFlag: "🇧🇴", awayFlag: "🇰🇷", homeScore: null, awayScore: null, venue: "Arrowhead Stadium", city: "Kansas City",    country: "USA", status: "pending" },
  { id: 59, phase: "Grupo J", date: "2026-06-24T20:00:00", homeTeam: "Corea del Sur", awayTeam: "Rumania", homeFlag: "🇰🇷", awayFlag: "🇷🇴", homeScore: null, awayScore: null, venue: "Arrowhead Stadium", city: "Kansas City",     country: "USA", status: "pending" },
  { id: 60, phase: "Grupo J", date: "2026-06-24T20:00:00", homeTeam: "Costa Rica","awayTeam": "Bolivia",  homeFlag: "🇨🇷", awayFlag: "🇧🇴", homeScore: null, awayScore: null, venue: "Arrowhead Stadium",  city: "Kansas City",      country: "USA", status: "pending" },

  // ── GRUPO K ──
  { id: 61, phase: "Grupo K", date: "2026-06-17T17:00:00", homeTeam: "Rep. Checa", awayTeam: "Arabia Saudita", homeFlag: "🇨🇿", awayFlag: "🇸🇦", homeScore: null, awayScore: null, venue: "BMO Field",         city: "Toronto",          country: "CAN", status: "pending" },
  { id: 62, phase: "Grupo K", date: "2026-06-17T20:00:00", homeTeam: "Grecia",    awayTeam: "Paraguay",   homeFlag: "🇬🇷", awayFlag: "🇵🇾", homeScore: null, awayScore: null, venue: "BMO Field",           city: "Toronto",          country: "CAN", status: "pending" },
  { id: 63, phase: "Grupo K", date: "2026-06-21T17:00:00", homeTeam: "Arabia Saudita", awayTeam: "Grecia", homeFlag: "🇸🇦", awayFlag: "🇬🇷", homeScore: null, awayScore: null, venue: "BMO Field",          city: "Toronto",          country: "CAN", status: "pending" },
  { id: 64, phase: "Grupo K", date: "2026-06-21T20:00:00", homeTeam: "Paraguay",  awayTeam: "Rep. Checa", homeFlag: "🇵🇾", awayFlag: "🇨🇿", homeScore: null, awayScore: null, venue: "BMO Field",           city: "Toronto",          country: "CAN", status: "pending" },
  { id: 65, phase: "Grupo K", date: "2026-06-25T20:00:00", homeTeam: "Rep. Checa", awayTeam: "Grecia",   homeFlag: "🇨🇿", awayFlag: "🇬🇷", homeScore: null, awayScore: null, venue: "BMO Field",           city: "Toronto",          country: "CAN", status: "pending" },
  { id: 66, phase: "Grupo K", date: "2026-06-25T20:00:00", homeTeam: "Arabia Saudita", awayTeam: "Paraguay", homeFlag: "🇸🇦", awayFlag: "🇵🇾", homeScore: null, awayScore: null, venue: "BMO Field",         city: "Toronto",          country: "CAN", status: "pending" },

  // ── GRUPO L ──
  { id: 67, phase: "Grupo L", date: "2026-06-18T17:00:00", homeTeam: "Egipto",    awayTeam: "Costa de Marfil", homeFlag: "🇪🇬", awayFlag: "🇨🇮", homeScore: null, awayScore: null, venue: "Estadio de Guadalajara", city: "Guadalajara",  country: "MEX", status: "pending" },
  { id: 68, phase: "Grupo L", date: "2026-06-18T20:00:00", homeTeam: "Eslovenia", awayTeam: "EAU",        homeFlag: "🇸🇮", awayFlag: "🇦🇪", homeScore: null, awayScore: null, venue: "Estadio de Guadalajara", city: "Guadalajara",   country: "MEX", status: "pending" },
  { id: 69, phase: "Grupo L", date: "2026-06-22T17:00:00", homeTeam: "Costa de Marfil", awayTeam: "Eslovenia", homeFlag: "🇨🇮", awayFlag: "🇸🇮", homeScore: null, awayScore: null, venue: "Estadio de Guadalajara", city: "Guadalajara", country: "MEX", status: "pending" },
  { id: 70, phase: "Grupo L", date: "2026-06-22T20:00:00", homeTeam: "EAU",       awayTeam: "Egipto",     homeFlag: "🇦🇪", awayFlag: "🇪🇬", homeScore: null, awayScore: null, venue: "Estadio de Guadalajara", city: "Guadalajara",   country: "MEX", status: "pending" },
  { id: 71, phase: "Grupo L", date: "2026-06-26T20:00:00", homeTeam: "Egipto",    awayTeam: "Eslovenia",  homeFlag: "🇪🇬", awayFlag: "🇸🇮", homeScore: null, awayScore: null, venue: "Estadio de Guadalajara", city: "Guadalajara",   country: "MEX", status: "pending" },
  { id: 72, phase: "Grupo L", date: "2026-06-26T20:00:00", homeTeam: "Costa de Marfil", awayTeam: "EAU",  homeFlag: "🇨🇮", awayFlag: "🇦🇪", homeScore: null, awayScore: null, venue: "Estadio de Guadalajara", city: "Guadalajara",  country: "MEX", status: "pending" },
]

// ───────────────────────────────────────────
// KNOCKOUT PHASE
// ───────────────────────────────────────────
const knockoutMatches: Match[] = [
  // ── OCTAVOS ──
  { id: 73,  phase: "Octavos de Final", date: "2026-06-29T20:00:00", homeTeam: "1A", awayTeam: "2B", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "MetLife Stadium",     city: "Nueva York",  country: "USA", status: "pending" },
  { id: 74,  phase: "Octavos de Final", date: "2026-06-29T23:00:00", homeTeam: "1C", awayTeam: "2D", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "SoFi Stadium",        city: "Los Ángeles", country: "USA", status: "pending" },
  { id: 75,  phase: "Octavos de Final", date: "2026-06-30T20:00:00", homeTeam: "1E", awayTeam: "2F", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "AT&T Stadium",        city: "Dallas",      country: "USA", status: "pending" },
  { id: 76,  phase: "Octavos de Final", date: "2026-06-30T23:00:00", homeTeam: "1G", awayTeam: "2H", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "Levi's Stadium",     city: "San Francisco",country: "USA",status: "pending" },
  { id: 77,  phase: "Octavos de Final", date: "2026-07-01T20:00:00", homeTeam: "1I", awayTeam: "2J", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "Estadio Azteca",      city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 78,  phase: "Octavos de Final", date: "2026-07-01T23:00:00", homeTeam: "1K", awayTeam: "2L", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "Estadio BBVA",        city: "Monterrey",   country: "MEX", status: "pending" },
  { id: 79,  phase: "Octavos de Final", date: "2026-07-02T20:00:00", homeTeam: "1B", awayTeam: "2A", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "BC Place",            city: "Vancouver",   country: "CAN", status: "pending" },
  { id: 80,  phase: "Octavos de Final", date: "2026-07-02T23:00:00", homeTeam: "1D", awayTeam: "2C", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "BMO Field",           city: "Toronto",     country: "CAN", status: "pending" },
  { id: 81,  phase: "Octavos de Final", date: "2026-07-03T20:00:00", homeTeam: "1F", awayTeam: "2E", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "Arrowhead Stadium",  city: "Kansas City", country: "USA", status: "pending" },
  { id: 82,  phase: "Octavos de Final", date: "2026-07-03T23:00:00", homeTeam: "1H", awayTeam: "2G", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "Estadio de Guadalajara", city: "Guadalajara", country: "MEX", status: "pending" },
  { id: 83,  phase: "Octavos de Final", date: "2026-07-04T20:00:00", homeTeam: "1J", awayTeam: "2I", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "MetLife Stadium",     city: "Nueva York",  country: "USA", status: "pending" },
  { id: 84,  phase: "Octavos de Final", date: "2026-07-04T23:00:00", homeTeam: "1L", awayTeam: "2K", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "SoFi Stadium",        city: "Los Ángeles", country: "USA", status: "pending" },
  { id: 85,  phase: "Octavos de Final", date: "2026-07-05T20:00:00", homeTeam: "3Mejor1", awayTeam: "3Mejor2", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "AT&T Stadium", city: "Dallas",     country: "USA", status: "pending" },
  { id: 86,  phase: "Octavos de Final", date: "2026-07-05T23:00:00", homeTeam: "3Mejor3", awayTeam: "3Mejor4", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "Levi's Stadium", city: "San Francisco", country: "USA", status: "pending" },
  { id: 87,  phase: "Octavos de Final", date: "2026-07-06T20:00:00", homeTeam: "3Mejor5", awayTeam: "3Mejor6", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "AT&T Stadium", city: "Dallas",     country: "USA", status: "pending" },
  { id: 88,  phase: "Octavos de Final", date: "2026-07-06T23:00:00", homeTeam: "3Mejor7", awayTeam: "3Mejor8", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "MetLife Stadium", city: "Nueva York", country: "USA", status: "pending" },

  // ── CUARTOS ──
  { id: 89,  phase: "Cuartos de Final", date: "2026-07-10T20:00:00", homeTeam: "GQ1", awayTeam: "GQ2", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "MetLife Stadium",     city: "Nueva York",  country: "USA", status: "pending" },
  { id: 90,  phase: "Cuartos de Final", date: "2026-07-10T23:00:00", homeTeam: "GQ3", awayTeam: "GQ4", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "AT&T Stadium",        city: "Dallas",      country: "USA", status: "pending" },
  { id: 91,  phase: "Cuartos de Final", date: "2026-07-11T20:00:00", homeTeam: "GQ5", awayTeam: "GQ6", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "SoFi Stadium",        city: "Los Ángeles", country: "USA", status: "pending" },
  { id: 92,  phase: "Cuartos de Final", date: "2026-07-11T23:00:00", homeTeam: "GQ7", awayTeam: "GQ8", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "Estadio Azteca",      city: "Ciudad de México", country: "MEX", status: "pending" },
  { id: 93,  phase: "Cuartos de Final", date: "2026-07-12T20:00:00", homeTeam: "GQ9", awayTeam: "GQ10",homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "BC Place",            city: "Vancouver",   country: "CAN", status: "pending" },
  { id: 94,  phase: "Cuartos de Final", date: "2026-07-12T23:00:00", homeTeam: "GQ11","awayTeam": "GQ12", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "Levi's Stadium",   city: "San Francisco",country: "USA",status: "pending" },
  { id: 95,  phase: "Cuartos de Final", date: "2026-07-13T20:00:00", homeTeam: "GQ13","awayTeam": "GQ14", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "BMO Field",         city: "Toronto",     country: "CAN", status: "pending" },
  { id: 96,  phase: "Cuartos de Final", date: "2026-07-13T23:00:00", homeTeam: "GQ15","awayTeam": "GQ16", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "Arrowhead Stadium",city: "Kansas City", country: "USA", status: "pending" },

  // ── SEMIFINALES ──
  { id: 97,  phase: "Semifinal", date: "2026-07-14T20:00:00", homeTeam: "SF1", awayTeam: "SF2", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "MetLife Stadium",  city: "Nueva York",  country: "USA", status: "pending" },
  { id: 98,  phase: "Semifinal", date: "2026-07-14T23:00:00", homeTeam: "SF3", awayTeam: "SF4", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "AT&T Stadium",     city: "Dallas",      country: "USA", status: "pending" },
  { id: 99,  phase: "Semifinal", date: "2026-07-15T20:00:00", homeTeam: "SF5", awayTeam: "SF6", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "SoFi Stadium",     city: "Los Ángeles", country: "USA", status: "pending" },
  { id: 100, phase: "Semifinal", date: "2026-07-15T23:00:00", homeTeam: "SF7", awayTeam: "SF8", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "Estadio Azteca",   city: "Ciudad de México", country: "MEX", status: "pending" },

  // ── TERCER LUGAR ──
  { id: 101, phase: "Tercer Lugar", date: "2026-07-18T20:00:00", homeTeam: "3er 1", awayTeam: "3er 2", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "MetLife Stadium",  city: "Nueva York",  country: "USA", status: "pending" },

  // ── FINAL ──
  { id: 102, phase: "Final", date: "2026-07-19T18:00:00", homeTeam: "Ganador SF1", awayTeam: "Ganador SF2", homeFlag: "🏳️", awayFlag: "🏳️", homeScore: null, awayScore: null, venue: "MetLife Stadium", city: "Nueva York", country: "USA", status: "pending" },
]

export const allMatches: Match[] = [...groupMatches, ...knockoutMatches]

// ──────────��────────────────────────────────
// GROUP STANDINGS
// ───────────────────────────────────────────
export const groupStandings: GroupStanding[] = [
  {
    group: "A",
    teams: [
      { name: "Argentina",  flag: "🇦🇷", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "México",     flag: "🇲🇽", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Ecuador",    flag: "🇪🇨", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Hungría",    flag: "🇭🇺", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "B",
    teams: [
      { name: "Brasil",     flag: "🇧🇷", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "USA",        flag: "🇺🇸", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Alemania",   flag: "🇩🇪", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Japón",      flag: "🇯🇵", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "C",
    teams: [
      { name: "España",     flag: "🇪🇸", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Colombia",   flag: "🇨🇴", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Marruecos",  flag: "🇲🇦", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Bélgica",    flag: "🇧🇪", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "D",
    teams: [
      { name: "Francia",    flag: "🇫🇷", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Uruguay",    flag: "🇺🇾", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Senegal",    flag: "🇸🇳", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Polonia",    flag: "🇵🇱", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "E",
    teams: [
      { name: "Inglaterra",  flag: "🇬🇧", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Países Bajos",flag: "🇳🇱", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Serbia",      flag: "🇷🇸", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Ghana",       flag: "🇬🇭", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "F",
    teams: [
      { name: "Portugal",   flag: "🇵🇹", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "México",     flag: "🇲🇽", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Turquía",    flag: "🇹🇷", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Camerún",    flag: "🇨🇲", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "G",
    teams: [
      { name: "Canadá",     flag: "🇨🇦", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Croacia",    flag: "🇭🇷", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Chile",      flag: "🇨🇱", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Nigeria",    flag: "🇳🇬", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "H",
    teams: [
      { name: "Italia",     flag: "🇮🇹", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Perú",       flag: "🇵🇪", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Dinamarca",  flag: "🇩🇰", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Irán",       flag: "🇮🇷", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "I",
    teams: [
      { name: "Austria",    flag: "🇦🇹", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Suiza",      flag: "🇨🇭", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Australia",  flag: "🇦🇺", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Venezuela",  flag: "🇻🇪", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "J",
    teams: [
      { name: "Corea del Sur", flag: "🇰🇷", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Costa Rica", flag: "🇨🇷", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Rumania",    flag: "🇷🇴", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Bolivia",    flag: "🇧🇴", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "K",
    teams: [
      { name: "Rep. Checa", flag: "🇨🇿", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Arabia Saudita", flag: "🇸🇦", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Grecia",     flag: "🇬🇷", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Paraguay",   flag: "🇵🇾", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
  {
    group: "L",
    teams: [
      { name: "Egipto",     flag: "🇪🇬", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Costa de Marfil", flag: "🇨🇮", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "Eslovenia",  flag: "🇸🇮", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { name: "EAU",        flag: "🇦🇪", played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    ],
  },
]

// ───────────────────────────────────────────
// PARTICIPANTS — Real polla assignments
// Extracted from group images (bloque-1 & bloque-2)
// Each person has exactly 2 teams assigned
// ───────────────────────────────────────────
export const participants: Participant[] = [
  {
    id: 1, name: "Angela", initials: "AN", avatar: "AN",
    teams: [
      { name: "México",        flag: "🇲🇽", group: "A" },
      { name: "Italia/Irlanda",flag: "🇮🇹", group: "B" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 1, trend: "same",
  },
  {
    id: 2, name: "Lina", initials: "LI", avatar: "LI",
    teams: [
      { name: "Korea Sur",  flag: "🇰🇷", group: "A" },
      { name: "Cabo Verde", flag: "🇨🇻", group: "H" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 2, trend: "same",
  },
  {
    id: 3, name: "Magnolia", initials: "MA", avatar: "MA",
    teams: [
      { name: "Sur Africa", flag: "🇿🇦", group: "A" },
      { name: "Irán",       flag: "🇮🇷", group: "G" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 3, trend: "same",
  },
  {
    id: 4, name: "Alexis", initials: "AL", avatar: "AL",
    teams: [
      { name: "Dinamarca", flag: "🇩🇰", group: "A" },
      { name: "Japón",     flag: "🇯🇵", group: "F" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 4, trend: "same",
  },
  {
    id: 5, name: "Juan Carlos", initials: "JC", avatar: "JC",
    teams: [
      { name: "Canadá",          flag: "🇨🇦", group: "B" },
      { name: "Costa de Marfil", flag: "🇨🇮", group: "E" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 5, trend: "same",
  },
  {
    id: 6, name: "Adela", initials: "AD", avatar: "AD",
    teams: [
      { name: "Suiza",    flag: "🇨🇭", group: "B" },
      { name: "Jordania", flag: "🇯🇴", group: "J" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 6, trend: "same",
  },
  {
    id: 7, name: "Alejo Arias", initials: "AA", avatar: "AA",
    teams: [
      { name: "Qatar",  flag: "🇶🇦", group: "B" },
      { name: "España", flag: "🇪🇸", group: "H" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 7, trend: "same",
  },
  {
    id: 8, name: "Laura", initials: "LA", avatar: "LA",
    teams: [
      { name: "Brasil",  flag: "🇧🇷", group: "C" },
      { name: "Algeria", flag: "🇩🇿", group: "J" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 8, trend: "same",
  },
  {
    id: 9, name: "Hernan", initials: "HE", avatar: "HE",
    teams: [
      { name: "Marruecos", flag: "🇲🇦", group: "C" },
      { name: "Egipto",    flag: "🇪🇬", group: "G" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 9, trend: "same",
  },
  {
    id: 10, name: "Beatriz", initials: "BE", avatar: "BE",
    teams: [
      { name: "Escocia",  flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },
      { name: "Alemania", flag: "🇩🇪", group: "E" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 10, trend: "same",
  },
  {
    id: 11, name: "Dignora", initials: "DI", avatar: "DI",
    teams: [
      { name: "Haití",      flag: "🇭🇹", group: "C" },
      { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 11, trend: "same",
  },
  {
    id: 12, name: "Alejo Peña", initials: "AP", avatar: "AP",
    teams: [
      { name: "Bélgica", flag: "🇧🇪", group: "G" },
      { name: "Ghana",   flag: "🇬🇭", group: "L" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 12, trend: "same",
  },
  {
    id: 13, name: "Elier", initials: "EL", avatar: "EL",
    teams: [
      { name: "Nueva Zelanda", flag: "🇳🇿", group: "G" },
      { name: "Portugal",      flag: "🇵🇹", group: "K" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 13, trend: "same",
  },
  {
    id: 14, name: "Juan Vega", initials: "JV", avatar: "JV",
    teams: [
      { name: "Uruguay", flag: "🇺🇾", group: "H" },
      { name: "Curazao", flag: "🇨🇼", group: "E" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 14, trend: "same",
  },
  {
    id: 15, name: "Edwin", initials: "ED", avatar: "ED",
    teams: [
      { name: "Francia",  flag: "🇫🇷", group: "I" },
      { name: "Paraguay", flag: "🇵🇾", group: "D" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 15, trend: "same",
  },
  {
    id: 16, name: "Ivan", initials: "IV", avatar: "IV",
    teams: [
      { name: "Senegal",  flag: "🇸🇳", group: "I" },
      { name: "Ucrania",  flag: "🇺🇦", group: "F" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 16, trend: "same",
  },
  {
    id: 17, name: "Jonh", initials: "JO", avatar: "JO",
    teams: [
      { name: "Noruega", flag: "🇳🇴", group: "I" },
      { name: "Croacia", flag: "🇭🇷", group: "L" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 17, trend: "same",
  },
  {
    id: 18, name: "Nata", initials: "NA", avatar: "NA",
    teams: [
      { name: "Iraq/Bolivia", flag: "🇮🇶", group: "I" },
      { name: "Argentina",    flag: "🇦🇷", group: "J" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 18, trend: "same",
  },
  {
    id: 19, name: "Jorge Hernan", initials: "JH", avatar: "JH",
    teams: [
      { name: "USA",    flag: "🇺🇸", group: "D" },
      { name: "Panamá", flag: "🇵🇦", group: "L" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 19, trend: "same",
  },
  {
    id: 20, name: "Diana Carolina", initials: "DC", avatar: "DC",
    teams: [
      { name: "Australia", flag: "🇦🇺", group: "D" },
      { name: "Congo",     flag: "🇨🇩", group: "K" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 20, trend: "same",
  },
  {
    id: 21, name: "Sandra", initials: "SA", avatar: "SA",
    teams: [
      { name: "Turquía",       flag: "🇹🇷", group: "D" },
      { name: "Países Bajos",  flag: "🇳🇱", group: "F" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 21, trend: "same",
  },
  {
    id: 22, name: "Tiko", initials: "TI", avatar: "TI",
    teams: [
      { name: "Arabia Saudita", flag: "🇸🇦", group: "H" },
      { name: "Colombia",       flag: "🇨🇴", group: "K" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 22, trend: "same",
  },
  {
    id: 23, name: "Angie Escobar", initials: "AE", avatar: "AE",
    teams: [
      { name: "Ecuador",    flag: "🇪🇨", group: "E" },
      { name: "Uzbekistán", flag: "🇺🇿", group: "K" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 23, trend: "same",
  },
  {
    id: 24, name: "Juan Guarin", initials: "JG", avatar: "JG",
    teams: [
      { name: "Túnez",   flag: "🇹🇳", group: "F" },
      { name: "Austria", flag: "🇦🇹", group: "J" },
    ],
    points: 0, correctScores: 0, correctResults: 0, totalPredictions: 0, position: 24, trend: "same",
  },
]

export const GROUP_PHASES: Phase[] = [
  "Grupo A","Grupo B","Grupo C","Grupo D","Grupo E","Grupo F",
  "Grupo G","Grupo H","Grupo I","Grupo J","Grupo K","Grupo L",
]

export const KNOCKOUT_PHASES: Phase[] = [
  "Octavos de Final","Cuartos de Final","Semifinal","Semifinales","Tercer Lugar","Final",
]

export const ALL_PHASES: Phase[] = [...GROUP_PHASES, ...KNOCKOUT_PHASES]

export const PHASE_COLORS: Record<string, string> = {
  "Grupo A": "bg-blue-500/20 text-blue-300",
  "Grupo B": "bg-purple-500/20 text-purple-300",
  "Grupo C": "bg-green-500/20 text-green-300",
  "Grupo D": "bg-yellow-500/20 text-yellow-300",
  "Grupo E": "bg-pink-500/20 text-pink-300",
  "Grupo F": "bg-orange-500/20 text-orange-300",
  "Grupo G": "bg-teal-500/20 text-teal-300",
  "Grupo H": "bg-red-500/20 text-red-300",
  "Grupo I": "bg-indigo-500/20 text-indigo-300",
  "Grupo J": "bg-cyan-500/20 text-cyan-300",
  "Grupo K": "bg-lime-500/20 text-lime-300",
  "Grupo L": "bg-rose-500/20 text-rose-300",
  "Octavos de Final":  "bg-amber-500/20 text-amber-300",
  "Cuartos de Final":  "bg-amber-500/20 text-amber-300",
  "Semifinal":         "bg-amber-600/20 text-amber-200",
  "Semifinales":       "bg-amber-600/20 text-amber-200",
  "Tercer Lugar":      "bg-amber-700/20 text-amber-200",
  "Final":             "bg-primary/20 text-primary",
}
