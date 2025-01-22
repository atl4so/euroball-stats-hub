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
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

const TeamStats = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'points', direction: 'desc' });

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

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedStats = stats ? [...stats].sort((a, b) => {
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  }) : [];

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

  const SortableHeader = ({ label, field }: { label: string; field: string }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="h-8 flex items-center gap-1"
    >
      {label}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Team Statistics</h1>
      <Card>
        <ScrollArea className="h-[600px]">
          <div className="overflow-x-auto">
            <div style={{ minWidth: "1000px" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead><SortableHeader label="Team" field="team_code" /></TableHead>
                    <TableHead className="text-right"><SortableHeader label="Games" field="games_played" /></TableHead>
                    <TableHead className="text-right"><SortableHeader label="Points" field="points" /></TableHead>
                    <TableHead className="text-right"><SortableHeader label="2PT%" field="two_points_percentage" /></TableHead>
                    <TableHead className="text-right"><SortableHeader label="3PT%" field="three_points_percentage" /></TableHead>
                    <TableHead className="text-right"><SortableHeader label="FT%" field="free_throws_percentage" /></TableHead>
                    <TableHead className="text-right"><SortableHeader label="Rebounds" field="total_rebounds" /></TableHead>
                    <TableHead className="text-right"><SortableHeader label="Assists" field="assists" /></TableHead>
                    <TableHead className="text-right"><SortableHeader label="Steals" field="steals" /></TableHead>
                    <TableHead className="text-right"><SortableHeader label="Blocks" field="blocks" /></TableHead>
                    <TableHead className="text-right"><SortableHeader label="PIR" field="pir" /></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedStats?.map((stat) => (
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