import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGameDetails } from "@/services/euroleagueApi";
import { GameHeader } from "@/components/game/GameHeader";
import { GameScore } from "@/components/game/GameScore";
import { GameLocation } from "@/components/game/GameLocation";
import { GameStatus } from "@/components/game/GameStatus";
import { QuarterScores } from "@/components/game/QuarterScores";
import { TeamStats } from "@/components/game/TeamStats";

const GameDetails = () => {
  const { gameCode } = useParams();
  const { data: gameDetails, isLoading } = useQuery({
    queryKey: ["gameDetails", gameCode],
    queryFn: () => fetchGameDetails(Number(gameCode), "E2023"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!gameDetails) return <div>No game details found</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <GameHeader
        localTeam={gameDetails.localclub.name}
        roadTeam={gameDetails.roadclub.name}
        date={gameDetails.cetdate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <QuarterScores
          localTeam={gameDetails.localclub}
          roadTeam={gameDetails.roadclub}
        />
      </div>

      <TeamStats team={gameDetails.localclub} />
      <TeamStats team={gameDetails.roadclub} />
    </div>
  );
};

export default GameDetails;