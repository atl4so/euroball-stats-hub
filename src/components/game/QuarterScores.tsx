import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamStats } from "@/types/euroleague";
import { cn } from "@/lib/utils";

interface QuarterScoresProps {
  localTeam: TeamStats;
  roadTeam: TeamStats;
}

export const QuarterScores = ({ localTeam, roadTeam }: QuarterScoresProps) => {
  const quarters = [
    { name: "Q1", local: localTeam.partials.Partial1, road: roadTeam.partials.Partial1 },
    { name: "Q2", local: localTeam.partials.Partial2, road: roadTeam.partials.Partial2 },
    { name: "Q3", local: localTeam.partials.Partial3, road: roadTeam.partials.Partial3 },
    { name: "Q4", local: localTeam.partials.Partial4, road: roadTeam.partials.Partial4 },
  ];

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-0 shadow-lg">
      <CardHeader className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-white/5">
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Quarter Scores</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                <th className="text-left py-3 px-4 sm:px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Team</th>
                {quarters.map((q) => (
                  <th key={q.name} className="text-center py-3 px-4 sm:px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {q.name}
                  </th>
                ))}
                <th className="text-center py-3 px-4 sm:px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-4 px-4 sm:px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {localTeam.name}
                </td>
                {quarters.map((q, i) => (
                  <td
                    key={i}
                    className={cn(
                      "text-center py-4 px-4 sm:px-4 text-sm tabular-nums",
                      q.local > q.road
                        ? "text-orange-600 dark:text-orange-400 font-semibold"
                        : "text-gray-600 dark:text-gray-300"
                    )}
                  >
                    {q.local}
                  </td>
                ))}
                <td className="text-center py-4 px-4 sm:px-4 text-sm font-semibold text-gray-900 dark:text-gray-100 tabular-nums bg-gray-50/50 dark:bg-gray-900/50">
                  {localTeam.score}
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 sm:px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {roadTeam.name}
                </td>
                {quarters.map((q, i) => (
                  <td
                    key={i}
                    className={cn(
                      "text-center py-4 px-4 sm:px-4 text-sm tabular-nums",
                      q.road > q.local
                        ? "text-orange-600 dark:text-orange-400 font-semibold"
                        : "text-gray-600 dark:text-gray-300"
                    )}
                  >
                    {q.road}
                  </td>
                ))}
                <td className="text-center py-4 px-4 sm:px-4 text-sm font-semibold text-gray-900 dark:text-gray-100 tabular-nums bg-gray-50/50 dark:bg-gray-900/50">
                  {roadTeam.score}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};