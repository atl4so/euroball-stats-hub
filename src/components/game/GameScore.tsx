import { Card, CardContent } from "@/components/ui/card";
import { Game } from "@/types/euroleague";
import { cn } from "@/lib/utils";

interface GameScoreProps {
  game: Game;
}

export const GameScore = ({ game }: GameScoreProps) => {
  const isLive = game.live === "1";
  const isFinal = !isLive && game.score !== "";
  
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {isLive && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                <span className="w-2 h-2 mr-1.5 bg-red-500 rounded-full animate-pulse" />
                LIVE
              </span>
            )}
            {isFinal && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                FINAL
              </span>
            )}
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Round {game.gameday}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {game.hometeam}
              </div>
              <div className={cn(
                "text-3xl font-bold tabular-nums",
                game.homescore > game.awayscore 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-400"
              )}>
                {game.homescore || "0"}
              </div>
            </div>
            <div className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              vs
            </div>
            <div className="flex-1 text-right">
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {game.awayteam}
              </div>
              <div className={cn(
                "text-3xl font-bold tabular-nums",
                game.awayscore > game.homescore 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-gray-600 dark:text-gray-400"
              )}>
                {game.awayscore || "0"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};