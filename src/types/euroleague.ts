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

export interface GameDetails {
  gamecode: string;
  round: string;
  date: string;
  time: string;
  hometeam: string;
  awayteam: string;
  homescore: number;
  awayscore: number;
  arena: string;
  city: string;
  country: string;
  attendance: number;
  referees: string[];
}

export interface TeamStats {
  teamCode: string;
  teamName: string;
  score: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  timeouts: number;
}