import { ResultsResponse, ScheduleResponse, GameDetails } from "@/types/euroleague";

const BASE_URL = "https://api-live.euroleague.net/v1";

export const fetchResults = async (seasonCode: string, gameNumber: number): Promise<ResultsResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/results?seasonCode=${seasonCode}&gameNumber=${gameNumber}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch results");
    }
    
    const data = await response.text();
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
      homescore: parseInt(game.getElementsByTagName("homescore")[0]?.textContent || "0"),
      awayteam: game.getElementsByTagName("awayteam")[0]?.textContent || "",
      awaycode: game.getElementsByTagName("awaycode")[0]?.textContent || "",
      awayscore: parseInt(game.getElementsByTagName("awayscore")[0]?.textContent || "0"),
      played: game.getElementsByTagName("played")[0]?.textContent === "true"
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

export const fetchGameDetails = async (seasonCode: string, gameCode: number): Promise<GameDetails> => {
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
