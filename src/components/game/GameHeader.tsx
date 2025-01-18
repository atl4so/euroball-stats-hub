import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { format } from "date-fns";

interface GameHeaderProps {
  localTeam: string;
  roadTeam: string;
  date: string;
}

export const GameHeader = ({ localTeam, roadTeam, date }: GameHeaderProps) => {
  return (
    <div className="space-y-4">
      <Breadcrumb className="px-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Game Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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