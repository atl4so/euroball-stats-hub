import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Game } from "@/types/game";
import { GameStatus } from "@/components/game/GameStatus";
import { GameLocation } from "@/components/game/GameLocation";
import { format, parseISO } from "date-fns";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const isLive = game.status === "LIVE" || game.status === "HALFTIME";
  const isCompleted = game.status === "FINAL";

  const getGameTime = () => {
    if (!game.time) return "";
    return game.time;
  };

  const getGameDate = () => {
    if (!game.date) return "";
    try {
      const date = new Date(game.date);
      return format(date, "MMM d, yyyy");
    } catch {
      return "";
    }
  };

  return (
    <Link to={`/game/${game.gamecode}`}>
      <Card className={`
        overflow-hidden transition-all duration-200 hover:shadow-lg
        ${isLive ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-200 dark:border-green-800" : ""}
        ${isCompleted ? "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/50 dark:to-slate-950/50" : ""}
      `}>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <GameStatus 
              played={game.played} 
              date={game.date} 
              time={game.time} 
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {getGameDate()}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="text-right space-y-1">
              <div className="font-semibold truncate">{game.hometeam}</div>
              <div className={`text-2xl font-bold ${isLive ? "text-green-600 dark:text-green-400" : ""}`}>
                {game.homescore || "-"}
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              vs
            </div>

            <div className="text-left space-y-1">
              <div className="font-semibold truncate">{game.awayteam}</div>
              <div className={`text-2xl font-bold ${isLive ? "text-green-600 dark:text-green-400" : ""}`}>
                {game.awayscore || "-"}
              </div>
            </div>
          </div>

          <div className="mt-2">
            <GameLocation
              stadiumname={game.stadiumname || ""}
              attendance={game.attendance || ""}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};