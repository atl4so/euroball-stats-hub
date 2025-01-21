import { BasicStandingsResponse } from "@/types/basicStandings";
import { BASE_URL_V3, API_HEADERS, BASE_URL } from "./config";

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

export const fetchStandings = async (seasonCode: string = "E2024", gameNumber: number = 22): Promise<StandingsResponse> => {
  const params = new URLSearchParams({
    seasonCode,
    gameNumber: gameNumber.toString(),
  });

  const response = await fetch(
    `${BASE_URL}/standings?${params}`,
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
  };
};