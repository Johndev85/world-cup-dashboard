# Polla FIFA World Cup 2026 🏆

Dashboard interactivo para la polla del Mundial FIFA 2026 con tabla de posiciones en tiempo real, datos de la API de openfootball y diseño con la paleta oficial FIFA.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 + tw-animate-css
- **UI:** shadcn/ui (Radix primitives)
- **Fuentes:** Barlow + Barlow Condensed (Google Fonts)
- **Tema:** next-themes (dark/light con paleta FIFA)
- **Gráficos:** Recharts
- **Fecha:** date-fns
- **Análitica:** @vercel/analytics

## Funcionalidades

- **Dashboard** con tarjetas de estadísticas, próximos partidos y cuenta regresiva
- **Tabla de posiciones** (Leaderboard) con 24 participantes, puntos por resultados reales y premios ($1M/$200K COP)
- **Fase de grupos** — 12 grupos con 48 equipos y tabla de posiciones por grupo
- **Fase eliminatoria** — Octavos, Cuartos, Semifinales, Tercer Lugar y Final
- **Calendario** de los 104 partidos del mundial
- **Countdown** animado hasta el inicio del torneo (11 de junio de 2026)
- **Dark mode** con tonos cálidos (hue-60) compatible con la paleta FIFA
- **Sidebar responsive** — overlay fijo en mobile, relative en desktop

## Paleta FIFA 2026

| Color | Uso |
|-------|-----|
| `#3CAC3B` (green) | Acentos, badges, primary |
| `#2A398D` (blue) | Links, hover states |
| `#E61D25` (red) | Peligro, eliminación |
| `#D1D4D1` (light gray) | Bordes, fondos secundarios |
| `#474A4A` (dark gray) | Texto secundario |

## API

Los datos de partidos y resultados se obtienen de:

```
https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json
```

Con transformación local a tipos TypeScript (traducción de equipos al español, mapeo de sedes a país/ciudad).

## Estructura del proyecto

```
├── app/
│   ├── globals.css          # Paleta FIFA, temas, scrollbar
│   ├── layout.tsx           # Root layout con fonts + ThemeProvider
│   └── page.tsx             # Página principal
├── components/
│   ├── DashboardShell.tsx   # Layout principal con sidebar + header
│   ├── bracket/
│   │   └── KnockoutBracket.tsx
│   ├── calendar/
│   │   ├── CalendarView.tsx
│   │   ├── GroupStandings.tsx
│   │   └── MatchCard.tsx
│   ├── dashboard/
│   │   ├── Leaderboard.tsx
│   │   ├── StatsCards.tsx
│   │   ├── UpcomingMatches.tsx
│   │   └── WorldCupCountdown.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── polla/
│   │   └── PollaView.tsx
│   ├── theme-provider.tsx
│   └── ui/                  # Componentes shadcn/ui
├── lib/
│   ├── utils.ts
│   ├── wc2026-data.ts       # Tipos, participantes, datos de partidos
│   └── api/
│       ├── leaderboard.ts    # Cálculo de puntos y premios
│       ├── team-mappings.ts  # Traducción equipos EN→ES + flags
│       ├── venue-mappings.ts # Mapeo sedes → país/ciudad
│       └── wc2026-api.ts     # Fetch y transformación API
└── public/
    └── copa-mundial-icon.png
```

## Premios

- **Campeón:** $1.000.000 COP
- **Subcampeón:** $200.000 COP

Los premios se determinan únicamente por el resultado del partido Final (campeón y subcampeón). La tabla de puntos es solo gamificación (victoria = 3 pts, empate = 1 pt).

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Despliegue

Construido para Vercel con output automático.

---

© 2026 johndev85 con 💙 & ☕
