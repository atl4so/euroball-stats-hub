import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameStatusProps {
  played: boolean;
}

export const GameStatus = ({ played }: GameStatusProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Game Status</CardTitle>
      </CardHeader>
      <CardContent>
        <p><span className="font-semibold">Status:</span> {played ? 'Completed' : 'Scheduled'}</p>
      </CardContent>
    </Card>
  );
};