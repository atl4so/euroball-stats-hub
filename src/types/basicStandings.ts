export interface Club {
  code: string;
  name: string;
  abbreviatedName: string;
  editorialName: string;
  tvCode: string;
  isVirtual: boolean;
  images: {
    crest: string;
  };
}

export interface TeamStanding {
  position: number;
  positionChange: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  qualified: boolean;
  club: Club;
  winPercentage: string;
  pointsDifference: string;
  pointsFor: number;
  pointsAgainst: number;
  homeRecord: string;
  awayRecord: string;
  neutralRecord: string;
  overtimeRecord: string;
  lastFiveRecord: string;
  groupName: string;
  last5Form: string[];
}

export interface BasicStandingsResponse {
  winner: Club | null;
  teams: TeamStanding[];
}
