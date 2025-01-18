import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGameDetails } from "@/services/euroleagueApi";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Home
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

      {/* Home Team Player Stats */}
      <Card>
        <CardHeader>
          <CardTitle>{gameDetails.localclub.name} Player Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>MIN</TableHead>
                <TableHead>PTS</TableHead>
                <TableHead>2PM-A</TableHead>
                <TableHead>3PM-A</TableHead>
                <TableHead>FTM-A</TableHead>
                <TableHead>REB</TableHead>
                <TableHead>AST</TableHead>
                <TableHead>STL</TableHead>
                <TableHead>BLK</TableHead>
                <TableHead>TO</TableHead>
                <TableHead>PF</TableHead>
                <TableHead>PIR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gameDetails.localclub.playerstats.stat.map((player) => (
                <TableRow key={player.PlayerCode}>
                  <TableCell className="font-medium">
                    <Link to={`/player/${player.PlayerCode}`} className="hover:underline">
                      {player.PlayerName}
                    </Link>
                  </TableCell>
                  <TableCell>{player.TimePlayed}</TableCell>
                  <TableCell>{player.Score}</TableCell>
                  <TableCell>{`${player.FieldGoalsMade2}-${player.FieldGoalsAttempted2}`}</TableCell>
                  <TableCell>{`${player.FieldGoalsMade3}-${player.FieldGoalsAttempted3}`}</TableCell>
                  <TableCell>{`${player.FreeThrowsMade}-${player.FreeThrowsAttempted}`}</TableCell>
                  <TableCell>{player.TotalRebounds}</TableCell>
                  <TableCell>{player.Assistances}</TableCell>
                  <TableCell>{player.Steals}</TableCell>
                  <TableCell>{player.BlocksFavour}</TableCell>
                  <TableCell>{player.Turnovers}</TableCell>
                  <TableCell>{player.FoulsCommited}</TableCell>
                  <TableCell>{player.Valuation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Away Team Player Stats */}
      <Card>
        <CardHeader>
          <CardTitle>{gameDetails.roadclub.name} Player Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>MIN</TableHead>
                <TableHead>PTS</TableHead>
                <TableHead>2PM-A</TableHead>
                <TableHead>3PM-A</TableHead>
                <TableHead>FTM-A</TableHead>
                <TableHead>REB</TableHead>
                <TableHead>AST</TableHead>
                <TableHead>STL</TableHead>
                <TableHead>BLK</TableHead>
                <TableHead>TO</TableHead>
                <TableHead>PF</TableHead>
                <TableHead>PIR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gameDetails.roadclub.playerstats.stat.map((player) => (
                <TableRow key={player.PlayerCode}>
                  <TableCell className="font-medium">
                    <Link to={`/player/${player.PlayerCode}`} className="hover:underline">
                      {player.PlayerName}
                    </Link>
                  </TableCell>
                  <TableCell>{player.TimePlayed}</TableCell>
                  <TableCell>{player.Score}</TableCell>
                  <TableCell>{`${player.FieldGoalsMade2}-${player.FieldGoalsAttempted2}`}</TableCell>
                  <TableCell>{`${player.FieldGoalsMade3}-${player.FieldGoalsAttempted3}`}</TableCell>
                  <TableCell>{`${player.FreeThrowsMade}-${player.FreeThrowsAttempted}`}</TableCell>
                  <TableCell>{player.TotalRebounds}</TableCell>
                  <TableCell>{player.Assistances}</TableCell>
                  <TableCell>{player.Steals}</TableCell>
                  <TableCell>{player.BlocksFavour}</TableCell>
                  <TableCell>{player.Turnovers}</TableCell>
                  <TableCell>{player.FoulsCommited}</TableCell>
                  <TableCell>{player.Valuation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameDetails;