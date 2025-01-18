import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold">
          {localTeam} vs {roadTeam}
        </h1>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
  );
};