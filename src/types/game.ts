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
  status?: string;
  stadium?: string;
  stadiumname?: string;
  attendance?: string;
}