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
    queryFn: () => fetchGameDetails(gameCode || "", "E2024"),
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
        <h1 className="text-2xl font-bold">{gameDetails.hometeam} vs {gameDetails.awayteam}</h1>
        <p className="text-muted-foreground">
          {gameDetails.date} at {gameDetails.time}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold">Score</h2>
          <p>{gameDetails.hometeam}: {gameDetails.homescore}</p>
          <p>{gameDetails.awayteam}: {gameDetails.awayscore}</p>
        </div>
        <div className="card">
          <h2 className="font-semibold">Location</h2>
          <p>{gameDetails.arena}, {gameDetails.city}, {gameDetails.country}</p>
          <p>Attendance: {gameDetails.attendance}</p>
        </div>
        <div className="card">
          <h2 className="font-semibold">Referees</h2>
          <ul>
            {gameDetails.referees.map((referee, index) => (
              <li key={index}>{referee}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;