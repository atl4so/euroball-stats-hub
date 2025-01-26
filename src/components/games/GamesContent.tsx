import { Card, CardContent } from "@/components/ui/card";
import { GameList } from "@/components/GameList";
import { ScheduleList } from "@/components/ScheduleList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle } from "lucide-react";
import { RoundSelector } from "./RoundSelector";

interface GamesContentProps {
  resultsRound: number | null;
  scheduleRound: number | null;
  latestRoundData: number | null;
  resultsData: any;
  scheduleData: any;
  isLoadingResults: boolean;
  isLoadingSchedule: boolean;
  handleResultsPageChange: (page: number) => void;
  handleSchedulePageChange: (page: number) => void;
}

export const GamesContent = ({
  resultsRound,
  scheduleRound,
  latestRoundData,
  resultsData,
  scheduleData,
  isLoadingResults,
  isLoadingSchedule,
  handleResultsPageChange,
  handleSchedulePageChange,
}: GamesContentProps) => {
  const FINAL_ROUND = 34;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Games Center
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View all games and results
            </p>
          </div>
        </div>

        <Tabs defaultValue="results" className="w-full space-y-6">
          <TabsList className="w-full sm:w-auto mb-4 grid grid-cols-2 sm:flex sm:inline-flex bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 text-sm sm:text-base"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Results
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 text-sm sm:text-base"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="mt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Round {resultsRound}
                </h3>
                <RoundSelector
                  currentRound={resultsRound || 1}
                  maxRound={latestRoundData || FINAL_ROUND}
                  onRoundChange={handleResultsPageChange}
                />
              </div>
              <Card className="border-gray-200 dark:border-gray-800">
                <CardContent className="p-0">
                  <GameList
                    games={resultsData?.game || []}
                    isLoading={isLoadingResults}
                    currentRound={resultsRound || 1}
                    onPageChange={handleResultsPageChange}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="mt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Round {scheduleRound}
                </h3>
                <RoundSelector
                  currentRound={scheduleRound || 1}
                  maxRound={FINAL_ROUND}
                  minRound={(latestRoundData || 0) + 1}
                  onRoundChange={handleSchedulePageChange}
                />
              </div>
              <Card className="border-gray-200 dark:border-gray-800">
                <CardContent className="p-0">
                  <ScheduleList
                    schedules={scheduleData?.item || []}
                    isLoading={isLoadingSchedule}
                    currentRound={scheduleRound || 1}
                    onPageChange={handleSchedulePageChange}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};