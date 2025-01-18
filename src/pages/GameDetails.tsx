import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchGameDetails } from "@/services/euroleagueApi";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const GameDetails = () => {
  const { gameCode } = useParams();
  
  const { data: gameDetails, isLoading } = useQuery({
    queryKey: ["gameDetails", gameCode],
    queryFn: () => fetchGameDetails(Number(gameCode) || 0, "E2024"),
    enabled: !!gameCode
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-8 w-full max-w-md" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!gameDetails) return null;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Game Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">{gameDetails.localclub.name} vs {gameDetails.roadclub.name}</h1>
        <p className="text-muted-foreground">
          {gameDetails.cetdate}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold">Score</h2>
          <p>{gameDetails.localclub.name}: {gameDetails.localclub.score}</p>
          <p>{gameDetails.roadclub.name}: {gameDetails.roadclub.score}</p>
        </div>
        <div className="card">
          <h2 className="font-semibold">Location</h2>
          <p>{gameDetails.stadium} - {gameDetails.stadiumname}</p>
          <p>Attendance: {gameDetails.audience}</p>
        </div>
        <div className="card">
          <h2 className="font-semibold">Game Status</h2>
          <p>Status: {gameDetails.played ? 'Completed' : 'Scheduled'}</p>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;