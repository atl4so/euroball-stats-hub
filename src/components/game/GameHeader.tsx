import { format } from "date-fns";

interface GameHeaderProps {
  localTeam: string;
  roadTeam: string;
  date: string;
}

export const GameHeader = ({ localTeam, roadTeam, date }: GameHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2 sm:space-y-3">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {localTeam} vs {roadTeam}
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {format(new Date(date), "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  );
};