import { useQuery } from "@tanstack/react-query";
import { fetchResults } from "@/services/euroleagueApi";
import { GameList } from "@/components/GameList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
  const [gameday, setGameday] = useState(22);
  
  const { data, isLoading } = useQuery({
    queryKey: ["results", gameday],
    queryFn: () => fetchResults("E2024", gameday)
  });

  const handlePageChange = (page: number) => {
    setGameday(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center mb-4">Euroleague Results</h1>
          
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
              disabled={gameday >= 34}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl">
        <GameList
          games={data?.game || []}
          isLoading={isLoading}
          currentRound={gameday}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default Index;