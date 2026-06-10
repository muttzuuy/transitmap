import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import MapView from "./map-view";
import SiteHeader from "../components/landing/SiteHeader";

function getActivityCategory(remark) {
  if (!remark) return "Lainnya";
  const r = remark.toLowerCase();
  if (r.includes("pendidikan")) return "Pendidikan";
  if (r.includes("rumah sakit") || r.includes("pusat kesehatan") || r.includes("puskesmas") || r.includes("klinik")) return "Kesehatan";
  if (r.includes("perdagangan") || r.includes("pasar") || r.includes("toko") || r.includes("hotel") || r.includes("bisnis") || r.includes("niaga")) return "Perdagangan";
  if (r.includes("kantor") || r.includes("pemerintah") || r.includes("polisi") || r.includes("lembaga")) return "Pemerintahan";
  return "Lainnya";
}

function getActivityColor(category) {
  switch (category) {
    case "Pendidikan": return { text: "text-blue-500", bg: "bg-blue-500", light: "bg-blue-50", hex: "#3b82f6" };
    case "Kesehatan": return { text: "text-red-500", bg: "bg-red-500", light: "bg-red-50", hex: "#ef4444" };
    case "Perdagangan": return { text: "text-amber-500", bg: "bg-amber-500", light: "bg-amber-50", hex: "#f59e0b" };
    case "Pemerintahan": return { text: "text-purple-500", bg: "bg-purple-500", light: "bg-purple-50", hex: "#a855f7" };
    default: return { text: "text-slate-500", bg: "bg-slate-500", light: "bg-slate-50", hex: "#64748b" };
  }
}

const priorityConfig = {
  "Prioritas Tinggi": {
    fill: "#ef4444",
    soft: "bg-red-50 text-red-700 ring-red-200",
    border: "border-red-200",
    label: "Tinggi",
  },
  "Prioritas Sedang": {
    fill: "#f59e0b",
    soft: "bg-amber-50 text-amber-700 ring-amber-200",
    border: "border-amber-200",
    label: "Sedang",
  },
  "Prioritas Rendah": {
    fill: "#10b981",
    soft: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    border: "border-emerald-200",
    label: "Rendah",
  },
  default: {
    fill: "#94a3b8",
    soft: "bg-slate-50 text-slate-700 ring-slate-200",
    border: "border-slate-200",
    label: "Tidak diketahui",
  },
};

function getPriorityConfig(status) {
  return priorityConfig[status] || priorityConfig.default;
}

function getFeatureCenter(feature) {
  const layer = L.geoJSON(feature);
  const bounds = layer.getBounds();
  return bounds.isValid() ? bounds.getCenter() : L.latLng(-5.45, 105.26);
}

export default function FullMapPage() {
  const [geoData, setGeoData] = useState(null);
  const [transitData, setTransitData] = useState(null);
  
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedTransportId, setSelectedTransportId] = useState(null);
  const [focusTarget, setFocusTarget] = useState(null);

  const [mapToggles, setMapToggles] = useState({
    Pendidikan: true,
    Kesehatan: true,
    Perdagangan: true,
    Pemerintahan: true,
    Lainnya: true
  });

  const areaLayerRefs = useRef({});
  const markerRefs = useRef({});

  useEffect(() => {
    fetch("/data/heatmap.geojson").then((res) => res.json()).then(setGeoData);
    fetch("/data/transit.geojson").then((res) => res.json()).then(setTransitData);
  }, []);

  const processedAreas = useMemo(() => {
    if (!geoData?.features) return [];
    return geoData.features.map((feature, index) => {
      const status = feature?.properties?.rekomendasi || "Tidak diketahui";
      const areaName = feature?.properties?.WADMKC || feature?.properties?.NAMOBJ || `Wilayah ${index + 1}`;
      return {
        id: `${areaName}-${index}`,
        feature,
        areaName,
        status,
        center: getFeatureCenter(feature),
        transportCount: Number(feature?.properties?.NUMPOINTS || 0),
      };
    });
  }, [geoData]);

  const processedTransits = useMemo(() => {
    if (!transitData?.features) return [];
    return transitData.features.map((feature, index) => {
      const [lng, lat] = feature?.geometry?.coordinates || [105.26, -5.45];
      const remark = feature?.properties?.REMARK || "Fasilitas Publik";
      const name = feature?.properties?.NAMOBJ || `Lokasi ${index + 1}`;
      const category = getActivityCategory(remark);

      return {
        id: `${name}-${index}`,
        feature,
        name,
        detail: remark,
        lat,
        lng,
        latlng: [lat, lng],
        category,
        colorData: getActivityColor(category)
      };
    });
  }, [transitData]);

  const recommendationPoints = useMemo(() => {
    return processedAreas
      .filter((area) => area.status === "Prioritas Tinggi" || area.status === "Prioritas Sedang")
      .map((area) => ({
        id: `rec-${area.id}`,
        areaId: area.id,
        latlng: [area.center.lat, area.center.lng],
        name: `Rekomendasi Halte Baru`,
        detail: `Kawasan ${area.areaName} berstatus ${area.status}. Dibutuhkan akses transportasi memadai untuk mendukung aktivitas warga.`,
        status: area.status
      }));
  }, [processedAreas]);

  const filteredTransits = useMemo(() => {
    return processedTransits.filter((item) => mapToggles[item.category]);
  }, [processedTransits, mapToggles]);

  const activeInsightArea = processedAreas.find((area) => area.id === selectedAreaId) || null;
  const selectedTransport = processedTransits.find((item) => item.id === selectedTransportId) || null;

  const handleSelectTransport = (item) => {
    setSelectedTransportId(item.id);
    setFocusTarget({ center: item.latlng, zoom: 16 });
    const maybeMarker = markerRefs.current[item.id];
    if (maybeMarker) maybeMarker.openPopup();
  };

  const handleSelectArea = (area, bounds) => {
    setSelectedAreaId(area.id);
    setFocusTarget(bounds ? { bounds } : { bounds: L.geoJSON(area.feature).getBounds() });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#EEF3F0] overflow-hidden font-sans text-[#12303C]">
      
      <div className="relative z-[9999] h-[80px]">
        <SiteHeader variant="light" />
      </div>

      <div className="flex-1 w-full h-full relative">
        {/* Floating Toggles */}
        <div className="absolute top-6 left-6 z-[1000] flex gap-2 flex-wrap max-w-[80%] bg-white/80 p-2 rounded-2xl backdrop-blur-md shadow-lg ring-1 ring-black/5">
          {[
            { id: "Pendidikan", color: "bg-blue-500" },
            { id: "Kesehatan", color: "bg-red-500" },
            { id: "Perdagangan", color: "bg-amber-500" },
            { id: "Pemerintahan", color: "bg-purple-500" },
            { id: "Lainnya", color: "bg-slate-500" },
          ].map(t => (
            <button 
              key={t.id}
              onClick={() => setMapToggles(prev => ({...prev, [t.id]: !prev[t.id]}))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] md:text-sm font-bold shadow-sm transition-all border ${mapToggles[t.id] ? 'bg-white border-slate-200 text-[#12303C]' : 'bg-transparent border-transparent text-[#5E7580] opacity-50'}`}
            >
              <div className={`w-3 h-3 rounded-full ${mapToggles[t.id] ? t.color : 'bg-slate-300'}`}></div>
              {t.id}
            </button>
          ))}
        </div>

        <MapView
          filteredAreas={processedAreas}
          filteredTransits={filteredTransits}
          activeInsightArea={activeInsightArea}
          selectedTransport={selectedTransport}
          focusTarget={focusTarget}
          areaLayerRefs={areaLayerRefs}
          markerRefs={markerRefs}
          onSelectArea={handleSelectArea}
          onSelectTransport={handleSelectTransport}
          getPriorityConfig={getPriorityConfig}
          recommendationPoints={recommendationPoints}
        />
      </div>
    </div>
  );
}
