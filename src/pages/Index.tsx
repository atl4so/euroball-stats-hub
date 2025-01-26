import { useQuery } from "@tanstack/react-query";
import { fetchResults, fetchSchedule } from "@/services/euroleagueApi";
import { useState, useEffect } from "react";
import { GamesHeader } from "@/components/games/GamesHeader";
import { GamesContent } from "@/components/games/GamesContent";

const FINAL_ROUND = 34;

const Index = () => {
  const [resultsRound, setResultsRound] = useState<number | null>(null);
  const [scheduleRound, setScheduleRound] = useState<number | null>(null);

  const { data: latestRoundData, isLoading: isLoadingLatest } = useQuery({
    queryKey: ["latest-round"],
    queryFn: async () => {
      for (let round = FINAL_ROUND; round >= 1; round--) {
        const roundData = await fetchResults("E2024", round);
        if (roundData?.game?.some((game) => game.played)) {
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
    enabled: resultsRound !== null,
  });

  const { data: scheduleData, isLoading: isLoadingSchedule } = useQuery({
    queryKey: ["schedule", scheduleRound],
    queryFn: () => fetchSchedule("E2024", scheduleRound || 1),
    enabled: scheduleRound !== null,
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
        <GamesHeader />
        <GamesContent
          resultsRound={resultsRound}
          scheduleRound={scheduleRound}
          latestRoundData={latestRoundData}
          resultsData={resultsData}
          scheduleData={scheduleData}
          isLoadingResults={isLoadingResults}
          isLoadingSchedule={isLoadingSchedule}
          handleResultsPageChange={handleResultsPageChange}
          handleSchedulePageChange={handleSchedulePageChange}
        />
      </div>
    </div>
  );
};

export default Index;