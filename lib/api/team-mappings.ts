export interface TeamInfo {
  name: string
  flag: string
  group: string
}

export const TEAM_MAP: Record<string, TeamInfo> = {
  "Mexico":             { name: "México",            flag: "🇲🇽", group: "A" },
  "South Africa":       { name: "Sudáfrica",         flag: "🇿🇦", group: "A" },
  "South Korea":        { name: "Corea del Sur",     flag: "🇰🇷", group: "A" },
  "Czech Republic":     { name: "República Checa",   flag: "🇨🇿", group: "A" },

  "Canada":             { name: "Canadá",            flag: "🇨🇦", group: "B" },
  "Bosnia & Herzegovina":{ name: "Bosnia y Herzegovina", flag: "🇧🇦", group: "B" },
  "Qatar":              { name: "Qatar",             flag: "🇶🇦", group: "B" },
  "Switzerland":        { name: "Suiza",             flag: "🇨🇭", group: "B" },

  "Brazil":             { name: "Brasil",            flag: "🇧🇷", group: "C" },
  "Morocco":            { name: "Marruecos",         flag: "🇲🇦", group: "C" },
  "Haiti":              { name: "Haití",             flag: "🇭🇹", group: "C" },
  "Scotland":           { name: "Escocia",           flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },

  "USA":                { name: "Estados Unidos",    flag: "🇺🇸", group: "D" },
  "Paraguay":           { name: "Paraguay",          flag: "🇵🇾", group: "D" },
  "Australia":          { name: "Australia",         flag: "🇦🇺", group: "D" },
  "Turkey":             { name: "Turquía",           flag: "🇹🇷", group: "D" },

  "Germany":            { name: "Alemania",          flag: "🇩🇪", group: "E" },
  "Curaçao":            { name: "Curazao",           flag: "🇨🇼", group: "E" },
  "Ivory Coast":        { name: "Costa de Marfil",   flag: "🇨🇮", group: "E" },
  "Ecuador":            { name: "Ecuador",           flag: "🇪🇨", group: "E" },

  "Netherlands":        { name: "Países Bajos",      flag: "🇳🇱", group: "F" },
  "Japan":              { name: "Japón",             flag: "🇯🇵", group: "F" },
  "Sweden":             { name: "Suecia",            flag: "🇸🇪", group: "F" },
  "Tunisia":            { name: "Túnez",             flag: "🇹🇳", group: "F" },

  "Belgium":            { name: "Bélgica",           flag: "🇧🇪", group: "G" },
  "Egypt":              { name: "Egipto",            flag: "🇪🇬", group: "G" },
  "Iran":               { name: "Irán",              flag: "🇮🇷", group: "G" },
  "New Zealand":        { name: "Nueva Zelanda",     flag: "🇳🇿", group: "G" },

  "Spain":              { name: "España",            flag: "🇪🇸", group: "H" },
  "Cape Verde":         { name: "Cabo Verde",        flag: "🇨🇻", group: "H" },
  "Saudi Arabia":       { name: "Arabia Saudita",    flag: "🇸🇦", group: "H" },
  "Uruguay":            { name: "Uruguay",           flag: "🇺🇾", group: "H" },

  "France":             { name: "Francia",           flag: "🇫🇷", group: "I" },
  "Senegal":            { name: "Senegal",           flag: "🇸🇳", group: "I" },
  "Iraq":               { name: "Irak",              flag: "🇮🇶", group: "I" },
  "Norway":             { name: "Noruega",           flag: "🇳🇴", group: "I" },

  "Argentina":          { name: "Argentina",         flag: "🇦🇷", group: "J" },
  "Algeria":            { name: "Argelia",           flag: "🇩🇿", group: "J" },
  "Austria":            { name: "Austria",           flag: "🇦🇹", group: "J" },
  "Jordan":             { name: "Jordania",          flag: "🇯🇴", group: "J" },

  "Portugal":           { name: "Portugal",          flag: "🇵🇹", group: "K" },
  "DR Congo":           { name: "Congo",             flag: "🇨🇩", group: "K" },
  "Uzbekistan":         { name: "Uzbekistán",        flag: "🇺🇿", group: "K" },
  "Colombia":           { name: "Colombia",          flag: "🇨🇴", group: "K" },

  "England":            { name: "Inglaterra",        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
  "Croatia":            { name: "Croacia",           flag: "🇭🇷", group: "L" },
  "Ghana":              { name: "Ghana",             flag: "🇬🇭", group: "L" },
  "Panama":             { name: "Panamá",            flag: "🇵🇦", group: "L" },
}

export function getTeamInfo(apiName: string): TeamInfo {
  return TEAM_MAP[apiName] ?? { name: apiName, flag: "🏳️", group: "?" }
}
