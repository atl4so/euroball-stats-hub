export interface Game {
  round: string;
  gameday: number;
  date: string;
  time: string;
  gamenumber: number;
  gamecode: string;
  group: string;
  hometeam: string;
  homecode: string;
  homescore: number;
  awayteam: string;
  awaycode: string;
  awayscore: number;
  played: boolean;
}

export interface ResultsResponse {
  game: Game[];
}

export interface ScheduleItem {
  gameday: number;
  round: string;
  arenacode: string;
  arenaname: string;
  arenacapacity: number;
  date: string;
  startime: string;
  endtime: string;
  group: string;
  game: number;
  gamecode: string;
  hometeam: string;
  homecode: string;
  hometv: string;
  awayteam: string;
  awaycode: string;
  awaytv: string;
  confirmeddate: boolean;
  confirmedtime: boolean;
  played: boolean;
}

export interface ScheduleResponse {
  item: ScheduleItem[];
}

export interface PlayerStat {
  TimePlayed: string;
  TimePlayedSeconds: number;
  Dorsal: number;
  PlayerCode: string;
  PlayerName: string;
  PlayerAlias: string;
  StartFive: boolean;
  Valuation: number;
  Score: number;
  FieldGoalsMade2: number;
  FieldGoalsAttempted2: number;
  FieldGoalsMade3: number;
  FieldGoalsAttempted3: number;
  FreeThrowsMade: number;
  FreeThrowsAttempted: number;
  TotalRebounds: number;
  DefensiveRebounds: number;
  OffensiveRebounds: number;
  Assistances: number;
  Steals: number;
  Turnovers: number;
  BlocksFavour: number;
  BlocksAgainst: number;
  FoulsCommited: number;
  FoulsReceived: number;
  PlusMinus: number;
}

export interface TeamStats {
  code: string;
  name: string;
  score: number;
  playerstats: {
    stat: PlayerStat[];
  };
  partials: {
    Partial1: number;
    Partial2: number;
    Partial3: number;
    Partial4: number;
  };
}

export interface GameDetails {
  seasoncode: string;
  code: string;
  played: boolean;
  cetdate: string;
  stadium: string;
  stadiumname: string;
  audience: number;
  localclub: TeamStats;
  roadclub: TeamStats;
}
