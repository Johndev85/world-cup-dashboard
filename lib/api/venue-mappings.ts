type Country = "USA" | "CAN" | "MEX"

const VENUE_COUNTRY: Record<string, Country> = {
  "Mexico City": "MEX",
  "Guadalajara (Zapopan)": "MEX",
  "Monterrey (Guadalupe)": "MEX",
  "Toronto": "CAN",
  "Vancouver": "CAN",
  "Los Angeles (Inglewood)": "USA",
  "San Francisco Bay Area (Santa Clara)": "USA",
  "New York/New Jersey (East Rutherford)": "USA",
  "Boston (Foxborough)": "USA",
  "Houston": "USA",
  "Dallas (Arlington)": "USA",
  "Seattle": "USA",
  "Atlanta": "USA",
  "Miami (Miami Gardens)": "USA",
  "Kansas City": "USA",
  "Philadelphia": "USA",
}

export function getCountryByGround(ground: string): Country {
  for (const [key, country] of Object.entries(VENUE_COUNTRY)) {
    if (ground.includes(key)) return country
  }
  if (ground.toLowerCase().includes("mexico") || ground.toLowerCase().includes("guadalajara") || ground.toLowerCase().includes("monterrey")) return "MEX"
  if (ground.toLowerCase().includes("toronto") || ground.toLowerCase().includes("vancouver")) return "CAN"
  return "USA"
}

export function getCityFromGround(ground: string): string {
  const cityMap: Record<string, string> = {
    "Mexico City": "Ciudad de México",
    "Guadalajara (Zapopan)": "Guadalajara",
    "Monterrey (Guadalupe)": "Monterrey",
    "Toronto": "Toronto",
    "Vancouver": "Vancouver",
    "Los Angeles (Inglewood)": "Los Ángeles",
    "San Francisco Bay Area (Santa Clara)": "San Francisco",
    "New York/New Jersey (East Rutherford)": "Nueva York",
    "Boston (Foxborough)": "Boston",
    "Houston": "Houston",
    "Dallas (Arlington)": "Dallas",
    "Seattle": "Seattle",
    "Atlanta": "Atlanta",
    "Miami (Miami Gardens)": "Miami",
    "Kansas City": "Kansas City",
    "Philadelphia": "Filadelfia",
  }
  for (const [key, city] of Object.entries(cityMap)) {
    if (ground.includes(key)) return city
  }
  return ground
}

export function getVenueFromGround(ground: string): string {
  const venueMap: Record<string, string> = {
    "Mexico City": "Estadio Azteca",
    "Guadalajara (Zapopan)": "Estadio Akron",
    "Monterrey (Guadalupe)": "Estadio BBVA",
    "Toronto": "BMO Field",
    "Vancouver": "BC Place",
    "Los Angeles (Inglewood)": "SoFi Stadium",
    "San Francisco Bay Area (Santa Clara)": "Levi's Stadium",
    "New York/New Jersey (East Rutherford)": "MetLife Stadium",
    "Boston (Foxborough)": "Gillette Stadium",
    "Houston": "NRG Stadium",
    "Dallas (Arlington)": "AT&T Stadium",
    "Seattle": "Lumen Field",
    "Atlanta": "Mercedes-Benz Stadium",
    "Miami (Miami Gardens)": "Hard Rock Stadium",
    "Kansas City": "Arrowhead Stadium",
    "Philadelphia": "Lincoln Financial Field",
  }
  for (const [key, venue] of Object.entries(venueMap)) {
    if (ground.includes(key)) return venue
  }
  return ground
}
