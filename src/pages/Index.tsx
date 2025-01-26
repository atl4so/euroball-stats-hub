import { useQuery } from "@tanstack/react-query";
import { fetchResults, fetchSchedule } from "@/services/euroleagueApi";
import { GameList } from "@/components/GameList";
import { ScheduleList } from "@/components/ScheduleList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Calendar, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FINAL_ROUND = 34; // Total rounds in the season

const Index = () => {
  const [resultsRound, setResultsRound] = useState<number | null>(null);
  const [scheduleRound, setScheduleRound] = useState<number | null>(null);
  const { user } = useAuth();

  // Query to find the latest round with completed games
  const { data: latestRoundData, isLoading: isLoadingLatest } = useQuery({
    queryKey: ["latest-round"],
    queryFn: async () => {
      // Start from the last round and work backwards
      for (let round = FINAL_ROUND; round >= 1; round--) {
        const roundData = await fetchResults("E2024", round);
        if (roundData?.game?.some(game => game.played)) {
          return round;
        }
      }
      return 1; // Fallback to round 1 if no games are played
    },
  });

  // Set initial rounds when latest round is determined
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
    <div>
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Euroleague 2024-25</h1>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Games Center</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">View all games and results</p>
              </div>
              <div className="hidden">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="border-gray-200 dark:border-gray-800">
                        <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem disabled className="text-sm text-gray-500 dark:text-gray-400">
                        <User className="mr-2 h-4 w-4" />
                        <span>{user.email}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => supabase.auth.signOut()} className="text-red-600 dark:text-red-400">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild variant="outline" className="border-gray-200 dark:border-gray-800">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
