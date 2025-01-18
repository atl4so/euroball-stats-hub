import { useQuery } from "@tanstack/react-query";
import { fetchStandings } from "@/services/euroleagueApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";

const Standings = () => {
  const { data: standings, isLoading, error } = useQuery({
    queryKey: ["standings"],
    queryFn: () => fetchStandings(),
  });

  useEffect(() => {
    document.title = "Standings - Euroball Stats Hub";
  }, []);

  const breadcrumbItems = [
    { label: "Standings", path: "/standings" },
  ];

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error loading standings</div>;
  if (!standings) return <div className="p-4">No standings data available</div>;

  return (
    <div>
      <PageBreadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {standings.standings.group.name}
          </h1>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12 font-bold">#</TableHead>
                  <TableHead className="font-bold">Team</TableHead>
                  <TableHead className="text-center font-bold">GP</TableHead>
                  <TableHead className="text-center font-bold">W</TableHead>
                  <TableHead className="text-center font-bold">L</TableHead>
                  <TableHead className="text-center hidden md:table-cell font-bold">PF</TableHead>
                  <TableHead className="text-center hidden md:table-cell font-bold">PA</TableHead>
                  <TableHead className="text-center font-bold">+/-</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings.standings.group.team.map((team) => (
                  <TableRow
                    key={team.code}
                    className={`
                      ${team.ranking <= 8 
                        ? "bg-accent/50 hover:bg-accent" 
                        : "hover:bg-accent/50"}
                    `}
                  >
                    <TableCell className="font-medium">
                      {team.ranking}
                    </TableCell>
                    <TableCell>
                      <Link 
                        to={`/team/${team.code.toLowerCase()}`}
                        className="flex items-center hover:text-primary transition-colors"
                      >
                        <span className="font-medium">{team.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">{team.totalgames}</TableCell>
                    <TableCell className="text-center font-semibold text-primary">
                      {team.wins}
                    </TableCell>
                    <TableCell className="text-center text-destructive">
                      {team.losses}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      {team.ptsfavour}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      {team.ptsagainst}
                    </TableCell>
                    <TableCell
                      className={`text-center font-medium ${
                        team.difference > 0
                          ? "text-primary"
                          : team.difference < 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {team.difference > 0 ? "+" : ""}
                      {team.difference}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 rounded bg-accent/50"></div>
            <span>Playoff positions (Top 8)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Standings;
