import { useQuery } from "@tanstack/react-query";
import { fetchResults, fetchSchedule } from "@/services/euroleagueApi";
import { GameList } from "@/components/GameList";
import { ScheduleList } from "@/components/ScheduleList";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CURRENT_ROUND = 22; // Last completed round
const NEXT_ROUND = CURRENT_ROUND + 1;
const FINAL_ROUND = 34; // Total rounds in the season

const Index = () => {
  const [resultsRound, setResultsRound] = useState(CURRENT_ROUND);
  const [scheduleRound, setScheduleRound] = useState(NEXT_ROUND);
  const { user } = useAuth();
  
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Euroleague Games</h1>
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl">
        <Tabs defaultValue="results" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="schedule">Upcoming</TabsTrigger>
          </TabsList>
          
          <TabsContent value="results">
            <div className="mb-4">
              <Select
                value={resultsRound.toString()}
                onValueChange={(value) => handleResultsPageChange(parseInt(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select round" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: CURRENT_ROUND }, (_, i) => CURRENT_ROUND - i).map((round) => (
                    <SelectItem key={round} value={round.toString()}>
                      Round {round}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <GameList
              games={resultsData?.game || []}
              isLoading={isLoadingResults}
              currentRound={resultsRound}
              onPageChange={handleResultsPageChange}
            />
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="mb-4">
              <Select
                value={scheduleRound.toString()}
                onValueChange={(value) => handleSchedulePageChange(parseInt(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select round" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: FINAL_ROUND - CURRENT_ROUND }, (_, i) => NEXT_ROUND + i).map((round) => (
                    <SelectItem key={round} value={round.toString()}>
                      Round {round}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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