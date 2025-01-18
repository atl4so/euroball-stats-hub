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
      <CardContent className="overflow-x-auto">
        <div className="min-w-[300px]">
          <div className="grid grid-cols-5 gap-2 text-sm font-medium mb-2 text-muted-foreground">
            <div>Team</div>
            <div className="text-right">Q1</div>
            <div className="text-right">Q2</div>
            <div className="text-right">Q3</div>
            <div className="text-right">Q4</div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-sm items-center py-2 border-t">
            <div className="font-medium truncate">{localTeam.name}</div>
            <div className="text-right">{localTeam.partials.Partial1}</div>
            <div className="text-right">{localTeam.partials.Partial2}</div>
            <div className="text-right">{localTeam.partials.Partial3}</div>
            <div className="text-right">{localTeam.partials.Partial4}</div>
          </div>
          <div className="grid grid-cols-5 gap-2 text-sm items-center py-2 border-t">
            <div className="font-medium truncate">{roadTeam.name}</div>
            <div className="text-right">{roadTeam.partials.Partial1}</div>
            <div className="text-right">{roadTeam.partials.Partial2}</div>
            <div className="text-right">{roadTeam.partials.Partial3}</div>
            <div className="text-right">{roadTeam.partials.Partial4}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};