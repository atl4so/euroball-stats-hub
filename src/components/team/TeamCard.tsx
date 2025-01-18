import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Team } from "@/types/team";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Link to={`/team/${team.code.toLowerCase()}`}>
      <Card className="overflow-hidden hover:bg-accent/50 transition-colors">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2">{team.name}</h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-lg">{team.countryname}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
