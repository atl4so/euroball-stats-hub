import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayerDetails } from "@/services/euroleagueApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useEffect } from "react";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";

const PlayerDetails = () => {
  const { playerCode } = useParams();
  const { data: playerDetails, isLoading, error } = useQuery({
    queryKey: ["playerDetails", playerCode],
    queryFn: () => {
      if (!playerCode) {
        throw new Error("Player code is required");
      }
      return fetchPlayerDetails(playerCode, "E2024");
    },
    enabled: !!playerCode,
  });

  useEffect(() => {
    if (playerDetails) {
      document.title = `${playerDetails.name} - Euroball Stats Hub`;
    }
  }, [playerDetails]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error loading player details: {error.message}</div>;
  if (!playerDetails) return <div className="p-4">No player details found</div>;

  // Convert minutes played from MM:SS format to average minutes
  const getAverageMinutes = (timePlayed: string) => {
    const [minutes, seconds] = timePlayed.split(":").map(Number);
    const totalMinutes = minutes + seconds / 60;
    return totalMinutes.toFixed(1);
  };

  const breadcrumbItems = [
    { label: "Teams", path: "/teams" },
    { label: playerDetails.clubName, path: `/team/${playerDetails.clubCode}` },
    { label: playerDetails.name, path: `/player/${playerCode}` },
  ];

  return (
    <div>
      <PageBreadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {playerDetails.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {playerDetails.clubName}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              #{playerDetails.dorsal}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              {playerDetails.position}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Height</div>
                  <div className="text-base text-gray-900 dark:text-gray-100">
                    {playerDetails.height} cm
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Nationality</div>
                  <div className="text-base text-gray-900 dark:text-gray-100">
                    {playerDetails.country}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</div>
                  <div className="text-base text-gray-900 dark:text-gray-100">
                    {format(new Date(playerDetails.birthDate), "MMMM d, yyyy")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Key Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {playerDetails.score}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">PPG</div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {playerDetails.valuation}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">PIR</div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {getAverageMinutes(playerDetails.timePlayed)}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Minutes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Detailed Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">2PT%</div>
                  <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                    {playerDetails.fieldGoals2Percent}%
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">3PT%</div>
                  <div className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                    {playerDetails.fieldGoals3Percent}%
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">FT%</div>
                  <div className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">
                    {playerDetails.freeThrowsPercent}%
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rebounds</div>
                  <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                    {playerDetails.totalRebounds}
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Assists</div>
                  <div className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                    {playerDetails.assistances}
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Steals</div>
                  <div className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">
                    {playerDetails.steals}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {(playerDetails.career || playerDetails.misc) && (
            <Card className="md:col-span-3 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Career Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {playerDetails.career && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Career History</h3>
                    <p className="text-gray-900 dark:text-gray-100">{playerDetails.career}</p>
                  </div>
                )}
                {playerDetails.misc && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Additional Information</h3>
                    <p className="text-gray-900 dark:text-gray-100">{playerDetails.misc}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;