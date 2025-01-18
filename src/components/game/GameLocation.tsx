import { Card, CardContent } from "@/components/ui/card";

interface GameLocationProps {
  stadium: string;
  stadiumName: string;
  audience: number;
}

export const GameLocation = ({ stadium, stadiumName, audience }: GameLocationProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-4 space-y-1">
        <p className="text-sm"><span className="font-medium">Venue:</span> {stadium} - {stadiumName}</p>
        <p className="text-sm"><span className="font-medium">Attendance:</span> {audience.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
};