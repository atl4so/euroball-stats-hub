import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoundSelectorProps {
  currentRound: number;
  maxRound: number;
  minRound?: number;
  onRoundChange: (round: number) => void;
}

export const RoundSelector = ({
  currentRound,
  maxRound,
  minRound = 1,
  onRoundChange,
}: RoundSelectorProps) => {
  return (
    <Select
      value={currentRound?.toString()}
      onValueChange={(value) => onRoundChange(parseInt(value, 10))}
    >
      <SelectTrigger className="w-[180px] border-gray-200 dark:border-gray-800">
        <SelectValue placeholder="Select round" />
      </SelectTrigger>
      <SelectContent>
        {Array.from(
          { length: maxRound - minRound + 1 },
          (_, i) => i + minRound
        ).map((round) => (
          <SelectItem key={round} value={round.toString()}>
            Round {round}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};