import { Routes, Route, Link, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Trophy, Users2, GamepadIcon } from "lucide-react";
import Index from "@/pages/Index";
import GameDetails from "@/pages/GameDetails";
import PlayerDetails from "@/pages/PlayerDetails";
import Standings from "@/pages/Standings";
import Teams from "@/pages/Teams";
import TeamDetails from "@/pages/TeamDetails";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
              <nav className="flex items-center gap-6 text-sm">
                <Link
                  to="/"
                  className={cn(
                    "flex items-center gap-2 transition-colors hover:text-primary",
                    isActiveRoute('/') ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  <GamepadIcon className="h-4 w-4" />
                  <span>Games</span>
                </Link>
                <Link
                  to="/teams"
                  className={cn(
                    "flex items-center gap-2 transition-colors hover:text-primary",
                    isActiveRoute('/teams') ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  <Users2 className="h-4 w-4" />
                  <span>Teams</span>
                </Link>
                <Link
                  to="/standings"
                  className={cn(
                    "flex items-center gap-2 transition-colors hover:text-primary",
                    isActiveRoute('/standings') ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  <Trophy className="h-4 w-4" />
                  <span>Standings</span>
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/game/:gameCode" element={<GameDetails />} />
              <Route path="/player/:playerCode" element={<PlayerDetails />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/team/:teamCode" element={<TeamDetails />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;