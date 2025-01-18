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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <h1 className="text-3xl font-bold">
          {gameDetails.localclub.name} vs {gameDetails.roadclub.name}
        </h1>
        <p className="text-muted-foreground text-lg">
          {gameDetails.cetdate}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{gameDetails.localclub.name}</span>
              <span className="text-2xl">{gameDetails.localclub.score}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">{gameDetails.roadclub.name}</span>
              <span className="text-2xl">{gameDetails.roadclub.score}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><span className="font-semibold">Venue:</span> {gameDetails.stadium} - {gameDetails.stadiumname}</p>
            <p><span className="font-semibold">Attendance:</span> {gameDetails.audience.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Game Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p><span className="font-semibold">Status:</span> {gameDetails.played ? 'Completed' : 'Scheduled'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quarter Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-4 font-semibold">
                <div>Team</div>
                <div>Q1</div>
                <div>Q2</div>
                <div>Q3</div>
                <div>Q4</div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                <div>{gameDetails.localclub.name}</div>
                <div>{gameDetails.localclub.partials.Partial1}</div>
                <div>{gameDetails.localclub.partials.Partial2}</div>
                <div>{gameDetails.localclub.partials.Partial3}</div>
                <div>{gameDetails.localclub.partials.Partial4}</div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                <div>{gameDetails.roadclub.name}</div>
                <div>{gameDetails.roadclub.partials.Partial1}</div>
                <div>{gameDetails.roadclub.partials.Partial2}</div>
                <div>{gameDetails.roadclub.partials.Partial3}</div>
                <div>{gameDetails.roadclub.partials.Partial4}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameDetails;