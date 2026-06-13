export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  surface: string;
  opened: number;
  coordinates: { lat: number; lng: number };
  description: string;
  matches: number;
  imageColor: string;
  emoji: string;
}

export const stadiums: Stadium[] = [
  {
    id: "sofistadium",
    name: "SoFi Stadium",
    city: "Los Angeles",
    country: "USA",
    capacity: 100240,
    surface: "Grass",
    opened: 2020,
    coordinates: { lat: 33.9534, lng: -118.3391 },
    description: "The most expensive stadium ever built, home to the LA Rams and Chargers. Will host the FIFA World Cup 2026 Final.",
    matches: 8,
    imageColor: "#1a3a6e",
    emoji: "🏟️"
  },
  {
    id: "metlife",
    name: "MetLife Stadium",
    city: "New York / New Jersey",
    country: "USA",
    capacity: 82500,
    surface: "Grass",
    opened: 2010,
    coordinates: { lat: 40.8135, lng: -74.0745 },
    description: "Home to the NY Giants and NY Jets, this iconic stadium in the New York metro area will host key tournament matches.",
    matches: 7,
    imageColor: "#00338d",
    emoji: "🏟️"
  },
  {
    id: "attstadium",
    name: "AT&T Stadium",
    city: "Dallas",
    country: "USA",
    capacity: 80000,
    surface: "Grass",
    opened: 2009,
    coordinates: { lat: 32.7480, lng: -97.0929 },
    description: "Known as 'Jerry World', this architectural masterpiece features the world's largest retractable roof and HD screen.",
    matches: 7,
    imageColor: "#003594",
    emoji: "🏟️"
  },
  {
    id: "levis",
    name: "Levi's Stadium",
    city: "San Francisco Bay Area",
    country: "USA",
    capacity: 68500,
    surface: "Grass",
    opened: 2014,
    coordinates: { lat: 37.4032, lng: -121.9698 },
    description: "Home of the San Francisco 49ers, this eco-friendly stadium powered by solar energy sits in Silicon Valley.",
    matches: 6,
    imageColor: "#aa0000",
    emoji: "🏟️"
  },
  {
    id: "hardrock",
    name: "Hard Rock Stadium",
    city: "Miami",
    country: "USA",
    capacity: 65326,
    surface: "Grass",
    opened: 1987,
    coordinates: { lat: 25.9580, lng: -80.2389 },
    description: "Home of the Miami Dolphins, recently renovated with a striking canopy structure, will be a major WC2026 venue.",
    matches: 6,
    imageColor: "#005778",
    emoji: "🏟️"
  },
  {
    id: "rosebowl",
    name: "Rose Bowl Stadium",
    city: "Los Angeles",
    country: "USA",
    capacity: 92542,
    surface: "Grass",
    opened: 1922,
    coordinates: { lat: 34.1613, lng: -118.1676 },
    description: "Historic venue that hosted the 1994 World Cup Final. The legendary 'Granddaddy of Them All' returns for WC2026.",
    matches: 6,
    imageColor: "#4b2882",
    emoji: "🏟️"
  },
  {
    id: "bmo",
    name: "BMO Field",
    city: "Toronto",
    country: "Canada",
    capacity: 45736,
    surface: "Grass",
    opened: 2007,
    coordinates: { lat: 43.6334, lng: -79.4184 },
    description: "Canada's premier football stadium, home to Toronto FC. Will expand capacity for the 2026 World Cup.",
    matches: 6,
    imageColor: "#cc0000",
    emoji: "🏟️"
  },
  {
    id: "azteca",
    name: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    capacity: 87523,
    surface: "Grass",
    opened: 1966,
    coordinates: { lat: 19.3029, lng: -99.1506 },
    description: "The iconic Azteca, where Maradona's 'Hand of God' occurred. One of football's most historic venues.",
    matches: 6,
    imageColor: "#006847",
    emoji: "🏟️"
  },
  {
    id: "nrgstadium",
    name: "NRG Stadium",
    city: "Houston",
    country: "USA",
    capacity: 72220,
    surface: "Grass",
    opened: 2002,
    coordinates: { lat: 29.6847, lng: -95.4107 },
    description: "Home of the Houston Texans with a retractable roof for weather protection, ideal for Houston's climate.",
    matches: 5,
    imageColor: "#03202f",
    emoji: "🏟️"
  },
  {
    id: "allegiant",
    name: "Allegiant Stadium",
    city: "Las Vegas",
    country: "USA",
    capacity: 65000,
    surface: "Grass",
    opened: 2020,
    coordinates: { lat: 36.0909, lng: -115.1833 },
    description: "Las Vegas's stunning black glass stadium, home to the Raiders. A truly futuristic venue for WC2026.",
    matches: 5,
    imageColor: "#000000",
    emoji: "🏟️"
  },
  {
    id: "bankofamerica",
    name: "Bank of America Stadium",
    city: "Charlotte",
    country: "USA",
    capacity: 74867,
    surface: "Grass",
    opened: 1996,
    coordinates: { lat: 35.2258, lng: -80.8528 },
    description: "Home of the Carolina Panthers, this versatile stadium in the heart of Charlotte will host group stage matches.",
    matches: 5,
    imageColor: "#0085ca",
    emoji: "🏟️"
  },
  {
    id: "arrowhead",
    name: "GEHA Field at Arrowhead Stadium",
    city: "Kansas City",
    country: "USA",
    capacity: 76416,
    surface: "Grass",
    opened: 1972,
    coordinates: { lat: 39.0489, lng: -94.4839 },
    description: "One of the NFL's loudest stadiums, home to the Kansas City Chiefs, known for its electric atmosphere.",
    matches: 5,
    imageColor: "#e31837",
    emoji: "🏟️"
  },
  {
    id: "lincoln",
    name: "Lincoln Financial Field",
    city: "Philadelphia",
    country: "USA",
    capacity: 69596,
    surface: "Grass",
    opened: 2003,
    coordinates: { lat: 39.9008, lng: -75.1675 },
    description: "Home of the Philadelphia Eagles, situated near historic Philadelphia, one of America's most passionate football cities.",
    matches: 5,
    imageColor: "#004c54",
    emoji: "🏟️"
  },
  {
    id: "seattle",
    name: "Lumen Field",
    city: "Seattle",
    country: "USA",
    capacity: 72000,
    surface: "Grass",
    opened: 2002,
    coordinates: { lat: 47.5952, lng: -122.3316 },
    description: "Home of the Seattle Seahawks and Sounders FC, known for its incredible noise levels and passionate fanbase.",
    matches: 5,
    imageColor: "#002244",
    emoji: "🏟️"
  },
  {
    id: "gillette",
    name: "Gillette Stadium",
    city: "Boston",
    country: "USA",
    capacity: 65878,
    surface: "Grass",
    opened: 2002,
    coordinates: { lat: 42.0909, lng: -71.2643 },
    description: "Home of the New England Patriots and Revolution, a modern football-friendly venue in the historic Boston area.",
    matches: 5,
    imageColor: "#004c97",
    emoji: "🏟️"
  },
  {
    id: "vancouver",
    name: "BC Place",
    city: "Vancouver",
    country: "Canada",
    capacity: 54500,
    surface: "Turf",
    opened: 1983,
    coordinates: { lat: 49.2768, lng: -123.1118 },
    description: "Canada's largest covered stadium, home to the Vancouver Whitecaps, with its distinctive retractable roof.",
    matches: 6,
    imageColor: "#0f2439",
    emoji: "🏟️"
  },
];

export const getStadiumById = (id: string) => stadiums.find(s => s.id === id);
