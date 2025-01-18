import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamStats } from "@/types/euroleague";

interface QuarterScoresProps {
  localTeam: TeamStats;
  roadTeam: TeamStats;
}

export const QuarterScores = ({ localTeam, roadTeam }: QuarterScoresProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quarter Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-5 gap-2 text-sm font-medium">
            <div>Team</div>
            <div>Q1</div>
            <div>Q2</div>
            <div>Q3</div>
            <div>Q4</div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-sm">
            <div>{localTeam.name}</div>
            <div>{localTeam.partials.Partial1}</div>
            <div>{localTeam.partials.Partial2}</div>
            <div>{localTeam.partials.Partial3}</div>
            <div>{localTeam.partials.Partial4}</div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-sm">
            <div>{roadTeam.name}</div>
            <div>{roadTeam.partials.Partial1}</div>
            <div>{roadTeam.partials.Partial2}</div>
            <div>{roadTeam.partials.Partial3}</div>
            <div>{roadTeam.partials.Partial4}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};