export interface Team {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  flagEmoji: string;
  group: string;
  coach: string;
  ranking: number;
  confederation: string;
  color: string;
  players: Player[];
  stats: TeamStats;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  age: number;
  club: string;
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
}

export interface TeamStats {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export const teams: Team[] = [
  {
    id: "usa",
    name: "United States",
    shortName: "USA",
    flag: "/flags/usa.svg",
    flagEmoji: "🇺🇸",
    group: "A",
    coach: "Mauricio Pochettino",
    ranking: 13,
    confederation: "CONCACAF",
    color: "#002868",
    stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
    players: [
      { id: "p1", name: "Christian Pulisic", position: "MF", number: 10, age: 25, club: "AC Milan", goals: 2, assists: 1, yellowCards: 0, redCards: 0 },
      { id: "p2", name: "Matt Turner", position: "GK", number: 1, age: 29, club: "Crystal Palace", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p3", name: "Weston McKennie", position: "MF", number: 8, age: 25, club: "Juventus", goals: 1, assists: 0, yellowCards: 1, redCards: 0 },
      { id: "p4", name: "Tyler Adams", position: "MF", number: 4, age: 25, club: "AFC Bournemouth", goals: 0, assists: 1, yellowCards: 0, redCards: 0 },
      { id: "p5", name: "Ricardo Pepi", position: "FW", number: 9, age: 21, club: "PSV Eindhoven", goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
    ]
  },
  {
    id: "brazil",
    name: "Brazil",
    shortName: "BRA",
    flag: "/flags/brazil.svg",
    flagEmoji: "🇧🇷",
    group: "E",
    coach: "Dorival Júnior",
    ranking: 5,
    confederation: "CONMEBOL",
    color: "#009c3b",
    stats: { played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 9, goalsAgainst: 2, points: 9 },
    players: [
      { id: "p10", name: "Vinicius Jr.", position: "FW", number: 7, age: 23, club: "Real Madrid", goals: 3, assists: 2, yellowCards: 1, redCards: 0 },
      { id: "p11", name: "Rodrygo", position: "FW", number: 9, age: 23, club: "Real Madrid", goals: 2, assists: 1, yellowCards: 0, redCards: 0 },
      { id: "p12", name: "Casemiro", position: "MF", number: 5, age: 32, club: "Man United", goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
      { id: "p13", name: "Alisson", position: "GK", number: 1, age: 31, club: "Liverpool", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p14", name: "Marquinhos", position: "DF", number: 4, age: 30, club: "PSG", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    ]
  },
  {
    id: "france",
    name: "France",
    shortName: "FRA",
    flag: "/flags/france.svg",
    flagEmoji: "🇫🇷",
    group: "D",
    coach: "Didier Deschamps",
    ranking: 2,
    confederation: "UEFA",
    color: "#002395",
    stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 3, points: 7 },
    players: [
      { id: "p20", name: "Kylian Mbappé", position: "FW", number: 10, age: 25, club: "Real Madrid", goals: 4, assists: 1, yellowCards: 0, redCards: 0 },
      { id: "p21", name: "Antoine Griezmann", position: "FW", number: 7, age: 33, club: "Atletico Madrid", goals: 1, assists: 2, yellowCards: 0, redCards: 0 },
      { id: "p22", name: "N'Golo Kanté", position: "MF", number: 13, age: 33, club: "Al-Ittihad", goals: 0, assists: 1, yellowCards: 1, redCards: 0 },
      { id: "p23", name: "Mike Maignan", position: "GK", number: 16, age: 28, club: "AC Milan", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p24", name: "Dayot Upamecano", position: "DF", number: 4, age: 25, club: "Bayern Munich", goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    ]
  },
  {
    id: "argentina",
    name: "Argentina",
    shortName: "ARG",
    flag: "/flags/argentina.svg",
    flagEmoji: "🇦🇷",
    group: "C",
    coach: "Lionel Scaloni",
    ranking: 1,
    confederation: "CONMEBOL",
    color: "#74ACDF",
    stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, points: 7 },
    players: [
      { id: "p30", name: "Lionel Messi", position: "FW", number: 10, age: 38, club: "Inter Miami", goals: 3, assists: 3, yellowCards: 0, redCards: 0 },
      { id: "p31", name: "Lautaro Martínez", position: "FW", number: 22, age: 26, club: "Inter Milan", goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p32", name: "Rodrigo De Paul", position: "MF", number: 7, age: 30, club: "Atletico Madrid", goals: 0, assists: 1, yellowCards: 1, redCards: 0 },
      { id: "p33", name: "Emiliano Martínez", position: "GK", number: 23, age: 31, club: "Aston Villa", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p34", name: "Nicolás Otamendi", position: "DF", number: 19, age: 36, club: "Benfica", goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    ]
  },
  {
    id: "england",
    name: "England",
    shortName: "ENG",
    flag: "/flags/england.svg",
    flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    group: "B",
    coach: "Gareth Southgate",
    ranking: 4,
    confederation: "UEFA",
    color: "#CE1126",
    stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 4, points: 6 },
    players: [
      { id: "p40", name: "Harry Kane", position: "FW", number: 9, age: 30, club: "Bayern Munich", goals: 3, assists: 1, yellowCards: 0, redCards: 0 },
      { id: "p41", name: "Jude Bellingham", position: "MF", number: 22, age: 20, club: "Real Madrid", goals: 1, assists: 2, yellowCards: 0, redCards: 0 },
      { id: "p42", name: "Phil Foden", position: "MF", number: 47, age: 24, club: "Man City", goals: 1, assists: 1, yellowCards: 1, redCards: 0 },
      { id: "p43", name: "Jordan Pickford", position: "GK", number: 1, age: 30, club: "Everton", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p44", name: "Bukayo Saka", position: "FW", number: 17, age: 22, club: "Arsenal", goals: 0, assists: 1, yellowCards: 0, redCards: 0 },
    ]
  },
  {
    id: "spain",
    name: "Spain",
    shortName: "ESP",
    flag: "/flags/spain.svg",
    flagEmoji: "🇪🇸",
    group: "F",
    coach: "Luis de la Fuente",
    ranking: 8,
    confederation: "UEFA",
    color: "#AA151B",
    stats: { played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 8, goalsAgainst: 1, points: 9 },
    players: [
      { id: "p50", name: "Pedri", position: "MF", number: 8, age: 21, club: "Barcelona", goals: 1, assists: 2, yellowCards: 0, redCards: 0 },
      { id: "p51", name: "Álvaro Morata", position: "FW", number: 7, age: 31, club: "AC Milan", goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p52", name: "Dani Olmo", position: "MF", number: 10, age: 26, club: "Barcelona", goals: 1, assists: 1, yellowCards: 0, redCards: 0 },
      { id: "p53", name: "Unai Simón", position: "GK", number: 23, age: 27, club: "Athletic Bilbao", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p54", name: "Aymeric Laporte", position: "DF", number: 14, age: 30, club: "Al-Nassr", goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    ]
  },
  {
    id: "germany",
    name: "Germany",
    shortName: "GER",
    flag: "/flags/germany.svg",
    flagEmoji: "🇩🇪",
    group: "A",
    coach: "Julian Nagelsmann",
    ranking: 12,
    confederation: "UEFA",
    color: "#000000",
    stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 5, points: 4 },
    players: [
      { id: "p60", name: "Florian Wirtz", position: "MF", number: 10, age: 21, club: "Bayer Leverkusen", goals: 1, assists: 2, yellowCards: 0, redCards: 0 },
      { id: "p61", name: "Kai Havertz", position: "FW", number: 9, age: 25, club: "Arsenal", goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p62", name: "Toni Kroos", position: "MF", number: 8, age: 34, club: "Real Madrid", goals: 0, assists: 1, yellowCards: 0, redCards: 0 },
      { id: "p63", name: "Manuel Neuer", position: "GK", number: 1, age: 38, club: "Bayern Munich", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p64", name: "Antonio Rüdiger", position: "DF", number: 2, age: 31, club: "Real Madrid", goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    ]
  },
  {
    id: "portugal",
    name: "Portugal",
    shortName: "POR",
    flag: "/flags/portugal.svg",
    flagEmoji: "🇵🇹",
    group: "H",
    coach: "Roberto Martínez",
    ranking: 6,
    confederation: "UEFA",
    color: "#006600",
    stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 4, points: 6 },
    players: [
      { id: "p70", name: "Cristiano Ronaldo", position: "FW", number: 7, age: 41, club: "Al-Nassr", goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p71", name: "Bruno Fernandes", position: "MF", number: 8, age: 29, club: "Man United", goals: 1, assists: 2, yellowCards: 1, redCards: 0 },
      { id: "p72", name: "João Félix", position: "FW", number: 11, age: 24, club: "Chelsea", goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p73", name: "Rui Patrício", position: "GK", number: 22, age: 36, club: "Roma", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p74", name: "Rúben Dias", position: "DF", number: 4, age: 27, club: "Man City", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    ]
  },
  {
    id: "morocco",
    name: "Morocco",
    shortName: "MAR",
    flag: "/flags/morocco.svg",
    flagEmoji: "🇲🇦",
    group: "G",
    coach: "Walid Regragui",
    ranking: 14,
    confederation: "CAF",
    color: "#006233",
    stats: { played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 1, points: 7 },
    players: [
      { id: "p80", name: "Hakim Ziyech", position: "MF", number: 7, age: 31, club: "Galatasaray", goals: 1, assists: 1, yellowCards: 0, redCards: 0 },
      { id: "p81", name: "Achraf Hakimi", position: "DF", number: 2, age: 25, club: "PSG", goals: 0, assists: 2, yellowCards: 0, redCards: 0 },
      { id: "p82", name: "Youssef En-Nesyri", position: "FW", number: 19, age: 27, club: "Fenerbahçe", goals: 2, assists: 0, yellowCards: 1, redCards: 0 },
      { id: "p83", name: "Yassine Bounou", position: "GK", number: 1, age: 32, club: "Al-Hilal", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p84", name: "Sofyan Amrabat", position: "MF", number: 4, age: 27, club: "Fiorentina", goals: 0, assists: 0, yellowCards: 2, redCards: 0 },
    ]
  },
  {
    id: "canada",
    name: "Canada",
    shortName: "CAN",
    flag: "/flags/canada.svg",
    flagEmoji: "🇨🇦",
    group: "A",
    coach: "Jesse Marsch",
    ranking: 47,
    confederation: "CONCACAF",
    color: "#FF0000",
    stats: { played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 4, points: 4 },
    players: [
      { id: "p90", name: "Alphonso Davies", position: "DF", number: 3, age: 23, club: "Bayern Munich", goals: 0, assists: 2, yellowCards: 0, redCards: 0 },
      { id: "p91", name: "Jonathan David", position: "FW", number: 9, age: 24, club: "Lille", goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p92", name: "Cyle Larin", position: "FW", number: 17, age: 29, club: "Club Brugge", goals: 1, assists: 0, yellowCards: 1, redCards: 0 },
      { id: "p93", name: "Milan Borjan", position: "GK", number: 18, age: 36, club: "Red Star Belgrade", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p94", name: "Atiba Hutchinson", position: "MF", number: 13, age: 40, club: "Besiktas", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    ]
  },
  {
    id: "mexico",
    name: "Mexico",
    shortName: "MEX",
    flag: "/flags/mexico.svg",
    flagEmoji: "🇲🇽",
    group: "B",
    coach: "Javier Aguirre",
    ranking: 15,
    confederation: "CONCACAF",
    color: "#006847",
    stats: { played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, points: 3 },
    players: [
      { id: "p100", name: "Hirving Lozano", position: "FW", number: 22, age: 29, club: "PSV Eindhoven", goals: 1, assists: 1, yellowCards: 0, redCards: 0 },
      { id: "p101", name: "Guillermo Ochoa", position: "GK", number: 13, age: 39, club: "Salernitana", goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
      { id: "p102", name: "Raúl Jiménez", position: "FW", number: 9, age: 33, club: "Fulham", goals: 1, assists: 0, yellowCards: 1, redCards: 0 },
    ]
  },
  {
    id: "japan",
    name: "Japan",
    shortName: "JPN",
    flag: "/flags/japan.svg",
    flagEmoji: "🇯🇵",
    group: "C",
    coach: "Hajime Moriyasu",
    ranking: 17,
    confederation: "AFC",
    color: "#BC002D",
    stats: { played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
    players: [
      { id: "p110", name: "Takumi Minamino", position: "FW", number: 10, age: 29, club: "Monaco", goals: 2, assists: 1, yellowCards: 0, redCards: 0 },
      { id: "p111", name: "Wataru Endo", position: "MF", number: 3, age: 31, club: "Liverpool", goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    ]
  },
];

export const getGroups = () => {
  const groups: Record<string, Team[]> = {};
  teams.forEach(t => {
    if (!groups[t.group]) groups[t.group] = [];
    groups[t.group].push(t);
  });
  Object.keys(groups).forEach(g => {
    groups[g].sort((a, b) => b.stats.points - a.stats.points || (b.stats.goalsFor - b.stats.goalsAgainst) - (a.stats.goalsFor - a.stats.goalsAgainst));
  });
  return groups;
};

export const getTeamById = (id: string) => teams.find(t => t.id === id);
