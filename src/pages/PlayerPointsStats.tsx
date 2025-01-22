import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const formatPercentage = (value: number | null) => {
  if (value === null) return "0%";
  return `${(value * 100).toFixed(1)}%`;
};

const PlayerPointsStats = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("points_from_two_percentage");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const pageSize = 10;

  const { data: playerPoints, isLoading } = useQuery({
    queryKey: ["player-points", sortColumn, sortOrder, currentPage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("player_points")
        .select("*")
        .order(sortColumn, { ascending: sortOrder === "asc" })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: totalCount } = useQuery({
    queryKey: ["player-points-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("player_points")
        .select("*", { count: "exact", head: true });
      
      if (error) throw error;
      return count || 0;
    },
  });

  const totalPages = Math.ceil((totalCount || 0) / pageSize);

  const breadcrumbItems = [
    { label: "Games", path: "/" },
    { label: "Player Points Stats", path: "/player-points-stats" },
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("desc");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getSortIndicator = (column: string) => {
    if (sortColumn !== column) return "↕";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageBreadcrumb items={breadcrumbItems} />
      
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Player Points Statistics</h1>

        <Card>
          <CardHeader>
            <CardTitle>Player Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("player_name")}
                    >
                      Player {getSortIndicator("player_name")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("team_code")}
                    >
                      Team {getSortIndicator("team_code")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("season_code")}
                    >
                      Season {getSortIndicator("season_code")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("games_played")}
                    >
                      Games Played {getSortIndicator("games_played")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("games_started")}
                    >
                      Games Started {getSortIndicator("games_started")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("two_point_attempts_share")}
                    >
                      2PT Attempts Share {getSortIndicator("two_point_attempts_share")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("three_point_attempts_share")}
                    >
                      3PT Attempts Share {getSortIndicator("three_point_attempts_share")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("free_throw_attempts_share")}
                    >
                      FT Attempts Share {getSortIndicator("free_throw_attempts_share")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("two_points_made_share")}
                    >
                      2PT Made Share {getSortIndicator("two_points_made_share")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("three_points_made_share")}
                    >
                      3PT Made Share {getSortIndicator("three_points_made_share")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("free_throws_made_share")}
                    >
                      FT Made Share {getSortIndicator("free_throws_made_share")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("points_from_two_percentage")}
                    >
                      Points from 2PT {getSortIndicator("points_from_two_percentage")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("points_from_three_percentage")}
                    >
                      Points from 3PT {getSortIndicator("points_from_three_percentage")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("points_from_ft_percentage")}
                    >
                      Points from FT {getSortIndicator("points_from_ft_percentage")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playerPoints?.map((player) => (
                    <TableRow key={`${player.player_name}-${player.team_code}`}>
                      <TableCell className="font-medium">{player.player_name}</TableCell>
                      <TableCell>{player.team_code}</TableCell>
                      <TableCell>{player.season_code}</TableCell>
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

            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(currentPage - page) <= 2
                    )
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <PaginationItem>
                            <PaginationLink>...</PaginationLink>
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      </React.Fragment>
                    ))}
                  
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlayerPointsStats;