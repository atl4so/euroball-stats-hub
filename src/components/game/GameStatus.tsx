import { Card, CardContent } from "@/components/ui/card";

interface GameStatusProps {
  played: boolean;
}

export const GameStatus = ({ played }: GameStatusProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <p className="text-sm">
          <span className="font-medium">Status:</span>{' '}
          <span className={played ? 'text-green-600' : 'text-yellow-600'}>
            {played ? 'Completed' : 'Scheduled'}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};