export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamName: string;
  awayTeamName: string;
  homeFlag: string;
  awayFlag: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'upcoming' | 'live' | 'finished';
  minute?: number;
  date: string;
  time: string;
  stadium: string;
  stadiumCity: string;
  group: string;
  round: string;
  events?: MatchEvent[];
  stats?: MatchStats;
}

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'yellow' | 'red' | 'sub' | 'var' | 'penalty';
  player: string;
  team: 'home' | 'away';
  detail?: string;
}

export interface MatchStats {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  offsides: [number, number];
}

export const matches: Match[] = [
  {
    id: "m1",
    homeTeam: "usa",
    awayTeam: "canada",
    homeTeamName: "United States",
    awayTeamName: "Canada",
    homeFlag: "🇺🇸",
    awayFlag: "🇨🇦",
    homeScore: 2,
    awayScore: 0,
    status: "finished",
    date: "2026-06-11",
    time: "18:00",
    stadium: "SoFi Stadium",
    stadiumCity: "Los Angeles",
    group: "A",
    round: "Group Stage",
    events: [
      { minute: 23, type: "goal", player: "Christian Pulisic", team: "home" },
      { minute: 67, type: "goal", player: "Ricardo Pepi", team: "home" },
      { minute: 45, type: "yellow", player: "Alphonso Davies", team: "away" },
    ],
    stats: {
      possession: [58, 42],
      shots: [14, 8],
      shotsOnTarget: [6, 3],
      corners: [7, 4],
      fouls: [11, 14],
      yellowCards: [1, 2],
      redCards: [0, 0],
      offsides: [2, 3],
    }
  },
  {
    id: "m2",
    homeTeam: "brazil",
    awayTeam: "mexico",
    homeTeamName: "Brazil",
    awayTeamName: "Mexico",
    homeFlag: "🇧🇷",
    awayFlag: "🇲🇽",
    homeScore: 3,
    awayScore: 1,
    status: "live",
    minute: 67,
    date: "2026-06-13",
    time: "21:00",
    stadium: "MetLife Stadium",
    stadiumCity: "New York",
    group: "E",
    round: "Group Stage",
    events: [
      { minute: 12, type: "goal", player: "Vinicius Jr.", team: "home" },
      { minute: 34, type: "goal", player: "Rodrigo De Paul", team: "home", detail: "Own Goal" },
      { minute: 41, type: "goal", player: "Hirving Lozano", team: "away" },
      { minute: 58, type: "goal", player: "Rodrygo", team: "home" },
      { minute: 60, type: "yellow", player: "Raúl Jiménez", team: "away" },
    ],
    stats: {
      possession: [62, 38],
      shots: [18, 7],
      shotsOnTarget: [9, 3],
      corners: [9, 2],
      fouls: [8, 16],
      yellowCards: [0, 2],
      redCards: [0, 0],
      offsides: [3, 4],
    }
  },
  {
    id: "m3",
    homeTeam: "france",
    awayTeam: "germany",
    homeTeamName: "France",
    awayTeamName: "Germany",
    homeFlag: "🇫🇷",
    awayFlag: "🇩🇪",
    homeScore: 2,
    awayScore: 2,
    status: "live",
    minute: 82,
    date: "2026-06-13",
    time: "18:00",
    stadium: "AT&T Stadium",
    stadiumCity: "Dallas",
    group: "D",
    round: "Group Stage",
    events: [
      { minute: 8, type: "goal", player: "Kylian Mbappé", team: "home" },
      { minute: 31, type: "goal", player: "Kai Havertz", team: "away" },
      { minute: 55, type: "goal", player: "Kai Havertz", team: "away" },
      { minute: 71, type: "goal", player: "Antoine Griezmann", team: "home" },
      { minute: 75, type: "yellow", player: "Dayot Upamecano", team: "home" },
    ],
    stats: {
      possession: [55, 45],
      shots: [16, 12],
      shotsOnTarget: [7, 5],
      corners: [8, 5],
      fouls: [13, 11],
      yellowCards: [2, 1],
      redCards: [0, 0],
      offsides: [1, 2],
    }
  },
  {
    id: "m4",
    homeTeam: "argentina",
    awayTeam: "spain",
    homeTeamName: "Argentina",
    awayTeamName: "Spain",
    homeFlag: "🇦🇷",
    awayFlag: "🇪🇸",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    date: "2026-06-14",
    time: "19:00",
    stadium: "Levi's Stadium",
    stadiumCity: "San Francisco",
    group: "F",
    round: "Group Stage",
  },
  {
    id: "m5",
    homeTeam: "england",
    awayTeam: "portugal",
    homeTeamName: "England",
    awayTeamName: "Portugal",
    homeFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    awayFlag: "🇵🇹",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    date: "2026-06-14",
    time: "21:00",
    stadium: "Hard Rock Stadium",
    stadiumCity: "Miami",
    group: "B",
    round: "Group Stage",
  },
  {
    id: "m6",
    homeTeam: "japan",
    awayTeam: "morocco",
    homeTeamName: "Japan",
    awayTeamName: "Morocco",
    homeFlag: "🇯🇵",
    awayFlag: "🇲🇦",
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    date: "2026-06-15",
    time: "15:00",
    stadium: "Rose Bowl",
    stadiumCity: "Los Angeles",
    group: "G",
    round: "Group Stage",
  },
  {
    id: "m7",
    homeTeam: "usa",
    awayTeam: "mexico",
    homeTeamName: "United States",
    awayTeamName: "Mexico",
    homeFlag: "🇺🇸",
    awayFlag: "🇲🇽",
    homeScore: 3,
    awayScore: 2,
    status: "finished",
    date: "2026-06-08",
    time: "20:00",
    stadium: "AT&T Stadium",
    stadiumCity: "Dallas",
    group: "A",
    round: "Group Stage",
    events: [
      { minute: 15, type: "goal", player: "Christian Pulisic", team: "home" },
      { minute: 29, type: "goal", player: "Hirving Lozano", team: "away" },
      { minute: 44, type: "goal", player: "Weston McKennie", team: "home" },
      { minute: 68, type: "goal", player: "Raúl Jiménez", team: "away" },
      { minute: 88, type: "goal", player: "Ricardo Pepi", team: "home" },
    ],
    stats: {
      possession: [53, 47],
      shots: [15, 11],
      shotsOnTarget: [7, 5],
      corners: [6, 5],
      fouls: [12, 13],
      yellowCards: [2, 3],
      redCards: [0, 0],
      offsides: [2, 4],
    }
  },
];

export const getLiveMatches = () => matches.filter(m => m.status === 'live');
export const getUpcomingMatches = () => matches.filter(m => m.status === 'upcoming').slice(0, 5);
export const getRecentMatches = () => matches.filter(m => m.status === 'finished').slice(0, 5);
export const getMatchById = (id: string) => matches.find(m => m.id === id);
