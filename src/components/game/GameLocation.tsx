import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";

export interface GameLocationProps {
  stadiumname: string;
  attendance: string;
}

export const GameLocation = ({ stadiumname, attendance }: GameLocationProps) => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
            <div>
              <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
                {stadiumname || "Not available"}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Location
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 mt-0.5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
            <div>
              <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
                {attendance && attendance !== "0" ? parseInt(attendance).toLocaleString() : "Not available"}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Attendance
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};