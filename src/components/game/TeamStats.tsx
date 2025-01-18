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
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{team.name} Player Statistics</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium whitespace-nowrap">Player</TableHead>
                <TableHead className="text-right">MIN</TableHead>
                <TableHead className="text-right">PTS</TableHead>
                <TableHead className="text-right whitespace-nowrap">2PM-A</TableHead>
                <TableHead className="text-right whitespace-nowrap">3PM-A</TableHead>
                <TableHead className="text-right whitespace-nowrap">FTM-A</TableHead>
                <TableHead className="text-right">REB</TableHead>
                <TableHead className="text-right">AST</TableHead>
                <TableHead className="text-right">STL</TableHead>
                <TableHead className="text-right">BLK</TableHead>
                <TableHead className="text-right">TO</TableHead>
                <TableHead className="text-right">PF</TableHead>
                <TableHead className="text-right">PIR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.playerstats.stat.map((player) => (
                <TableRow key={player.PlayerCode}>
                  <TableCell className="font-medium whitespace-nowrap">
                    <Link
                      to={`/player/${player.PlayerCode}`}
                      className="hover:text-primary hover:underline"
                    >
                      {player.PlayerName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">{player.TimePlayed}</TableCell>
                  <TableCell className="text-right">{player.Score}</TableCell>
                  <TableCell className="text-right">{`${player.FieldGoalsMade2}-${player.FieldGoalsAttempted2}`}</TableCell>
                  <TableCell className="text-right">{`${player.FieldGoalsMade3}-${player.FieldGoalsAttempted3}`}</TableCell>
                  <TableCell className="text-right">{`${player.FreeThrowsMade}-${player.FreeThrowsAttempted}`}</TableCell>
                  <TableCell className="text-right">{player.TotalRebounds}</TableCell>
                  <TableCell className="text-right">{player.Assistances}</TableCell>
                  <TableCell className="text-right">{player.Steals}</TableCell>
                  <TableCell className="text-right">{player.BlocksFavour}</TableCell>
                  <TableCell className="text-right">{player.Turnovers}</TableCell>
                  <TableCell className="text-right">{player.FoulsCommited}</TableCell>
                  <TableCell className="text-right">{player.Valuation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};