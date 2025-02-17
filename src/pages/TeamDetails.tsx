import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchTeams } from "@/services/euroleagueApi";
import { Loader2, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeamsResponse } from "@/types/team";
import { BackButton } from "@/components/BackButton";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const TeamDetails = () => {
  const { teamCode } = useParams();
  console.log("Current teamCode:", teamCode);

  const { data: teamsData, isLoading, error } = useQuery<TeamsResponse, Error>({
    queryKey: ["teams"],
    queryFn: () => fetchTeams("E2024")
  });

  console.log("Teams data:", teamsData);
  console.log("Loading:", isLoading);
  console.log("Error:", error);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const team = teamsData?.clubs?.club?.find(
    (t) => t.code.toLowerCase() === teamCode?.toLowerCase()
  );
  
  console.log("Found team:", team);

  if (!team) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Team not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-7xl">
        <BackButton />
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{team.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-2">
            <MapPin className="h-4 w-4" />
            {team.countryname}
          </p>
        </div>

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="roster">Roster</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg">
              <CardHeader className="text-lg font-semibold text-gray-900 dark:text-gray-100">Club Details</CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Arena</h3>
                  <p className="text-gray-500 dark:text-gray-400">{team.arena.name}</p>
                </div>
                {team.website && (
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Website</h3>
                    <a
                      href={team.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {team.website}
                    </a>
                  </div>
                )}
                {team.ticketsurl && (
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Tickets</h3>
                    <a
                      href={team.ticketsurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Buy Tickets
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roster" className="space-y-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {team.roster?.player?.map((player) => (
                    <div
                      key={player.code}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex-1">
                        <Link 
                          to={`/player/${player.code}`}
                          className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {player.name}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {player.position} • #{player.dorsal}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {team.coach && (
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg">
                <CardHeader className="text-lg font-semibold text-gray-900 dark:text-gray-100">Head Coach</CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{team.coach.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {team.coach.countryname}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="games" className="space-y-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {team.games?.phase?.game?.map((game) => (
                    <Link
                      key={game.gamecode}
                      to={`/game/${game.gamecode}`}
                      className="block p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate text-sm sm:text-base">
                            {game.versus}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {format(new Date(game.gamedate), "dd/MM/yyyy")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <div className="text-right whitespace-nowrap">
                            <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base tabular-nums">
                              {game.played ? (
                                `${game.standingslocalscore} - ${game.standingsroadscore}`
                              ) : (
                                "Upcoming"
                              )}
                            </p>
                          </div>
                          {game.played && (
                            <div className={cn(
                              "text-xs font-medium px-2 py-1 rounded",
                              game.win === "1" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            )}>
                              {game.win === "1" ? "Win" : "Loss"}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamDetails;
