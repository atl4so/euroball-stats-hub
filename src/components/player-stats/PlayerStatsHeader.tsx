import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PlayerStatsHeaderProps {
  sortColumn: string;
  sortOrder: "asc" | "desc";
  onSort: (column: string) => void;
}

const PlayerStatsHeader: React.FC<PlayerStatsHeaderProps> = ({ sortColumn, sortOrder, onSort }) => {
  const getSortIndicator = (column: string) => {
    if (sortColumn !== column) return "↕";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead 
          className="sticky left-0 bg-background cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("player_name")}
        >
          Player {getSortIndicator("player_name")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("team_code")}
        >
          Team {getSortIndicator("team_code")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("season_code")}
        >
          Season {getSortIndicator("season_code")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("games_played")}
        >
          GP {getSortIndicator("games_played")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("games_started")}
        >
          GS {getSortIndicator("games_started")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("minutes")}
        >
          MIN {getSortIndicator("minutes")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("points")}
        >
          PTS {getSortIndicator("points")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("two_points_made")}
        >
          2PM {getSortIndicator("two_points_made")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("two_points_attempted")}
        >
          2PA {getSortIndicator("two_points_attempted")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("two_points_percentage")}
        >
          2P% {getSortIndicator("two_points_percentage")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("three_points_made")}
        >
          3PM {getSortIndicator("three_points_made")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("three_points_attempted")}
        >
          3PA {getSortIndicator("three_points_attempted")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("three_points_percentage")}
        >
          3P% {getSortIndicator("three_points_percentage")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("free_throws_made")}
        >
          FTM {getSortIndicator("free_throws_made")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("free_throws_attempted")}
        >
          FTA {getSortIndicator("free_throws_attempted")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("free_throws_percentage")}
        >
          FT% {getSortIndicator("free_throws_percentage")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("offensive_rebounds")}
        >
          OREB {getSortIndicator("offensive_rebounds")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("defensive_rebounds")}
        >
          DREB {getSortIndicator("defensive_rebounds")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("rebounds")}
        >
          REB {getSortIndicator("rebounds")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("assists")}
        >
          AST {getSortIndicator("assists")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("steals")}
        >
          STL {getSortIndicator("steals")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("turnovers")}
        >
          TOV {getSortIndicator("turnovers")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("blocks")}
        >
          BLK {getSortIndicator("blocks")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("blocks_against")}
        >
          BLKA {getSortIndicator("blocks_against")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("fouls_committed")}
        >
          PF {getSortIndicator("fouls_committed")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("fouls_drawn")}
        >
          FD {getSortIndicator("fouls_drawn")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort("pir")}
        >
          PIR {getSortIndicator("pir")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default PlayerStatsHeader;