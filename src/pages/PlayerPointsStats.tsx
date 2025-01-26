import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BackButton } from "@/components/BackButton";

const PlayerPointsStats = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("player_name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const pageSize = 10;

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["player_points", sortColumn, sortDirection],
    queryFn: async () => {
      console.log("Fetching player_points data...");
      const { data, error } = await supabase
        .from("player_points")
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
    { label: "Points Stats", path: "/player-points-stats" },
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
            Error loading player points statistics. Please try again later.
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
            No player points statistics available at the moment.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BackButton />
      <h1 className="text-2xl font-bold mb-6">Player Points Statistics</h1>

      <Card>
        <CardHeader>
          <CardTitle>Points Stats</CardTitle>
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
                    <th onClick={() => handleSort("games_started")}>GS {sortColumn === "games_started" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("two_point_attempts_share")}>2PA% {sortColumn === "two_point_attempts_share" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("three_point_attempts_share")}>3PA% {sortColumn === "three_point_attempts_share" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("free_throw_attempts_share")}>FTA% {sortColumn === "free_throw_attempts_share" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("two_points_made_share")}>2PM% {sortColumn === "two_points_made_share" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("three_points_made_share")}>3PM% {sortColumn === "three_points_made_share" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("free_throws_made_share")}>FTM% {sortColumn === "free_throws_made_share" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("points_from_two_percentage")}>PTS from 2 {sortColumn === "points_from_two_percentage" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("points_from_three_percentage")}>PTS from 3 {sortColumn === "points_from_three_percentage" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                    <th onClick={() => handleSort("points_from_ft_percentage")}>PTS from FT {sortColumn === "points_from_ft_percentage" ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}</th>
                  </tr>
                </thead>
                <TableBody>
                  {paginatedStats?.map((stat) => (
                    <tr key={`${stat.player_name}-${stat.team_code}`}>
                      <td className="sticky left-0 bg-background">{stat.player_name}</td>
                      <td>{stat.team_code}</td>
                      <td>{stat.season_code}</td>
                      <td>{stat.games_played}</td>
                      <td>{stat.games_started}</td>
                      <td>{stat.two_point_attempts_share?.toFixed(1)}%</td>
                      <td>{stat.three_point_attempts_share?.toFixed(1)}%</td>
                      <td>{stat.free_throw_attempts_share?.toFixed(1)}%</td>
                      <td>{stat.two_points_made_share?.toFixed(1)}%</td>
                      <td>{stat.three_points_made_share?.toFixed(1)}%</td>
                      <td>{stat.free_throws_made_share?.toFixed(1)}%</td>
                      <td>{stat.points_from_two_percentage?.toFixed(1)}%</td>
                      <td>{stat.points_from_three_percentage?.toFixed(1)}%</td>
                      <td>{stat.points_from_ft_percentage?.toFixed(1)}%</td>
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

export default PlayerPointsStats;