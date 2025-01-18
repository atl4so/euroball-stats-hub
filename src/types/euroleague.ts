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