import { Trophy } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Trophy className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg">euroleague.day</span>
    </div>
  );
};