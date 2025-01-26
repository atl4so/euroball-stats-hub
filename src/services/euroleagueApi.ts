import { ResultsResponse, ScheduleResponse, PlayerDetails, GameDetails, TeamStats } from "@/types/euroleague";
import { xmlToJson } from "@/utils/xmlParser";
import { TeamsResponse } from "@/types/team";
import { type BasicStandingsResponse } from "@/types/basicStandings";
import { supabase } from "@/integrations/supabase/client";

const BASE_URL = "https://api-live.euroleague.net/v1";
const BASE_URL_V3 = "https://api-live.euroleague.net/v3";

export const fetchResults = async (seasonCode: string, gameNumber: number): Promise<ResultsResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('euroleague-proxy', {
      body: {
        path: `/results?seasonCode=${seasonCode}&gameNumber=${gameNumber}`
      }
    });

    if (error) {
      throw error;
    }
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    
    const games = Array.from(xmlDoc.getElementsByTagName("game")).map(game => ({
      round: game.getElementsByTagName("round")[0]?.textContent || "",
      gameday: parseInt(game.getElementsByTagName("gameday")[0]?.textContent || "0"),
      date: game.getElementsByTagName("date")[0]?.textContent || "",
      time: game.getElementsByTagName("time")[0]?.textContent || "",
      gamenumber: parseInt(game.getElementsByTagName("gamenumber")[0]?.textContent || "0"),
      gamecode: game.getElementsByTagName("gamecode")[0]?.textContent || "",
      group: game.getElementsByTagName("group")[0]?.textContent || "",
      hometeam: game.getElementsByTagName("hometeam")[0]?.textContent || "",
      homecode: game.getElementsByTagName("homecode")[0]?.textContent || "",
      homescore: game.getElementsByTagName("homescore")[0]?.textContent || "0",
      awayteam: game.getElementsByTagName("awayteam")[0]?.textContent || "",
      awaycode: game.getElementsByTagName("awaycode")[0]?.textContent || "",
      awayscore: game.getElementsByTagName("awayscore")[0]?.textContent || "0",
      played: game.getElementsByTagName("played")[0]?.textContent === "true",
      live: game.getElementsByTagName("live")[0]?.textContent || "0"
    }));

    return { game: games };
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};

export const fetchSchedule = async (seasonCode: string, gameNumber: number): Promise<ScheduleResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/schedules?seasonCode=${seasonCode}&gameNumber=${gameNumber}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch schedule");
    }
    
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    
    const items = Array.from(xmlDoc.getElementsByTagName("item")).map(item => ({
      gameday: parseInt(item.getElementsByTagName("gameday")[0]?.textContent || "0"),
      round: item.getElementsByTagName("round")[0]?.textContent || "",
      arenacode: item.getElementsByTagName("arenacode")[0]?.textContent || "",
      arenaname: item.getElementsByTagName("arenaname")[0]?.textContent || "",
      arenacapacity: parseInt(item.getElementsByTagName("arenacapacity")[0]?.textContent || "0"),
      date: item.getElementsByTagName("date")[0]?.textContent || "",
      startime: item.getElementsByTagName("startime")[0]?.textContent || "",
      endtime: item.getElementsByTagName("endtime")[0]?.textContent || "",
      group: item.getElementsByTagName("group")[0]?.textContent || "",
      game: parseInt(item.getElementsByTagName("game")[0]?.textContent || "0"),
      gamecode: item.getElementsByTagName("gamecode")[0]?.textContent || "",
      hometeam: item.getElementsByTagName("hometeam")[0]?.textContent || "",
      homecode: item.getElementsByTagName("homecode")[0]?.textContent || "",
      hometv: item.getElementsByTagName("hometv")[0]?.textContent || "",
      awayteam: item.getElementsByTagName("awayteam")[0]?.textContent || "",
      awaycode: item.getElementsByTagName("awaycode")[0]?.textContent || "",
      awaytv: item.getElementsByTagName("awaytv")[0]?.textContent || "",
      confirmeddate: item.getElementsByTagName("confirmeddate")[0]?.textContent === "true",
      confirmedtime: item.getElementsByTagName("confirmedtime")[0]?.textContent === "true",
      played: item.getElementsByTagName("played")[0]?.textContent === "true"
    }));

    return { item: items };
  } catch (error) {
    console.error("Error fetching schedule:", error);
    throw error;
  }
};

export const fetchGameDetails = async (gameCode: number, seasonCode: string): Promise<GameDetails> => {
  try {
    const response = await fetch(
      `${BASE_URL}/games?seasonCode=${seasonCode}&gameCode=${gameCode}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch game details");
    }
    
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    
    const game = xmlDoc.getElementsByTagName("game")[0];
    console.log("Game XML attributes:", {
      round: game.getAttribute("round"),
      roundElement: game.getElementsByTagName("round")[0]?.textContent,
      gameday: game.getAttribute("gameday"),
      group: game.getAttribute("group")
    });
    
    const roundText = game.getElementsByTagName("round")[0]?.textContent || game.getAttribute("round") || "";

    const parseTeamStats = (teamElement: Element): TeamStats => {
      const playerStats = Array.from(teamElement.getElementsByTagName("stat")).map(stat => ({
        TimePlayed: stat.getElementsByTagName("TimePlayed")[0]?.textContent || "",
        TimePlayedSeconds: parseInt(stat.getElementsByTagName("TimePlayedSeconds")[0]?.textContent || "0"),
        Dorsal: parseInt(stat.getElementsByTagName("Dorsal")[0]?.textContent || "0"),
        PlayerCode: stat.getElementsByTagName("PlayerCode")[0]?.textContent || "",
        PlayerName: stat.getElementsByTagName("PlayerName")[0]?.textContent || "",
        PlayerAlias: stat.getElementsByTagName("PlayerAlias")[0]?.textContent || "",
        StartFive: stat.getElementsByTagName("StartFive")[0]?.textContent === "true",
        Valuation: parseInt(stat.getElementsByTagName("Valuation")[0]?.textContent || "0"),
        Score: parseInt(stat.getElementsByTagName("Score")[0]?.textContent || "0"),
        FieldGoalsMade2: parseInt(stat.getElementsByTagName("FieldGoalsMade2")[0]?.textContent || "0"),
        FieldGoalsAttempted2: parseInt(stat.getElementsByTagName("FieldGoalsAttempted2")[0]?.textContent || "0"),
        FieldGoalsMade3: parseInt(stat.getElementsByTagName("FieldGoalsMade3")[0]?.textContent || "0"),
        FieldGoalsAttempted3: parseInt(stat.getElementsByTagName("FieldGoalsAttempted3")[0]?.textContent || "0"),
        FreeThrowsMade: parseInt(stat.getElementsByTagName("FreeThrowsMade")[0]?.textContent || "0"),
        FreeThrowsAttempted: parseInt(stat.getElementsByTagName("FreeThrowsAttempted")[0]?.textContent || "0"),
        TotalRebounds: parseInt(stat.getElementsByTagName("TotalRebounds")[0]?.textContent || "0"),
        DefensiveRebounds: parseInt(stat.getElementsByTagName("DefensiveRebounds")[0]?.textContent || "0"),
        OffensiveRebounds: parseInt(stat.getElementsByTagName("OffensiveRebounds")[0]?.textContent || "0"),
        Assistances: parseInt(stat.getElementsByTagName("Assistances")[0]?.textContent || "0"),
        Steals: parseInt(stat.getElementsByTagName("Steals")[0]?.textContent || "0"),
        Turnovers: parseInt(stat.getElementsByTagName("Turnovers")[0]?.textContent || "0"),
        BlocksFavour: parseInt(stat.getElementsByTagName("BlocksFavour")[0]?.textContent || "0"),
        BlocksAgainst: parseInt(stat.getElementsByTagName("BlocksAgainst")[0]?.textContent || "0"),
        FoulsCommited: parseInt(stat.getElementsByTagName("FoulsCommited")[0]?.textContent || "0"),
        FoulsReceived: parseInt(stat.getElementsByTagName("FoulsReceived")[0]?.textContent || "0"),
        PlusMinus: parseInt(stat.getElementsByTagName("PlusMinus")[0]?.textContent || "0"),
      }));

      const partialsElement = teamElement.getElementsByTagName("partials")[0];
      
      return {
        code: teamElement.getAttribute("code") || "",
        name: teamElement.getAttribute("name") || "",
        score: parseInt(teamElement.getAttribute("score") || "0"),
        playerstats: {
          stat: playerStats
        },
        partials: {
          Partial1: parseInt(partialsElement?.getAttribute("Partial1") || "0"),
          Partial2: parseInt(partialsElement?.getAttribute("Partial2") || "0"),
          Partial3: parseInt(partialsElement?.getAttribute("Partial3") || "0"),
          Partial4: parseInt(partialsElement?.getAttribute("Partial4") || "0"),
        }
      };
    };

    return {
      seasoncode: game.getAttribute("seasoncode") || "",
      code: game.getAttribute("code") || "",
      played: game.getAttribute("played") === "true",
      cetdate: game.getAttribute("cetdate") || "",
      time: game.getAttribute("time") || "",
      round: roundText,
      gameday: parseInt(game.getAttribute("gameday") || "0"),
      group: game.getAttribute("group") || "",
      stadium: game.getAttribute("stadium") || "",
      stadiumname: game.getAttribute("stadiumname") || "",
      audience: parseInt(game.getElementsByTagName("audience")[0]?.textContent || "0"),
      localclub: parseTeamStats(game.getElementsByTagName("localclub")[0]),
      roadclub: parseTeamStats(game.getElementsByTagName("roadclub")[0])
    };
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw error;
  }
};

export const fetchPlayerDetails = async (playerCode: string, seasonCode: string): Promise<PlayerDetails> => {
  try {
    const response = await fetch(
      `${BASE_URL}/players?playerCode=${playerCode}&seasonCode=${seasonCode}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch player details");
    }
    
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    
    const player = xmlDoc.getElementsByTagName("player")[0];
    if (!player) {
      throw new Error("Player data not found");
    }
    
    return {
      name: player.getElementsByTagName("name")[0]?.textContent || "",
      height: parseFloat(player.getElementsByTagName("height")[0]?.textContent || "0"),
      birthDate: player.getElementsByTagName("birthdate")[0]?.textContent || "",
      country: player.getElementsByTagName("country")[0]?.textContent || "",
      imageUrl: "", // API doesn't provide image URLs
      imageHorizontalUrl: "", // API doesn't provide image URLs
      clubCode: player.getElementsByTagName("clubcode")[0]?.textContent || "",
      clubName: player.getElementsByTagName("clubname")[0]?.textContent || "",
      dorsal: player.getElementsByTagName("dorsal")[0]?.textContent || "",
      position: player.getElementsByTagName("position")[0]?.textContent || "",
      score: parseFloat(player.getElementsByTagName("score")[0]?.textContent || "0"),
      timePlayed: player.getElementsByTagName("timeplayed")[0]?.textContent || "",
      valuation: parseFloat(player.getElementsByTagName("valuation")[0]?.textContent || "0"),
      totalRebounds: parseFloat(player.getElementsByTagName("totalrebounds")[0]?.textContent || "0"),
      offensiveRebounds: parseFloat(player.getElementsByTagName("offensiverebounds")[0]?.textContent || "0"),
      defensiveRebounds: parseFloat(player.getElementsByTagName("defensiverebounds")[0]?.textContent || "0"),
      assistances: parseFloat(player.getElementsByTagName("assistances")[0]?.textContent || "0"),
      steals: parseFloat(player.getElementsByTagName("steals")[0]?.textContent || "0"),
      turnovers: parseFloat(player.getElementsByTagName("turnovers")[0]?.textContent || "0"),
      blocksAgainst: parseFloat(player.getElementsByTagName("blocksagainst")[0]?.textContent || "0"),
      blocksFavour: parseFloat(player.getElementsByTagName("blocksfavour")[0]?.textContent || "0"),
      fieldGoals2Percent: player.getElementsByTagName("fieldgoals2percent")[0]?.textContent || "",
      fieldGoals3Percent: player.getElementsByTagName("fieldgoals3percent")[0]?.textContent || "",
      freeThrowsPercent: player.getElementsByTagName("freethrowspercent")[0]?.textContent || "",
      foulsCommited: parseFloat(player.getElementsByTagName("foulscommited")[0]?.textContent || "0"),
      foulsReceived: parseFloat(player.getElementsByTagName("foulsreceived")[0]?.textContent || "0"),
      career: player.getElementsByTagName("career")[0]?.textContent || "",
      misc: player.getElementsByTagName("misc")[0]?.textContent || ""
    };
  } catch (error) {
    console.error("Error fetching player details:", error);
    throw error;
  }
};

export const fetchTeams = async (seasonCode: string): Promise<TeamsResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/teams?seasonCode=${seasonCode}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/xml",
          "Content-Type": "application/xml",
          "Origin": "https://www.euroleague.net",
          "Referer": "https://www.euroleague.net/",
        },
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Teams API Error:", errorText);
      throw new Error(`Failed to fetch teams: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();
    console.log("Raw XML response:", xmlText);
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    const clubElements = xmlDoc.getElementsByTagName("club");
    console.log("Found club elements:", clubElements.length);
    
    const clubs = Array.from(clubElements).map(club => {
      const phaseElement = club.getElementsByTagName("phase")[0];
      const games = phaseElement ? Array.from(phaseElement.getElementsByTagName("game")).map(game => ({
        gamenumber: game.getAttribute("gamenumber") || "",
        confirmeddate: game.getAttribute("confirmeddate") === "true",
        standingslocalscore: game.getAttribute("standingslocalscore") || "",
        standingsroadscore: game.getAttribute("standingsroadscore") || "",
        gamecode: game.getAttribute("gamecode") || "",
        seasoncode: game.getAttribute("seasoncode") || "",
        phasetypecode: game.getAttribute("phasetypecode") || "",
        gamedate: game.getAttribute("gamedate") || "",
        played: game.getAttribute("played") === "true",
        win: game.getAttribute("win") || "",
        tie: game.getAttribute("tie") || "",
        loss: game.getAttribute("loss") || "",
        versustype: game.getAttribute("versustype") || "",
        versus: game.getAttribute("versus") || "",
      })) : [];

      const rosterElement = club.getElementsByTagName("roster")[0];
      console.log("Roster element:", rosterElement);
      
      const playerElements = rosterElement?.getElementsByTagName("player") || [];
      console.log("Player elements:", playerElements.length);
      
      const players = Array.from(playerElements).map(player => {
        console.log("Raw player element:", player.outerHTML);
        return {
          code: player.getAttribute("code") || "",
          name: player.getAttribute("name") || "",
          alias: player.getAttribute("alias") || "",
          dorsal: player.getAttribute("dorsal") || "",
          position: player.getAttribute("position") || "",
          countrycode: player.getAttribute("countrycode") || "",
          countryname: player.getAttribute("countryname") || "",
        };
      });
      console.log("Parsed players:", players);

      const clubData = {
        code: club.getAttribute("code") || "",
        tvcode: club.getAttribute("tvcode") || "",
        name: club.getElementsByTagName("name")[0]?.textContent || "",
        clubname: club.getElementsByTagName("clubname")[0]?.textContent || "",
        clubalias: club.getElementsByTagName("clubalias")[0]?.textContent || "",
        countrycode: club.getElementsByTagName("countrycode")[0]?.textContent || "",
        countryname: club.getElementsByTagName("countryname")[0]?.textContent || "",
        clubaddress: club.getElementsByTagName("clubaddress")[0]?.textContent || "",
        website: club.getElementsByTagName("website")[0]?.textContent || "",
        ticketsurl: club.getElementsByTagName("ticketsurl")[0]?.textContent || "",
        twitteraccount: club.getElementsByTagName("twitteraccount")[0]?.textContent || "",
        arena: {
          name: club.getElementsByTagName("arena")[0]?.getAttribute("name") || "",
        },
        games: {
          phase: {
            code: phaseElement?.getAttribute("code") || "",
            type: phaseElement?.getAttribute("type") || "",
            alias: phaseElement?.getAttribute("alias") || "",
            game: games
          }
        },
        roster: {
          player: players
        },
        coach: {
          code: club.getElementsByTagName("coach")[0]?.getAttribute("code") || "",
          name: club.getElementsByTagName("coach")[0]?.getAttribute("name") || "",
          alias: club.getElementsByTagName("coach")[0]?.getAttribute("alias") || "",
          countrycode: club.getElementsByTagName("coach")[0]?.getAttribute("countrycode") || "",
          countryname: club.getElementsByTagName("coach")[0]?.getAttribute("countryname") || "",
        }
      };
      console.log("Parsed club data:", clubData);
      return clubData;
    });

    const result = {
      clubs: {
        club: clubs
      }
    };
    console.log("Final result:", result);
    return result;
  } catch (error) {
    console.error("Error in fetchTeams:", error);
    throw error;
  }
};

export const fetchBasicStandings = async (roundNumber: string = "22"): Promise<BasicStandingsResponse> => {
  const response = await fetch(
    `${BASE_URL_V3}/competitions/euroleague/seasons/e2024/rounds/${roundNumber}/basicstandings`,
    {
      headers: API_HEADERS,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch basic standings: ${response.statusText}`);
  }

  return response.json();
};

export interface StandingsTeam {
  name: string;
  code: string;
  ranking: number;
  totalgames: number;
  wins: number;
  losses: number;
  ptsfavour: number;
  ptsagainst: number;
  difference: number;
}

export interface StandingsGroup {
  name: string;
  round: string;
  gamenumber: number;
  team: StandingsTeam[];
}

export interface StandingsResponse {
  standings: {
    group: {
      name: string;
      round: string;
      gamenumber: number;
      team: StandingsTeam[];
    };
  };
}

export const fetchStandings = async (seasonCode: string = "E2024", gameNumber: number = 22) => {
  const params = new URLSearchParams({
    seasonCode,
    gameNumber: gameNumber.toString(),
  });

  const response = await fetch(
    `https://api-live.euroleague.net/v1/standings?${params}`,
    {
      headers: {
        "Accept": "application/xml",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch standings");
  }

  const xmlText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");

  const teams = Array.from(xmlDoc.getElementsByTagName("team")).map(team => ({
    name: team.getElementsByTagName("name")[0]?.textContent || "",
    code: team.getElementsByTagName("code")[0]?.textContent || "",
    ranking: parseInt(team.getElementsByTagName("ranking")[0]?.textContent || "0"),
    totalgames: parseInt(team.getElementsByTagName("totalgames")[0]?.textContent || "0"),
    wins: parseInt(team.getElementsByTagName("wins")[0]?.textContent || "0"),
    losses: parseInt(team.getElementsByTagName("losses")[0]?.textContent || "0"),
    ptsfavour: parseInt(team.getElementsByTagName("ptsfavour")[0]?.textContent || "0"),
    ptsagainst: parseInt(team.getElementsByTagName("ptsagainst")[0]?.textContent || "0"),
    difference: parseInt(team.getElementsByTagName("difference")[0]?.textContent || "0"),
  }));

  const group = xmlDoc.getElementsByTagName("group")[0];
  return {
    standings: {
      group: {
        name: group?.getAttribute("name") || "",
        round: group?.getAttribute("round") || "",
        gamenumber: parseInt(group?.getAttribute("gamenumber") || "0"),
        team: teams,
      },
    },
  } as StandingsResponse;
};

export interface ClubV3Response {
  code: string;
  name: string;
  alias: string;
  isVirtual: boolean;
  country: {
    code: string;
    name: string;
  };
  address: string;
  website: string;
  ticketsUrl: string;
  twitterAccount: string;
  instagramAccount: string;
  facebookAccount: string;
  venue: {
    name: string;
    code: string;
    capacity: number;
    address: string;
    images: Record<string, string>;
    active: boolean;
    notes: string;
  };
  city: string;
  president: string;
  phone: string;
  fax: string;
  images: {
    crest: string;
  };
}

export const fetchClubV3 = async (clubCode: string): Promise<ClubV3Response> => {
  const response = await fetch(
    `${BASE_URL_V3}/clubs/${clubCode}`,
    {
      headers: API_HEADERS,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch club details: ${response.statusText}`);
  }

  return response.json();
};

