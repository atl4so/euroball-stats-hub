import { useQuery } from "@tanstack/react-query";
import { fetchResults, fetchSchedule } from "@/services/euroleagueApi";
import { GameList } from "@/components/GameList";
import { ScheduleList } from "@/components/ScheduleList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CURRENT_ROUND = 22; // Last completed round
const NEXT_ROUND = CURRENT_ROUND + 1;
const FINAL_ROUND = 34; // Total rounds in the season

const Index = () => {
  const [resultsRound, setResultsRound] = useState(CURRENT_ROUND);
  const [scheduleRound, setScheduleRound] = useState(NEXT_ROUND);
  
  const { data: resultsData, isLoading: isLoadingResults } = useQuery({
    queryKey: ["results", resultsRound],
    queryFn: () => fetchResults("E2024", resultsRound),
    enabled: resultsRound <= CURRENT_ROUND
  });

  const { data: scheduleData, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ["schedule", scheduleRound],
    queryFn: () => fetchSchedule("E2024", scheduleRound),
    enabled: scheduleRound > CURRENT_ROUND && scheduleRound <= FINAL_ROUND
  });

  const handleResultsPageChange = (page: number) => {
    if (page >= 1 && page <= CURRENT_ROUND) {
      setResultsRound(page);
    }
  };

  const handleSchedulePageChange = (page: number) => {
    if (page > CURRENT_ROUND && page <= FINAL_ROUND) {
      setScheduleRound(page);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center">Euroleague Games</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl">
        <Tabs defaultValue="results" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="results">Results (Round {resultsRound})</TabsTrigger>
            <TabsTrigger value="schedule">Upcoming (Round {scheduleRound})</TabsTrigger>
          </TabsList>
          <TabsContent value="results">
            <GameList
              games={resultsData?.game || []}
              isLoading={isLoadingResults}
              currentRound={resultsRound}
              onPageChange={handleResultsPageChange}
            />
          </TabsContent>
          <TabsContent value="schedule">
            <ScheduleList
              schedules={scheduleData?.item || []}
              isLoading={isLoadingSchedule}
              currentRound={scheduleRound}
              onPageChange={handleSchedulePageChange}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;