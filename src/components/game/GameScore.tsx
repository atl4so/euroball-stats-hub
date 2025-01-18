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
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-center gap-4">
          <span className="font-medium text-sm truncate">{localTeam}</span>
          <span className={`text-2xl font-bold ${localScore > roadScore ? 'text-primary' : ''}`}>
            {localScore}
          </span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="font-medium text-sm truncate">{roadTeam}</span>
          <span className={`text-2xl font-bold ${roadScore > localScore ? 'text-primary' : ''}`}>
            {roadScore}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};