import { Routes, Route } from "react-router-dom";
import Landing from "./page/Landing";
import MapPage from "./page/MapPage";
import FullMapPage from "./page/FullMapPage";
import Tentang from "./page/Tentang";
import Kontak from "./page/Kontak";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/full-map" element={<FullMapPage />} />
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/kontak" element={<Kontak />} />
    </Routes>
  );
}

export default App;