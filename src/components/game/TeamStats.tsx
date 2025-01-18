import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamStats as TeamStatsType } from "@/types/euroleague";

interface TeamStatsProps {
  team: TeamStatsType;
}

export const TeamStats = ({ team }: TeamStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{team.name} Player Statistics</CardTitle>
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
            {team.playerstats.stat.map((player) => (
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
  );
};