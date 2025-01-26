import { useQuery } from "@tanstack/react-query";
import { fetchResults, fetchSchedule } from "@/services/euroleagueApi";
import { GameList } from "@/components/GameList";
import { ScheduleList } from "@/components/ScheduleList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MainNavigation } from "@/components/MainNavigation";

const FINAL_ROUND = 34;

const Index = () => {
  const [resultsRound, setResultsRound] = useState<number | null>(null);
  const [scheduleRound, setScheduleRound] = useState<number | null>(null);
  const { user } = useAuth();

  const { data: latestRoundData, isLoading: isLoadingLatest } = useQuery({
    queryKey: ["latest-round"],
    queryFn: async () => {
      for (let round = FINAL_ROUND; round >= 1; round--) {
        const roundData = await fetchResults("E2024", round);
        if (roundData?.game?.some(game => game.played)) {
          return round;
        }
      }
      return 1;
    },
  });

  useEffect(() => {
    if (latestRoundData && !resultsRound) {
      setResultsRound(latestRoundData);
      setScheduleRound(Math.min(latestRoundData + 1, FINAL_ROUND));
    }
  }, [latestRoundData, resultsRound]);
  
  const { data: resultsData, isLoading: isLoadingResults } = useQuery({
    queryKey: ["results", resultsRound],
    queryFn: () => fetchResults("E2024", resultsRound || 1),
    enabled: resultsRound !== null
  });

  const { data: scheduleData, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ["schedule", scheduleRound],
    queryFn: () => fetchSchedule("E2024", scheduleRound || 1),
    enabled: scheduleRound !== null
  });

  const handleResultsPageChange = (page: number) => {
    if (page >= 1 && page <= (latestRoundData || FINAL_ROUND)) {
      setResultsRound(page);
    }
  };

  const handleSchedulePageChange = (page: number) => {
    if (page > (resultsRound || 1) && page <= FINAL_ROUND) {
      setScheduleRound(page);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Euroleague 2024-25</h1>
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold">Games Center</h2>
                  <p className="text-muted-foreground">View all games and results</p>
                </div>

                <Tabs defaultValue="results" className="w-full space-y-6">
                  <TabsList className="w-full sm:w-auto mb-4 grid grid-cols-2 sm:flex sm:inline-flex bg-white/50 dark:bg-gray-900/50">
                    <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Results
                    </TabsTrigger>
                    <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Schedule
                    </TabsTrigger>
                  </TabsList>

              <TabsContent value="results" className="mt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Round {resultsRound}
                    </h3>
                    <Select
                      value={resultsRound?.toString()}
                      onValueChange={(value) => handleResultsPageChange(parseInt(value, 10))}
                    >
                      <SelectTrigger className="w-[180px] border-gray-200 dark:border-gray-800">
                        <SelectValue placeholder="Select round" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: latestRoundData || 0 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            Round {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      value={scheduleRound?.toString()}
                      onValueChange={(value) => handleSchedulePageChange(parseInt(value, 10))}
                    >
                      <SelectTrigger className="w-[180px] border-gray-200 dark:border-gray-800">
                        <SelectValue placeholder="Select round" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: FINAL_ROUND - (latestRoundData || 0) }, (_, i) => (
                          <SelectItem
                            key={i + (latestRoundData || 0) + 1}
                            value={(i + (latestRoundData || 0) + 1).toString()}
                          >
                            Round {i + (latestRoundData || 0) + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
