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