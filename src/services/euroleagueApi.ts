import { ResultsResponse, ScheduleResponse } from "@/types/euroleague";

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