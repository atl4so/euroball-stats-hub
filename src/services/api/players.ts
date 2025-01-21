import { PlayerDetails } from "@/types/euroleague";
import { BASE_URL, defaultHeaders } from "./config";

export const fetchPlayerDetails = async (playerCode: string, seasonCode: string): Promise<PlayerDetails> => {
  try {
    const response = await fetch(
      `${BASE_URL}/players?playerCode=${playerCode}&seasonCode=${seasonCode}`,
      {
        headers: defaultHeaders,
      }
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