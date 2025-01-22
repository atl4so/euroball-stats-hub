import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartPie, ChartBar, Loader2 } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";

const formatPercentage = (value: number | null) => {
  if (value === null) return "0%";
  return `${(value * 100).toFixed(1)}%`;
};

const PlayerPointsStats = () => {
  const { data: playerPoints, isLoading } = useQuery({
    queryKey: ["player-points"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("player_points")
        .select("*")
        .order("points_from_two_percentage", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const breadcrumbItems = [
    { label: "Games", path: "/" },
    { label: "Player Points Stats", path: "/player-points-stats" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const chartData = playerPoints?.slice(0, 10).map((player) => ({
    name: player.player_name,
    twoPoints: Number(player.points_from_two_percentage || 0),
    threePoints: Number(player.points_from_three_percentage || 0),
    freeThrows: Number(player.points_from_ft_percentage || 0),
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <PageBreadcrumb items={breadcrumbItems} />
      
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Player Points Statistics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Points Distribution
              </CardTitle>
              <ChartPie className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  className="w-full h-full"
                  config={{
                    twoPoints: { color: "#22c55e" },
                    threePoints: { color: "#3b82f6" },
                    freeThrows: { color: "#f59e0b" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                      <Tooltip 
                        content={<ChartTooltipContent 
                          formatter={(value: number) => [`${(value * 100).toFixed(1)}%`]} 
                        />} 
                      />
                      <Bar dataKey="twoPoints" name="2PT%" stackId="a" fill="var(--color-twoPoints)" />
                      <Bar dataKey="threePoints" name="3PT%" stackId="a" fill="var(--color-threePoints)" />
                      <Bar dataKey="freeThrows" name="FT%" stackId="a" fill="var(--color-freeThrows)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Shot Attempts Distribution
              </CardTitle>
              <ChartBar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  className="w-full h-full"
                  config={{
                    twoPointAttempts: { color: "#22c55e" },
                    threePointAttempts: { color: "#3b82f6" },
                    freeThrowAttempts: { color: "#f59e0b" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={playerPoints?.slice(0, 10).map((player) => ({
                        name: player.player_name,
                        twoPointAttempts: Number(player.two_point_attempts_share || 0),
                        threePointAttempts: Number(player.three_point_attempts_share || 0),
                        freeThrowAttempts: Number(player.free_throw_attempts_share || 0),
                      }))}
                    >
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                      <Tooltip 
                        content={<ChartTooltipContent 
                          formatter={(value: number) => [`${(value * 100).toFixed(1)}%`]} 
                        />} 
                      />
                      <Bar
                        dataKey="twoPointAttempts"
                        name="2PT Attempts"
                        fill="var(--color-twoPointAttempts)"
                      />
                      <Bar
                        dataKey="threePointAttempts"
                        name="3PT Attempts"
                        fill="var(--color-threePointAttempts)"
                      />
                      <Bar
                        dataKey="freeThrowAttempts"
                        name="FT Attempts"
                        fill="var(--color-freeThrowAttempts)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Player Points Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Games Played</TableHead>
                    <TableHead>Games Started</TableHead>
                    <TableHead>2PT Attempts %</TableHead>
                    <TableHead>3PT Attempts %</TableHead>
                    <TableHead>FT Attempts %</TableHead>
                    <TableHead>2PT Made %</TableHead>
                    <TableHead>3PT Made %</TableHead>
                    <TableHead>FT Made %</TableHead>
                    <TableHead>Points from 2PT %</TableHead>
                    <TableHead>Points from 3PT %</TableHead>
                    <TableHead>Points from FT %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playerPoints?.map((player) => (
                    <TableRow key={`${player.player_name}-${player.team_code}`}>
                      <TableCell>{player.player_name}</TableCell>
                      <TableCell>{player.team_code}</TableCell>
                      <TableCell>{player.games_played}</TableCell>
                      <TableCell>{player.games_started}</TableCell>
                      <TableCell>{formatPercentage(player.two_point_attempts_share)}</TableCell>
                      <TableCell>{formatPercentage(player.three_point_attempts_share)}</TableCell>
                      <TableCell>{formatPercentage(player.free_throw_attempts_share)}</TableCell>
                      <TableCell>{formatPercentage(player.two_points_made_share)}</TableCell>
                      <TableCell>{formatPercentage(player.three_points_made_share)}</TableCell>
                      <TableCell>{formatPercentage(player.free_throws_made_share)}</TableCell>
                      <TableCell>{formatPercentage(player.points_from_two_percentage)}</TableCell>
                      <TableCell>{formatPercentage(player.points_from_three_percentage)}</TableCell>
                      <TableCell>{formatPercentage(player.points_from_ft_percentage)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlayerPointsStats;