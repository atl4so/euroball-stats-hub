import { Team } from "@/types/team";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ClubV3Response } from "@/services/euroleagueApi";

interface TeamCardProps {
  team: Team;
  v3Details?: ClubV3Response;
}

export const TeamCard = ({ team, v3Details }: TeamCardProps) => {
  return (
    <Link to={`/team/${team.code.toLowerCase()}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-[120px]">
        <CardContent className="p-6 h-full">
          <div className="flex items-center gap-4 h-full">
            <div className="flex-shrink-0 w-16">
              <img
                src={v3Details?.images?.crest}
                alt={team.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate">{team.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {v3Details?.city}, {v3Details?.country?.name}
              </p>
              {v3Details?.venue && (
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {v3Details.venue.name} ({v3Details.venue.capacity.toLocaleString()} seats)
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};