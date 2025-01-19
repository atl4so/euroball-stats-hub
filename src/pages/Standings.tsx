import { useQuery } from "@tanstack/react-query";
import { fetchStandings, fetchTeams } from "@/services/euroleagueApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { LastGamesIndicator } from "@/components/LastGamesIndicator";
import { Team } from "@/types/team";

const getPositionStyle = (ranking: number) => {
  if (ranking <= 6) return "bg-blue-100 dark:bg-blue-900/50";
  if (ranking <= 10) return "bg-cyan-100 dark:bg-cyan-900/50";
  return "";
};

const getLastFiveGames = (team: Team) => {
  if (!team.games?.phase?.game) return [];
  
  return team.games.phase.game
    .filter(game => game.played)
    .sort((a, b) => new Date(b.gamedate).getTime() - new Date(a.gamedate).getTime())
    .slice(0, 5)
    .reverse() // Reverse the array so most recent game is last (will appear on the right)
    .map(game => game.win === "1" ? "W" : "L") as ("W" | "L")[];
};

const Standings = () => {
  const { data: standings, isLoading: standingsLoading, error: standingsError } = useQuery({
    queryKey: ["standings"],
    queryFn: () => fetchStandings(),
  });

  const { data: teamsData, isLoading: teamsLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: () => fetchTeams("E2024"),
  });

  useEffect(() => {
    document.title = "Standings - Euroball Stats Hub";
  }, []);

  const breadcrumbItems = [
    { label: "Standings", path: "/standings" },
  ];

  if (standingsLoading || teamsLoading) return <div className="p-4">Loading...</div>;
  if (standingsError) return <div className="p-4">Error loading standings</div>;
  if (!standings || !teamsData) return <div className="p-4">No standings data available</div>;

  return (
    <div>
      <PageBreadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {standings.standings.group.name}
          </h1>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12 font-bold">#</TableHead>
                  <TableHead className="font-bold">Team</TableHead>
                  <TableHead className="text-center font-bold">GP</TableHead>
                  <TableHead className="text-center font-bold">W</TableHead>
                  <TableHead className="text-center font-bold">L</TableHead>
                  <TableHead className="text-center hidden md:table-cell font-bold">PF</TableHead>
                  <TableHead className="text-center hidden md:table-cell font-bold">PA</TableHead>
                  <TableHead className="text-center font-bold">+/-</TableHead>
                  <TableHead className="text-center font-bold">Last 5</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings.standings.group.team.map((team) => {
                  const teamDetails = teamsData.clubs.club.find(
                    (t) => t.code.toLowerCase() === team.code.toLowerCase()
                  );
                  const lastGames = teamDetails ? getLastFiveGames(teamDetails) : [];

                  return (
                    <TableRow
                      key={team.code}
                      className={`
                        ${getPositionStyle(team.ranking)}
                        hover:brightness-95 dark:hover:brightness-110
                      `}
                    >
                      <TableCell className="font-medium">
                        {team.ranking}
                      </TableCell>
                      <TableCell>
                        <Link 
                          to={`/team/${team.code.toLowerCase()}`}
                          className="flex items-center hover:text-primary transition-colors"
                        >
                          <span className="font-medium">{team.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center">{team.totalgames}</TableCell>
                      <TableCell className="text-center font-semibold text-primary">
                        {team.wins}
                      </TableCell>
                      <TableCell className="text-center text-destructive">
                        {team.losses}
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        {team.ptsfavour}
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        {team.ptsagainst}
                      </TableCell>
                      <TableCell
                        className={`text-center font-medium ${
                          team.difference > 0
                            ? "text-primary"
                            : team.difference < 0
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {team.difference > 0 ? "+" : ""}
                        {team.difference}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-center">
                          {lastGames.map((result, index) => (
                            <LastGamesIndicator key={index} result={result} />
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-100 dark:bg-blue-900/50"></div>
            <span>Euroleague Quarter-finals (Top 6)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-cyan-100 dark:bg-cyan-900/50"></div>
            <span>Euroleague Play-In (7-10)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-medium text-white">W</div>
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs font-medium text-white">L</div>
            </div>
            <span>Win/Loss in last 5 games</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Standings;
