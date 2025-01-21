import { Link } from "react-router-dom";
import { Game } from "@/types/euroleague";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface GameListProps {
  games: Game[];
  isLoading: boolean;
  currentRound: number;
  onPageChange: (round: number) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const GameList = ({ games, isLoading, currentRound, onPageChange }: GameListProps) => {
  if (isLoading) {
    return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading games...</div>;
  }

  if (!games.length) {
    return <div className="p-4 text-center text-gray-500 dark:text-gray-400">No games found</div>;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-gray-200 dark:divide-gray-800"
    >
      {games.map((game) => {
        const isLive = game.played && game.live === "1";
        const isFinal = game.played && !isLive;
        const isUpcoming = !game.played;

        return (
          <motion.div
            key={game.gamecode}
            variants={item}
            className="block hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <Link to={`/game/${game.gamenumber}`} className="block p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {isLive && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      <span className="w-1.5 h-1.5 mr-1 bg-red-500 rounded-full animate-pulse" />
                      LIVE
                    </span>
                  )}
                  {isFinal && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      FINAL
                    </span>
                  )}
                  {isUpcoming && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      UPCOMING
                    </span>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(game.date), "MMM d, yyyy")} {game.time}
                </div>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr),auto,minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr),auto,minmax(0,1fr)] gap-2 sm:gap-8 items-center">
                <div className="text-right space-y-1">
                  <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">{game.hometeam}</div>
                  <div className={cn(
                    "text-2xl sm:text-3xl font-bold tabular-nums leading-none",
                    isFinal && Number(game.homescore) > Number(game.awayscore)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400"
                  )}>
                    {game.homescore || "-"}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center px-2 sm:px-4">
                  <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    vs
                  </div>
                  {(game.homescore || game.awayscore) && (
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium">
                      {isFinal ? "Final" : "Current"}
                    </div>
                  )}
                </div>

                <div className="text-left space-y-1">
                  <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">{game.awayteam}</div>
                  <div className={cn(
                    "text-2xl sm:text-3xl font-bold tabular-nums leading-none",
                    isFinal && Number(game.awayscore) > Number(game.homescore)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400"
                  )}>
                    {game.awayscore || "-"}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}

      {games.length > 0 && (
        <Pagination className="py-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentRound - 1)}
                className="cursor-pointer"
              />
            </PaginationItem>

            {Array.from({ length: 3 }, (_, i) => currentRound - 1 + i).map((round) => (
              <PaginationItem key={round}>
                <PaginationLink
                  onClick={() => onPageChange(round)}
                  isActive={round === currentRound}
                  className="cursor-pointer"
                >
                  {round}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(currentRound + 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </motion.div>
  );
};
