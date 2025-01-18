import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGameDetails } from "@/services/euroleagueApi";
import { GameHeader } from "@/components/game/GameHeader";
import { GameScore } from "@/components/game/GameScore";
import { GameLocation } from "@/components/game/GameLocation";
import { GameStatus } from "@/components/game/GameStatus";
import { QuarterScores } from "@/components/game/QuarterScores";
import { TeamStats } from "@/components/game/TeamStats";
import { useEffect } from "react";

const GameDetails = () => {
  const { gameCode } = useParams();
  const { data: gameDetails, isLoading, error } = useQuery({
    queryKey: ["gameDetails", gameCode],
    queryFn: () => {
      if (!gameCode) {
        throw new Error("Game code is required");
      }
      return fetchGameDetails(parseInt(gameCode, 10), "E2024");
    },
    enabled: !!gameCode,
  });

  useEffect(() => {
    if (gameDetails) {
      document.title = `${gameDetails.localclub.name} vs ${gameDetails.roadclub.name} - Euroleague Game ${gameCode}`;
    }
  }, [gameDetails, gameCode]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error loading game details: {error.message}</div>;
  if (!gameDetails) return <div className="p-4">No game details found</div>;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
      <GameHeader
        localTeam={gameDetails.localclub.name}
        roadTeam={gameDetails.roadclub.name}
        date={gameDetails.cetdate}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <GameScore
          localTeam={gameDetails.localclub.name}
          localScore={gameDetails.localclub.score}
          roadTeam={gameDetails.roadclub.name}
          roadScore={gameDetails.roadclub.score}
        />
        <GameLocation
          stadium={gameDetails.stadium}
          stadiumName={gameDetails.stadiumname}
          audience={gameDetails.audience}
        />
        <GameStatus played={gameDetails.played} />
      </div>

      <QuarterScores
        localTeam={gameDetails.localclub}
        roadTeam={gameDetails.roadclub}
      />

      <div className="space-y-6">
        <TeamStats team={gameDetails.localclub} />
        <TeamStats team={gameDetails.roadclub} />
      </div>
    </div>
  );
};

export default GameDetails;