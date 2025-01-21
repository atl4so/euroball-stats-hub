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
}