import { TeamsResponse } from "@/types/team";
import { ClubV3Response } from "@/types/euroleague";
import { BASE_URL, BASE_URL_V3, API_HEADERS } from "./config";

export const fetchTeams = async (seasonCode: string): Promise<TeamsResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/teams?seasonCode=${seasonCode}`,
      {
        method: "GET",
        headers: API_HEADERS,
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Teams API Error:", errorText);
      throw new Error(`Failed to fetch teams: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    const clubElements = xmlDoc.getElementsByTagName("club");
    
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

      return {
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
          player: Array.from(club.getElementsByTagName("player")).map(player => ({
            code: player.getAttribute("code") || "",
            name: player.getAttribute("name") || "",
            alias: player.getAttribute("alias") || "",
            dorsal: player.getAttribute("dorsal") || "",
            position: player.getAttribute("position") || "",
            countrycode: player.getAttribute("countrycode") || "",
            countryname: player.getAttribute("countryname") || "",
          }))
        },
        coach: {
          code: club.getElementsByTagName("coach")[0]?.getAttribute("code") || "",
          name: club.getElementsByTagName("coach")[0]?.getAttribute("name") || "",
          alias: club.getElementsByTagName("coach")[0]?.getAttribute("alias") || "",
          countrycode: club.getElementsByTagName("coach")[0]?.getAttribute("countrycode") || "",
          countryname: club.getElementsByTagName("coach")[0]?.getAttribute("countryname") || "",
        }
      };
    });

    return {
      clubs: {
        club: clubs
      }
    };
  } catch (error) {
    console.error("Error in fetchTeams:", error);
    throw error;
  }
};

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