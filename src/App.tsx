import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import GameDetails from "@/pages/GameDetails";
import PlayerDetails from "@/pages/PlayerDetails";
import Standings from "@/pages/Standings";
import Teams from "@/pages/Teams";
import TeamDetails from "@/pages/TeamDetails";
import PlayerPointsStats from "@/pages/PlayerPointsStats";
import PlayerStats from "@/pages/PlayerStats";
import PlayerAdvancedStats from "@/pages/PlayerAdvancedStats";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Games
          </Link>
          <Link
            to="/teams"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Teams
          </Link>
          <Link
            to="/standings"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Standings
          </Link>
          <Link
            to="/player-points-stats"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Player Points
          </Link>
          <Link
            to="/player-stats"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Player Stats
          </Link>
          <Link
            to="/player-advanced-stats"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Advanced Stats
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game/:gameCode" element={<GameDetails />} />
          <Route path="/player/:playerCode" element={<PlayerDetails />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/team/:teamCode" element={<TeamDetails />} />
          <Route path="/player-points-stats" element={<PlayerPointsStats />} />
          <Route path="/player-stats" element={<PlayerStats />} />
          <Route path="/player-advanced-stats" element={<PlayerAdvancedStats />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;