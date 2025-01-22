import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const TeamStats = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["teamStats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_stats")
        .select("*")
        .order("points", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Card>
          <div className="p-4">
            <Skeleton className="h-[300px]" />
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">Error loading team stats</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Team Statistics</h1>
      <Card>
        <ScrollArea className="h-[600px] rounded-md">
          <div className="w-full overflow-x-scroll">
            <div className="min-w-[1000px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-right">Games</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                    <TableHead className="text-right">2PT%</TableHead>
                    <TableHead className="text-right">3PT%</TableHead>
                    <TableHead className="text-right">FT%</TableHead>
                    <TableHead className="text-right">Rebounds</TableHead>
                    <TableHead className="text-right">Assists</TableHead>
                    <TableHead className="text-right">Steals</TableHead>
                    <TableHead className="text-right">Blocks</TableHead>
                    <TableHead className="text-right">PIR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats?.map((stat) => (
                    <TableRow key={stat.id}>
                      <TableCell className="font-medium">{stat.team_code}</TableCell>
                      <TableCell className="text-right">{stat.games_played}</TableCell>
                      <TableCell className="text-right">{Number(stat.points).toFixed(1)}</TableCell>
                      <TableCell className="text-right">{(Number(stat.two_points_percentage) * 100).toFixed(1)}%</TableCell>
                      <TableCell className="text-right">{(Number(stat.three_points_percentage) * 100).toFixed(1)}%</TableCell>
                      <TableCell className="text-right">{(Number(stat.free_throws_percentage) * 100).toFixed(1)}%</TableCell>
                      <TableCell className="text-right">{Number(stat.total_rebounds).toFixed(1)}</TableCell>
                      <TableCell className="text-right">{Number(stat.assists).toFixed(1)}</TableCell>
                      <TableCell className="text-right">{Number(stat.steals).toFixed(1)}</TableCell>
                      <TableCell className="text-right">{Number(stat.blocks).toFixed(1)}</TableCell>
                      <TableCell className="text-right">{Number(stat.pir).toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default TeamStats;