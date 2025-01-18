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
    <>
      <Breadcrumb>
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

      <div className="text-center space-y-1 my-2">
        <h1 className="text-2xl font-bold">
          {localTeam} vs {roadTeam}
        </h1>
        <p className="text-muted-foreground">{date}</p>
      </div>
    </>
  );
};