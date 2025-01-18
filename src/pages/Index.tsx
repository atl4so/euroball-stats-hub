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

const Index = () => {
  const [gameday, setGameday] = useState(CURRENT_ROUND);
  
  const { data: resultsData, isLoading: isLoadingResults } = useQuery({
    queryKey: ["results", gameday],
    queryFn: () => fetchResults("E2024", gameday),
    enabled: gameday <= CURRENT_ROUND // Only fetch if it's a completed round
  });

  const { data: scheduleData, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ["schedule", NEXT_ROUND],
    queryFn: () => fetchSchedule("E2024", NEXT_ROUND)
  });

  const handlePageChange = (page: number) => {
    if (page <= CURRENT_ROUND) {
      setGameday(page);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center mb-4">Euroleague Games</h1>
          
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(gameday - 1)}
              disabled={gameday <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <span className="text-lg font-medium">
              Round {gameday}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(gameday + 1)}
              disabled={gameday >= CURRENT_ROUND}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl">
        <Tabs defaultValue="results" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="results">Results (Round {gameday})</TabsTrigger>
            <TabsTrigger value="schedule">Upcoming (Round {NEXT_ROUND})</TabsTrigger>
          </TabsList>
          <TabsContent value="results">
            <GameList
              games={resultsData?.game || []}
              isLoading={isLoadingResults}
              currentRound={gameday}
              onPageChange={handlePageChange}
            />
          </TabsContent>
          <TabsContent value="schedule">
            <ScheduleList
              schedules={scheduleData?.item || []}
              isLoading={isLoadingSchedule}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;