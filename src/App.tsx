import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import GameDetails from "@/pages/GameDetails";
import PlayerDetails from "@/pages/PlayerDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/game/:gameCode" element={<GameDetails />} />
      <Route path="/player/:playerCode" element={<PlayerDetails />} />
    </Routes>
  );
}

export default App;