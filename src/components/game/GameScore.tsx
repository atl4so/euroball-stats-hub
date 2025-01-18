import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameScoreProps {
  localTeam: string;
  localScore: number;
  roadTeam: string;
  roadScore: number;
}

export const GameScore = ({ localTeam, localScore, roadTeam, roadScore }: GameScoreProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{localTeam}</span>
          <span className="text-2xl">{localScore}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">{roadTeam}</span>
          <span className="text-2xl">{roadScore}</span>
        </div>
      </CardContent>
    </Card>
  );
};