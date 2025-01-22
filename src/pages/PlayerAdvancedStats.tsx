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
import { Alert, AlertDescription } from "@/components/ui/alert";

const PlayerAdvancedStats = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("player_name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const pageSize = 10;

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["player_advanced", sortColumn, sortDirection],
    queryFn: async () => {
      console.log("Fetching player_advanced data...");
      const { data, error } = await supabase
        .from("player_advanced")
        .select("*")
        .order(sortColumn, { ascending: sortDirection === "asc" });

      if (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
      
      console.log("Fetched data:", data);
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
    { label: "Advanced Stats", path: "/player-advanced-stats" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Alert variant="destructive">
          <AlertDescription>
            Error loading player advanced statistics. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!stats || stats.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Alert>
          <AlertDescription>
            No player advanced statistics available at the moment.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageBreadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold mb-6">Player Advanced Statistics</h1>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-auto">
            <div className="min-w-[1500px]">
              <Table>
                <thead>
                  <tr>
                    <th 
                      className="sticky left-0 bg-background cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("player_name")}
                    >
                      Player {sortColumn === "player_name" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                    </th>
                    <th onClick={() => handleSort("team_code")}>Team {sortColumn === "team_code" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("season_code")}>Season {sortColumn === "season_code" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("games_played")}>GP {sortColumn === "games_played" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("minutes")}>MIN {sortColumn === "minutes" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("effective_fg_percentage")}>eFG% {sortColumn === "effective_fg_percentage" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("true_shooting_percentage")}>TS% {sortColumn === "true_shooting_percentage" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("offensive_rebound_percentage")}>ORB% {sortColumn === "offensive_rebound_percentage" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("defensive_rebound_percentage")}>DRB% {sortColumn === "defensive_rebound_percentage" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("total_rebound_percentage")}>TRB% {sortColumn === "total_rebound_percentage" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("assist_to_turnover_ratio")}>AST/TO {sortColumn === "assist_to_turnover_ratio" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("assist_ratio")}>AST% {sortColumn === "assist_ratio" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("turnover_ratio")}>TOV% {sortColumn === "turnover_ratio" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("two_point_attempt_ratio")}>2PA% {sortColumn === "two_point_attempt_ratio" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("three_point_attempt_ratio")}>3PA% {sortColumn === "three_point_attempt_ratio" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("free_throw_rate")}>FTR {sortColumn === "free_throw_rate" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("possessions")}>POSS {sortColumn === "possessions" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                  </tr>
                </thead>
                <TableBody>
                  {paginatedStats?.map((stat) => (
                    <tr key={`${stat.player_name}-${stat.team_code}`}>
                      <td className="sticky left-0 bg-background">{stat.player_name}</td>
                      <td>{stat.team_code}</td>
                      <td>{stat.season_code}</td>
                      <td>{stat.games_played}</td>
                      <td>{stat.minutes?.toFixed(1)}</td>
                      <td>{stat.effective_fg_percentage?.toFixed(1)}%</td>
                      <td>{stat.true_shooting_percentage?.toFixed(1)}%</td>
                      <td>{stat.offensive_rebound_percentage?.toFixed(1)}%</td>
                      <td>{stat.defensive_rebound_percentage?.toFixed(1)}%</td>
                      <td>{stat.total_rebound_percentage?.toFixed(1)}%</td>
                      <td>{stat.assist_to_turnover_ratio?.toFixed(2)}</td>
                      <td>{stat.assist_ratio?.toFixed(1)}%</td>
                      <td>{stat.turnover_ratio?.toFixed(1)}%</td>
                      <td>{stat.two_point_attempt_ratio?.toFixed(1)}%</td>
                      <td>{stat.three_point_attempt_ratio?.toFixed(1)}%</td>
                      <td>{stat.free_throw_rate?.toFixed(2)}</td>
                      <td>{stat.possessions}</td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

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

export default PlayerAdvancedStats;