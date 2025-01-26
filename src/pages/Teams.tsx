import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchTeams, fetchClubV3 } from "@/services/euroleagueApi";
import { TeamCard } from "@/components/team/TeamCard";
import { TeamsResponse } from "@/types/team";
import { Card, CardContent } from "@/components/ui/card";
import { BackButton } from "@/components/BackButton";

const Teams = () => {
  const { data: teams, isLoading, error } = useQuery<TeamsResponse>({
    queryKey: ["teams"],
    queryFn: () => fetchTeams("E2024"),
  });

  const clubQueries = useQueries({
    queries: (teams?.clubs.club || []).map((team) => ({
      queryKey: ["club", team.code],
      queryFn: () => fetchClubV3(team.code),
      staleTime: Infinity,
    })),
  });

  const getClubDetails = (code: string) => {
    return clubQueries.find((q) => q.data?.code === code)?.data;
  };

  if (isLoading || clubQueries.some((q) => q.isLoading)) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error loading teams</div>;
  if (!teams) return <div className="p-4">No teams data available</div>;

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <BackButton />
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Teams</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View all Euroleague teams</p>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.clubs.club.map((team) => {
                const clubDetails = getClubDetails(team.code);
                return (
                  <TeamCard 
                    key={team.code} 
                    team={team} 
                    v3Details={clubDetails}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Teams;