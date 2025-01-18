import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameLocationProps {
  stadium: string;
  stadiumName: string;
  audience: number;
}

export const GameLocation = ({ stadium, stadiumName, audience }: GameLocationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><span className="font-semibold">Venue:</span> {stadium} - {stadiumName}</p>
        <p><span className="font-semibold">Attendance:</span> {audience.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
};