import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchTeams, fetchClubV3 } from "@/services/euroleagueApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GameCard } from "@/components/game/GameCard";

const TeamDetails = () => {
  const { teamCode } = useParams();

  const { data: teamsData, isLoading: isLoadingTeams } = useQuery({
    queryKey: ["teams"],
    queryFn: () => fetchTeams("E2024"),
  });

  const { data: clubV3Data, isLoading: isLoadingClubV3 } = useQuery({
    queryKey: ["clubV3", teamCode],
    queryFn: () => fetchClubV3(teamCode || ""),
    enabled: !!teamCode,
  });

  const teamData = teamsData?.clubs.club.find(club => club.code === teamCode);

  useEffect(() => {
    if (teamData) {
      document.title = `${teamData.name} - Team Details`;
    }
  }, [teamData]);

  if (isLoadingTeams || isLoadingClubV3) {
    return <div className="p-4">Loading...</div>;
  }

  if (!teamData) {
    return <div className="p-4">Team not found</div>;
  }

  const getGamePhase = (game: any) => {
    return game.phasetypecode || "Regular Season";
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <div className="flex items-center gap-6">
            {clubV3Data?.images?.crest && (
              <img
                src={clubV3Data.images.crest}
                alt={teamData.name}
                className="w-24 h-24 object-contain"
              />
            )}
            <div>
              <CardTitle className="text-2xl font-bold">{teamData.name}</CardTitle>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {clubV3Data?.city}, {clubV3Data?.country?.name}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="space-y-4">
            <TabsList>
              <TabsTrigger value="info">Team Info</TabsTrigger>
              <TabsTrigger value="games">Games</TabsTrigger>
              <TabsTrigger value="roster">Roster</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Venue</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {clubV3Data?.venue?.name}
                    {clubV3Data?.venue?.capacity && (
                      <span className="block text-sm text-gray-500 dark:text-gray-400">
                        Capacity: {clubV3Data.venue.capacity.toLocaleString()}
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Contact</h3>
                  {teamData.website && (
                    <a
                      href={teamData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                    >
                      Official Website
                    </a>
                  )}
                  {teamData.ticketsurl && (
                    <a
                      href={teamData.ticketsurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline block mt-1"
                    >
                      Buy Tickets
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Social Media</h3>
                <div className="space-y-1">
                  {teamData.twitteraccount && (
                    <a
                      href={`https://twitter.com/${teamData.twitteraccount}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                    >
                      Twitter
                    </a>
                  )}
                  {clubV3Data?.instagramAccount && (
                    <a
                      href={`https://instagram.com/${clubV3Data.instagramAccount}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                    >
                      Instagram
                    </a>
                  )}
                  {clubV3Data?.facebookAccount && (
                    <a
                      href={clubV3Data.facebookAccount}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline block"
                    >
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="games">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamData.games.phase.game.map((game) => (
                  <div key={game.gamecode} className="space-y-2">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {getGamePhase(game)}
                    </div>
                    <GameCard
                      game={{
                        gameCode: game.gamecode,
                        dateTime: game.gamedate,
                        homeTeam: {
                          name: game.versustype === "L" ? teamData.name : game.versus,
                        },
                        awayTeam: {
                          name: game.versustype === "R" ? teamData.name : game.versus,
                        },
                        homeScore: game.standingslocalscore,
                        awayScore: game.standingsroadscore,
                        status: game.played ? "FINAL" : "SCHEDULED",
                      }}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="roster">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {teamData.roster.player.map((player) => (
                  <Card key={player.code}>
                    <CardContent className="p-4">
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        #{player.dorsal} - {player.position}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {player.countryname}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamDetails;