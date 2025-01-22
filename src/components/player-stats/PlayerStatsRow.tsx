import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Database } from "@/integrations/supabase/types";

type PlayerStats = Database['public']['Tables']['player_stats']['Row'];

interface PlayerStatsRowProps {
  stat: PlayerStats;
}

const formatNumber = (value: number | null) => {
  if (value === null) return "-";
  return value.toFixed(1);
};

const formatPercentage = (value: number | null) => {
  if (value === null) return "-";
  return `${(value * 100).toFixed(1)}%`;
};

const PlayerStatsRow: React.FC<PlayerStatsRowProps> = ({ stat }) => {
  return (
    <TableRow key={`${stat.player_name}-${stat.team_code}`}>
      <TableCell className="font-medium sticky left-0 bg-background">
        {stat.player_name}
      </TableCell>
      <TableCell>{stat.team_code}</TableCell>
      <TableCell>{stat.season_code}</TableCell>
      <TableCell className="text-right">{stat.games_played}</TableCell>
      <TableCell className="text-right">{stat.games_started}</TableCell>
      <TableCell className="text-right">{formatNumber(stat.minutes)}</TableCell>
      <TableCell className="text-right">{formatNumber(stat.points)}</TableCell>
      <TableCell className="text-right">{stat.two_points_made}</TableCell>
      <TableCell className="text-right">{stat.two_points_attempted}</TableCell>
      <TableCell className="text-right">{formatPercentage(stat.two_points_percentage)}</TableCell>
      <TableCell className="text-right">{stat.three_points_made}</TableCell>
      <TableCell className="text-right">{stat.three_points_attempted}</TableCell>
      <TableCell className="text-right">{formatPercentage(stat.three_points_percentage)}</TableCell>
      <TableCell className="text-right">{stat.free_throws_made}</TableCell>
      <TableCell className="text-right">{stat.free_throws_attempted}</TableCell>
      <TableCell className="text-right">{formatPercentage(stat.free_throws_percentage)}</TableCell>
      <TableCell className="text-right">{stat.offensive_rebounds}</TableCell>
      <TableCell className="text-right">{stat.defensive_rebounds}</TableCell>
      <TableCell className="text-right">{stat.rebounds}</TableCell>
      <TableCell className="text-right">{stat.assists}</TableCell>
      <TableCell className="text-right">{stat.steals}</TableCell>
      <TableCell className="text-right">{stat.turnovers}</TableCell>
      <TableCell className="text-right">{stat.blocks}</TableCell>
      <TableCell className="text-right">{stat.blocks_against}</TableCell>
      <TableCell className="text-right">{stat.fouls_committed}</TableCell>
      <TableCell className="text-right">{stat.fouls_drawn}</TableCell>
      <TableCell className="text-right">{stat.pir}</TableCell>
    </TableRow>
  );
};

export default PlayerStatsRow;