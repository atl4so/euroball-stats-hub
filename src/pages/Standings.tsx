import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchBasicStandings, fetchStandings, fetchTeams, fetchClubV3 } from "@/services/euroleagueApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Team } from "@/types/team";
import { useEffect } from "react";
import { LastGamesIndicator } from "@/components/LastGamesIndicator";

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
    .reverse()
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

  const { data: extraStats } = useQuery({
    queryKey: ["basicStandings"],
    queryFn: () => fetchBasicStandings(),
  });

  const clubQueries = useQueries({
    queries: (standings?.standings.group.team || []).map((team) => ({
      queryKey: ["club", team.code],
      queryFn: () => fetchClubV3(team.code),
      staleTime: Infinity,
    })),
  });

  const getClubLogo = (code: string) => {
    const clubData = clubQueries.find(
      (q) => q.data?.code === code
    )?.data;
    return clubData?.images?.crest;
  };

  useEffect(() => {
    document.title = "Standings - Euroball Stats Hub";
  }, []);

  const breadcrumbItems = [
    { label: "Standings", path: "/standings" },
  ];

  if (standingsLoading || teamsLoading || clubQueries.some((q) => q.isLoading)) {
    return (
      <div className="container mx-auto py-6">
        <PageBreadcrumb items={breadcrumbItems} />
        <Card>
          <CardHeader>
            <CardTitle>Standings</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[400px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  const extraTeamStats = extraStats?.teams.find(
                    (t) => t.club.code === team.code
                  );

                  return (
                    <TableRow
                      key={team.code}
                      className={`
                        ${getPositionStyle(team.ranking)}
                        hover:brightness-95 dark:hover:brightness-110
                      `}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1">
                          {team.ranking}
                          {extraTeamStats?.positionChange === "Up" && (
                            <span className="text-green-500 text-lg">↑</span>
                          )}
                          {extraTeamStats?.positionChange === "Down" && (
                            <span className="text-red-500 text-lg">↓</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link 
                          to={`/team/${team.code.toLowerCase()}`}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <img
                            src={getClubLogo(team.code)}
                            alt={team.name}
                            className="h-6 w-6"
                          />
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
                        {Number(extraTeamStats?.pointsFor || team.ptsfavour).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        {Number(extraTeamStats?.pointsAgainst || team.ptsagainst).toLocaleString()}
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
                        {extraTeamStats?.pointsDifference || (team.difference > 0 ? "+" : "") + team.difference}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 justify-center">
                          {lastGames.map((result, index) => (
                            <div
                              key={index}
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                                result === "W"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {result}
                            </div>
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
