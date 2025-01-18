import { ScheduleItem } from "@/types/euroleague";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ScheduleListProps {
  schedules: ScheduleItem[];
  isLoading: boolean;
  currentRound: number;
  onPageChange: (page: number) => void;
}

const CURRENT_ROUND = 22; // Last completed round
const FINAL_ROUND = 34; // Total rounds in the season

export const ScheduleList = ({ schedules, isLoading, currentRound, onPageChange }: ScheduleListProps) => {
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
        {schedules.map((schedule) => (
          <motion.div
            key={schedule.gamecode}
            variants={item}
            className="game-list-item bg-card rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {format(new Date(schedule.date), "MMM d, yyyy")} • {schedule.startime}
              </div>
              <div className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">
                Round {schedule.gameday}
              </div>
            </div>
            
            <div className="mt-2 grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
              <div className="text-right">
                <div className="font-medium">{schedule.hometeam}</div>
                <div className="text-sm text-muted-foreground">{schedule.homecode}</div>
              </div>
              
              <div className="text-sm text-muted-foreground">vs</div>
              
              <div>
                <div className="font-medium">{schedule.awayteam}</div>
                <div className="text-sm text-muted-foreground">{schedule.awaycode}</div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{schedule.arenaname}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {schedules.length > 0 && (
        <Pagination className="py-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentRound > CURRENT_ROUND + 1) onPageChange(currentRound - 1);
                }}
                className={currentRound <= CURRENT_ROUND + 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: FINAL_ROUND - CURRENT_ROUND }, (_, i) => i + CURRENT_ROUND + 1).map((round) => (
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
                  if (currentRound < FINAL_ROUND) onPageChange(currentRound + 1);
                }}
                className={currentRound >= FINAL_ROUND ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};