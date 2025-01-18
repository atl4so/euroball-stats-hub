import { Game } from "@/types/euroleague";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface GameListProps {
  games: Game[];
  isLoading: boolean;
  currentRound: number;
  onPageChange: (page: number) => void;
}

export const GameList = ({ games, isLoading, currentRound, onPageChange }: GameListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
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

  return (
    <div className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3 p-4"
      >
        {games.map((game) => (
          <motion.div
            key={game.gamecode}
            variants={item}
            className="game-list-item bg-card rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {format(new Date(game.date), "MMM d, yyyy")} • {game.time}
              </div>
              <div className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">
                Round {game.gameday}
              </div>
            </div>
            
            <div className="mt-2 grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
              <div className="text-right">
                <div className="font-medium">{game.hometeam}</div>
                <div className={`score ${game.homescore > game.awayscore ? "winner" : ""}`}>
                  {game.homescore}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">vs</div>
              
              <div>
                <div className="font-medium">{game.awayteam}</div>
                <div className={`score ${game.awayscore > game.homescore ? "winner" : ""}`}>
                  {game.awayscore}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {games.length > 0 && (
        <Pagination className="py-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentRound > 1) onPageChange(currentRound - 1);
                }}
                className={currentRound <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: 34 }, (_, i) => i + 1).map((round) => (
              <PaginationItem key={round} className="hidden md:inline-block">
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(round);
                  }}
                  isActive={currentRound === round}
                >
                  {round}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentRound < 34) onPageChange(currentRound + 1);
                }}
                className={currentRound >= 34 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};