import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Index from "@/pages/Index";
import GameDetails from "@/pages/GameDetails";
import PlayerDetails from "@/pages/PlayerDetails";
import Auth from "@/pages/Auth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/game/:gameCode" element={<GameDetails />} />
        <Route path="/player/:playerCode" element={<PlayerDetails />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;