import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamStats as TeamStatsType } from "@/types/euroleague";
import { cn } from "@/lib/utils";

interface TeamStatsProps {
  team: TeamStatsType;
}

export const TeamStats = ({ team }: TeamStatsProps) => {
  return (
    <Card className="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-950 dark:to-sky-950 border-0 shadow-lg overflow-hidden">
      <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-white/5">
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
          {team.name} Box Score
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                <th className="text-left py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">Player</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">MIN</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">PTS</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">2P</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">3P</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">FT</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">REB</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">AST</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">STL</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">BLK</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">TO</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">PF</th>
                <th className="text-center py-2 px-2 sm:px-4 text-xs font-medium text-gray-500 dark:text-gray-400">PIR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {team.playerstats.stat.map((player) => (
                <tr 
                  key={player.PlayerCode}
                  className={cn(
                    "hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors",
                    player.StartFive ? "bg-sky-50/50 dark:bg-sky-900/20" : ""
                  )}
                >
                  <td className="py-2 px-2 sm:px-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/player/${player.PlayerCode}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                      >
                        {player.PlayerName}
                      </Link>
                      {player.StartFive && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300">
                          Starter
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">{player.TimePlayed}</td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm font-medium text-gray-900 dark:text-gray-100 tabular-nums">{player.Score}</td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">{`${player.FieldGoalsMade2}-${player.FieldGoalsAttempted2}`}</td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">{`${player.FieldGoalsMade3}-${player.FieldGoalsAttempted3}`}</td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">{`${player.FreeThrowsMade}-${player.FreeThrowsAttempted}`}</td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">{player.TotalRebounds}</td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">{player.Assistances}</td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">{player.Steals}</td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">{player.BlocksFavour}</td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">{player.Turnovers}</td>
                  <td className="text-center py-2 px-2 sm:px-4 text-sm text-gray-600 dark:text-gray-300 tabular-nums">{player.FoulsCommited}</td>
                  <td className={cn(
                    "text-center py-2 px-2 sm:px-4 text-sm tabular-nums font-medium",
                    player.Valuation > 0 ? "text-green-600 dark:text-green-400" :
                    player.Valuation < 0 ? "text-red-600 dark:text-red-400" :
                    "text-gray-600 dark:text-gray-300"
                  )}>
                    {player.Valuation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};