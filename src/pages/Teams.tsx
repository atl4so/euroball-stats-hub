import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "@/services/euroleagueApi";
import { TeamCard } from "@/components/team/TeamCard";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { TeamsResponse } from "@/types/team";
import { Card, CardContent } from "@/components/ui/card";

const Teams = () => {
  const { data: teams, isLoading, error } = useQuery<TeamsResponse>({
    queryKey: ["teams"],
    queryFn: () => fetchTeams("E2024"),
  });

  const breadcrumbItems = [
    { label: "Teams", path: "/teams" },
  ];

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error loading teams</div>;
  if (!teams) return <div className="p-4">No teams data available</div>;

  return (
    <div>
      <PageBreadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Teams</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View all Euroleague teams</p>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.clubs.club.map((team) => (
                <TeamCard key={team.code} team={team} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Teams;
