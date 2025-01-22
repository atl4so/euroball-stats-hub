import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

export interface GameStatusProps {
  played: boolean;
  date: string;
  time: string;
}

export const GameStatus = ({ played, date, time }: GameStatusProps) => {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 text-green-500 dark:text-green-400 flex-shrink-0" />
            <div>
              <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
                {format(new Date(date), "MMMM d, yyyy")}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Date
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 mt-0.5 text-green-500 dark:text-green-400 flex-shrink-0" />
            <div>
              <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
                {time || "TBD"}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Time (CET)
              </div>
            </div>
          </div>

          {played && (
            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              FINAL
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};