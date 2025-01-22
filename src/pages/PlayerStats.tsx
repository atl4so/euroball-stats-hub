import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlayerStatsHeader from "@/components/player-stats/PlayerStatsHeader";
import PlayerStatsRow from "@/components/player-stats/PlayerStatsRow";

const PlayerStats = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("points");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
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

  const paginatedStats = stats?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = stats ? Math.ceil(stats.length / pageSize) : 0;

  const breadcrumbItems = [
    { label: "Stats", path: "/player-stats" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageBreadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mb-6">Player Statistics</h1>

      <Card>
        <CardHeader>
          <CardTitle>Player Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="rounded-md border h-[600px]">
            <Table>
              <PlayerStatsHeader
                sortColumn={sortColumn}
                sortOrder={sortDirection}
                onSort={handleSort}
              />
              <TableBody>
                {paginatedStats?.map((stat) => (
                  <PlayerStatsRow key={`${stat.player_name}-${stat.team_code}`} stat={stat} />
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
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerStats;