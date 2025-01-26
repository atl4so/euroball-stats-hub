import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { DesktopHeader } from "@/components/navigation/Headers";
import Index from "@/pages/Index";
import GameDetails from "@/pages/GameDetails";
import PlayerDetails from "@/pages/PlayerDetails";
import Standings from "@/pages/Standings";
import Teams from "@/pages/Teams";
import TeamDetails from "@/pages/TeamDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex w-full">
          <DesktopHeader />
          <main className="flex-1 overflow-x-hidden p-4 md:p-6 pt-20">
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