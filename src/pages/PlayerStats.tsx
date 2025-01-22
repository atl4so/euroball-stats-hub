import React from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";

const PlayerStats = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortColumn, setSortColumn] = React.useState("points");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc");
  const pageSize = 10;

  const { data: stats, isLoading } = useQuery({
    queryKey: ["player_stats", sortColumn, sortDirection],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("player_stats")
        .select("*")
        .order(sortColumn, { ascending: sortDirection === "asc" });

      if (error) throw error;
      return data;
    },
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const formatNumber = (value: number | null) => {
    if (value === null) return "-";
    return value.toFixed(1);
  };

  const formatPercentage = (value: number | null) => {
    if (value === null) return "-";
    return `${(value * 100).toFixed(1)}%`;
  };

  const paginatedStats = stats?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = stats ? Math.ceil(stats.length / pageSize) : 0;

  const breadcrumbItems = [
    { label: "Stats", path: "/player-stats" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <PageBreadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mb-6">Player Statistics</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ScrollArea className="rounded-md border h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("player_name")}
                  >
                    Player
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("team_code")}
                  >
                    Team
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("games_played")}
                  >
                    GP
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("minutes")}
                  >
                    MIN
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("points")}
                  >
                    PTS
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("two_points_percentage")}
                  >
                    2P%
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("three_points_percentage")}
                  >
                    3P%
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("free_throws_percentage")}
                  >
                    FT%
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("rebounds")}
                  >
                    REB
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("assists")}
                  >
                    AST
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("steals")}
                  >
                    STL
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("blocks")}
                  >
                    BLK
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("turnovers")}
                  >
                    TOV
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("pir")}
                  >
                    PIR
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStats?.map((stat) => (
                  <TableRow key={`${stat.player_name}-${stat.team_code}`}>
                    <TableCell className="font-medium">
                      {stat.player_name}
                    </TableCell>
                    <TableCell>{stat.team_code}</TableCell>
                    <TableCell className="text-right">{stat.games_played}</TableCell>
                    <TableCell className="text-right">{formatNumber(stat.minutes)}</TableCell>
                    <TableCell className="text-right">{formatNumber(stat.points)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(stat.two_points_percentage)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(stat.three_points_percentage)}</TableCell>
                    <TableCell className="text-right">{formatPercentage(stat.free_throws_percentage)}</TableCell>
                    <TableCell className="text-right">{stat.rebounds}</TableCell>
                    <TableCell className="text-right">{stat.assists}</TableCell>
                    <TableCell className="text-right">{stat.steals}</TableCell>
                    <TableCell className="text-right">{stat.blocks}</TableCell>
                    <TableCell className="text-right">{stat.turnovers}</TableCell>
                    <TableCell className="text-right">{stat.pir}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <span className="px-4">
                  Page {currentPage} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default PlayerStats;