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
    if (!game.dateTime) return "";
    try {
      const date = parseISO(game.dateTime);
      return format(date, "HH:mm");
    } catch {
      return game.time || "";
    }
  };

  const getGameDate = () => {
    if (!game.dateTime) return "";
    try {
      const date = parseISO(game.dateTime);
      return format(date, "MMM d, yyyy");
    } catch {
      return "";
    }
  };

  return (
    <Link to={`/game/${game.gameCode}`}>
      <Card className={`
        overflow-hidden transition-all duration-200 hover:shadow-lg
        ${isLive ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-200 dark:border-green-800" : ""}
        ${isCompleted ? "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/50 dark:to-slate-950/50" : ""}
      `}>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <GameStatus status={game.status} time={game.time || getGameTime()} />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {getGameDate()}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="text-right space-y-1">
              <div className="font-semibold truncate">{game.homeTeam.name}</div>
              <div className={`text-2xl font-bold ${isLive ? "text-green-600 dark:text-green-400" : ""}`}>
                {game.homeScore || "-"}
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              vs
            </div>

            <div className="text-left space-y-1">
              <div className="font-semibold truncate">{game.awayTeam.name}</div>
              <div className={`text-2xl font-bold ${isLive ? "text-green-600 dark:text-green-400" : ""}`}>
                {game.awayScore || "-"}
              </div>
            </div>
          </div>

          <div className="mt-2">
            <GameLocation
              stadium={game.stadium}
              stadiumname={game.stadiumname}
              attendance={game.attendance}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
