export interface TeamsResponse {
  clubs: {
    club: Team[];
  };
}

export interface Team {
  code: string;
  tvcode: string;
  name: string;
  clubname: string;
  clubalias: string;
  countrycode: string;
  countryname: string;
  clubaddress: string;
  website: string;
  ticketsurl: string;
  twitteraccount: string;
  arena: {
    name: string;
  };
  games: {
    phase: {
      code: string;
      type: string;
      alias: string;
      game: Array<{
        gamenumber: string;
        confirmeddate: boolean;
        standingslocalscore: string;
        standingsroadscore: string;
        gamecode: string;
        seasoncode: string;
        phasetypecode: string;
        gamedate: string;
        played: boolean;
        win: string;
        tie: string;
        loss: string;
        versustype: string;
        versus: string;
      }>;
    };
  };
  roster: {
    player: Array<{
      code: string;
      name: string;
      alias: string;
      dorsal: string;
      position: string;
      countrycode: string;
      countryname: string;
    }>;
  };
  coach: {
    code: string;
    name: string;
    alias: string;
    countrycode: string;
    countryname: string;
  };
}
