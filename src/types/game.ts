export interface Game {
  status?: string;
  dateTime?: string;
  time?: string;
  gameCode: string;
  homeTeam: {
    name: string;
  };
  awayTeam: {
    name: string;
  };
  homeScore?: string;
  awayScore?: string;
  stadium?: string;
  stadiumname?: string;
  attendance?: string;
  round?: string;
  gameday?: number;
  date?: string;
  gamenumber?: number;
  group?: string;
  homecode?: string;
  awaycode?: string;
  played?: boolean;
}