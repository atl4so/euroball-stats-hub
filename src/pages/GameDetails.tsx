import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "@/services/euroleagueApi";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerStat } from "@/types/euroleague";

const GameDetails = () => {
  const { gameCode } = useParams();
  
  const { data: gameDetails, isLoading } = useQuery({
    queryKey: ["gameDetails", gameCode],
    queryFn: () => fetchGameDetails("E2024", parseInt(gameCode || "0")),
    enabled: !!gameCode
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

  if (!gameDetails) return null;

  const renderPlayerStats = (stats: PlayerStat[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">MIN</TableHead>
          <TableHead className="text-right">PTS</TableHead>
          <TableHead className="text-right">2FG</TableHead>
          <TableHead className="text-right">3FG</TableHead>
          <TableHead className="text-right">FT</TableHead>
          <TableHead className="text-right">REB</TableHead>
          <TableHead className="text-right">AST</TableHead>
          <TableHead className="text-right">STL</TableHead>
          <TableHead className="text-right">BLK</TableHead>
          <TableHead className="text-right">TO</TableHead>
          <TableHead className="text-right">PIR</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats.filter(player => player.PlayerName !== "Team").map((player) => (
          <TableRow key={player.PlayerCode}>
            <TableCell className="font-medium">
              {player.PlayerName}
              {player.StartFive && " *"}
            </TableCell>
            <TableCell className="text-right">{player.TimePlayed}</TableCell>
            <TableCell className="text-right">{player.Score}</TableCell>
            <TableCell className="text-right">
              {player.FieldGoalsMade2}/{player.FieldGoalsAttempted2}
            </TableCell>
            <TableCell className="text-right">
              {player.FieldGoalsMade3}/{player.FieldGoalsAttempted3}
            </TableCell>
            <TableCell className="text-right">
              {player.FreeThrowsMade}/{player.FreeThrowsAttempted}
            </TableCell>
            <TableCell className="text-right">{player.TotalRebounds}</TableCell>
            <TableCell className="text-right">{player.Assistances}</TableCell>
            <TableCell className="text-right">{player.Steals}</TableCell>
            <TableCell className="text-right">{player.BlocksFavour}</TableCell>
            <TableCell className="text-right">{player.Turnovers}</TableCell>
            <TableCell className="text-right">{player.Valuation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          {gameDetails.localclub.name} vs {gameDetails.roadclub.name}
        </h1>
        <p className="text-muted-foreground">
          {format(new Date(gameDetails.cetdate), "MMMM d, yyyy")} • {gameDetails.stadiumname}
        </p>
        <div className="text-xl font-semibold">
          {gameDetails.localclub.score} - {gameDetails.roadclub.score}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quarter Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead className="text-right">Q1</TableHead>
                <TableHead className="text-right">Q2</TableHead>
                <TableHead className="text-right">Q3</TableHead>
                <TableHead className="text-right">Q4</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{gameDetails.localclub.name}</TableCell>
                <TableCell className="text-right">{gameDetails.localclub.partials.Partial1}</TableCell>
                <TableCell className="text-right">{gameDetails.localclub.partials.Partial2}</TableCell>
                <TableCell className="text-right">{gameDetails.localclub.partials.Partial3}</TableCell>
                <TableCell className="text-right">{gameDetails.localclub.partials.Partial4}</TableCell>
                <TableCell className="text-right font-bold">{gameDetails.localclub.score}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{gameDetails.roadclub.name}</TableCell>
                <TableCell className="text-right">{gameDetails.roadclub.partials.Partial1}</TableCell>
                <TableCell className="text-right">{gameDetails.roadclub.partials.Partial2}</TableCell>
                <TableCell className="text-right">{gameDetails.roadclub.partials.Partial3}</TableCell>
                <TableCell className="text-right">{gameDetails.roadclub.partials.Partial4}</TableCell>
                <TableCell className="text-right font-bold">{gameDetails.roadclub.score}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{gameDetails.localclub.name}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {renderPlayerStats(gameDetails.localclub.playerstats.stat)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{gameDetails.roadclub.name}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {renderPlayerStats(gameDetails.roadclub.playerstats.stat)}
        </CardContent>
      </Card>
    </div>
  );
};

export default GameDetails;