import { Card, CardContent } from "@/components/ui/card";

interface GameScoreProps {
  localTeam: string;
  localScore: number;
  roadTeam: string;
  roadScore: number;
}

export const GameScore = ({ localTeam, localScore, roadTeam, roadScore }: GameScoreProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm">{localTeam}</span>
          <span className={`text-xl font-bold ${localScore > roadScore ? 'text-primary' : ''}`}>{localScore}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-sm">{roadTeam}</span>
          <span className={`text-xl font-bold ${roadScore > localScore ? 'text-primary' : ''}`}>{roadScore}</span>
        </div>
      </CardContent>
    </Card>
  );
};