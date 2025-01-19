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
  homescore: string;
  awayteam: string;
  awaycode: string;
  awayscore: string;
  played: boolean;
  live?: string;
  score?: string;
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

export interface PlayerStats {
  accumulated: {
    season: {
      code: string;
      gamesplayed: number;
      timeplayed: string;
      score: number;
      fieldgoalsmade2: number;
      fieldgoalsmade3: number;
      freethrowsmade: number;
      fieldgoalsattempted2: number;
      fieldgoalsattempted3: number;
      freethrowsattempted: number;
      offensiverebounds: number;
      defensiverebounds: number;
      totalrebounds: number;
      assistances: number;
      steals: number;
      turnovers: number;
      blocksagainst: number;
      blocksfavour: number;
      foulscommited: number;
      foulsreceived: number;
      valuation: number;
    };
    phases: {
      phase: {
        code: string;
        gamesplayed: number;
        timeplayed: string;
      }[];
    };
  };
}

export interface PlayerDetails {
  name: string;
  height: number;
  birthDate: string;
  country: string;
  imageUrl: string;
  imageHorizontalUrl: string;
  clubCode: string;
  clubName: string;
  dorsal: string;
  position: string;
  score: number;
  timePlayed: string;
  valuation: number;
  totalRebounds: number;
  offensiveRebounds: number;
  defensiveRebounds: number;
  assistances: number;
  steals: number;
  turnovers: number;
  blocksAgainst: number;
  blocksFavour: number;
  fieldGoals2Percent: string;
  fieldGoals3Percent: string;
  freeThrowsPercent: string;
  foulsCommited: number;
  foulsReceived: number;
  career: string;
  misc: string;
  stats?: PlayerStats;
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
  time: string;
  round: string;
  gameday: number;
  group: string;
  stadium: string;
  stadiumname: string;
  audience: number;
  localclub: TeamStats;
  roadclub: TeamStats;
}
