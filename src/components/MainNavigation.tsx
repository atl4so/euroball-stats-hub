import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Trophy, Users2, Table2 } from "lucide-react";

export const MainNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-8">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-2 text-lg font-semibold transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Trophy className="h-5 w-5" />
              <span className="hidden sm:inline-block">Games</span>
            </Link>
            <Link
              to="/teams"
              className={cn(
                "flex items-center gap-2 text-lg font-semibold transition-colors hover:text-primary",
                isActive("/teams") ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Users2 className="h-5 w-5" />
              <span className="hidden sm:inline-block">Teams</span>
            </Link>
            <Link
              to="/standings"
              className={cn(
                "flex items-center gap-2 text-lg font-semibold transition-colors hover:text-primary",
                isActive("/standings") ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Table2 className="h-5 w-5" />
              <span className="hidden sm:inline-block">Standings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};