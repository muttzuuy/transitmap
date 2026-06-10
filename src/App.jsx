import { Routes, Route } from "react-router-dom";
import Landing from "./page/Landing";
import MapPage from "./page/MapPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}

export default App;