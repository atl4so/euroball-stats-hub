import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPlayerDetails } from "@/services/euroleagueApi";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PlayerDetails = () => {
  const { playerCode } = useParams();
  
  const { data: playerDetails, isLoading } = useQuery({
    queryKey: ["playerDetails", playerCode],
    queryFn: () => fetchPlayerDetails(playerCode || "", "E2024"),
    enabled: !!playerCode
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-8 w-full max-w-md" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!playerDetails) return null;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">{playerDetails.name}</h1>
        <p className="text-muted-foreground">
          {playerDetails.clubName} • #{playerDetails.dorsal}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-center mb-4">
              <img 
                src={playerDetails.imageUrl} 
                alt={playerDetails.name}
                className="rounded-lg max-h-[300px]"
              />
            </div>
            <p><span className="font-semibold">Height:</span> {playerDetails.height}cm</p>
            <p><span className="font-semibold">Birth Date:</span> {format(new Date(playerDetails.birthDate), "MMMM d, yyyy")}</p>
            <p><span className="font-semibold">Country:</span> {playerDetails.country}</p>
            <p><span className="font-semibold">Position:</span> {playerDetails.position}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Season Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><span className="font-semibold">Average Time Played:</span> {playerDetails.timePlayed}</p>
            <p><span className="font-semibold">Points Per Game:</span> {playerDetails.score}</p>
            <p><span className="font-semibold">Rebounds Per Game:</span> {playerDetails.totalRebounds}</p>
            <p><span className="font-semibold">Assists Per Game:</span> {playerDetails.assistances}</p>
            <p><span className="font-semibold">Steals Per Game:</span> {playerDetails.steals}</p>
            <p><span className="font-semibold">Blocks Per Game:</span> {playerDetails.blocksFavour}</p>
            <p><span className="font-semibold">PIR Per Game:</span> {playerDetails.valuation}</p>
            <p><span className="font-semibold">2PT%:</span> {playerDetails.fieldGoals2Percent}</p>
            <p><span className="font-semibold">3PT%:</span> {playerDetails.fieldGoals3Percent}</p>
            <p><span className="font-semibold">FT%:</span> {playerDetails.freeThrowsPercent}</p>
          </CardContent>
        </Card>

        {(playerDetails.career || playerDetails.misc) && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Career & Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {playerDetails.career && (
                <div>
                  <h3 className="font-semibold mb-2">Career</h3>
                  <p>{playerDetails.career}</p>
                </div>
              )}
              {playerDetails.misc && (
                <div>
                  <h3 className="font-semibold mb-2">Additional Information</h3>
                  <p>{playerDetails.misc}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PlayerDetails;