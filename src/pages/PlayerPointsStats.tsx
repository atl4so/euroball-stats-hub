import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
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
            <CardTitle>Top Players Statistics</CardTitle>
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
                      onClick={() => handleSort("games_played")}
                    >
                      Games {getSortIndicator("games_played")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("points_from_two_percentage")}
                    >
                      2PT% {getSortIndicator("points_from_two_percentage")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("points_from_three_percentage")}
                    >
                      3PT% {getSortIndicator("points_from_three_percentage")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort("points_from_ft_percentage")}
                    >
                      FT% {getSortIndicator("points_from_ft_percentage")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playerPoints?.map((player) => (
                    <TableRow key={`${player.player_name}-${player.team_code}`}>
                      <TableCell className="font-medium">{player.player_name}</TableCell>
                      <TableCell>{player.team_code}</TableCell>
                      <TableCell>{player.games_played}</TableCell>
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
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
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
                            <PaginationLink disabled>...</PaginationLink>
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
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    />
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