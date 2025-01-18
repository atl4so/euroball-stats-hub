import { Link } from "react-router-dom";
import { ScheduleItem } from "@/types/euroleague";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ScheduleListProps {
  schedules: ScheduleItem[];
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

export const ScheduleList = ({ schedules, isLoading, currentRound, onPageChange }: ScheduleListProps) => {
  if (isLoading) {
    return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading schedules...</div>;
  }

  if (!schedules.length) {
    return <div className="p-4 text-center text-gray-500 dark:text-gray-400">No schedules found</div>;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-gray-200 dark:divide-gray-800"
    >
      {schedules.map((schedule) => (
        <Link to={`/game/${schedule.game}`} key={schedule.gamecode} className="block p-3 sm:p-4">
          <motion.div
            variants={item}
            className="block hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <div className="block">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 w-fit">
                  UPCOMING
                </span>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(schedule.date), "MMM d, yyyy")} {schedule.startime}
                </div>
              </div>

              <div className="grid grid-cols-[1fr,auto,1fr] sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <div className="text-right">
                  <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">{schedule.hometeam}</div>
                  <div className="text-xl sm:text-2xl font-bold tabular-nums text-gray-600 dark:text-gray-400">
                    -
                  </div>
                </div>

                <div className="text-center text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 px-1">
                  vs
                </div>

                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">{schedule.awayteam}</div>
                  <div className="text-xl sm:text-2xl font-bold tabular-nums text-gray-600 dark:text-gray-400">
                    -
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{schedule.arenaname}</span>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}

      {schedules.length > 0 && (
        <Pagination className="py-4">
          <PaginationContent className="flex-wrap justify-center gap-1">
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