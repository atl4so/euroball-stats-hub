import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Team } from "@/types/team";
import { ClubV3Response } from "@/types/euroleague";

interface TeamCardProps {
  team: Team;
  v3Details?: ClubV3Response;
}

export const TeamCard = ({ team, v3Details }: TeamCardProps) => {
  return (
    <Link to={`/team/${team.code}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
        <CardContent className="p-4">
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
                  {v3Details.venue.name}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};