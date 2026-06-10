import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import MapView from "./map-view";
import SiteHeader from "../components/landing/SiteHeader";
import { 
  LineChart, Star, Info, Settings, 
  Search, MapPin, Filter, ChevronRight,
  GraduationCap, Building2, ShoppingBag, HeartPulse, Activity
} from "lucide-react";
import { motion } from "framer-motion";

function getActivityCategory(remark) {
  if (!remark) return "Lainnya";
  const r = remark.toLowerCase();
  if (r.includes("pendidikan")) return "Pendidikan";
  if (r.includes("rumah sakit") || r.includes("pusat kesehatan") || r.includes("puskesmas") || r.includes("klinik")) return "Kesehatan";
  if (r.includes("perdagangan") || r.includes("pasar") || r.includes("toko") || r.includes("hotel") || r.includes("bisnis") || r.includes("niaga")) return "Perdagangan";
  if (r.includes("kantor") || r.includes("pemerintah") || r.includes("polisi") || r.includes("lembaga")) return "Pemerintahan";
  return "Lainnya";
}

function getActivityIcon(category, size = 18) {
  switch (category) {
    case "Pendidikan": return <GraduationCap size={size} />;
    case "Kesehatan": return <HeartPulse size={size} />;
    case "Perdagangan": return <ShoppingBag size={size} />;
    case "Pemerintahan": return <Building2 size={size} />;
    default: return <Activity size={size} />;
  }
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

export default function MapPage() {
  const [geoData, setGeoData] = useState(null);
  const [transitData, setTransitData] = useState(null);
  
  const [priorityFilter, setPriorityFilter] = useState("Semua");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
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

  const filteredAreas = useMemo(() => {
    return processedAreas.filter((area) => {
      if (priorityFilter !== "Semua") {
        if (priorityFilter === "Tinggi" && area.status !== "Prioritas Tinggi") return false;
        if (priorityFilter === "Sedang" && area.status !== "Prioritas Sedang") return false;
        if (priorityFilter === "Rendah" && area.status !== "Prioritas Rendah") return false;
      }
      return true;
    });
  }, [processedAreas, priorityFilter]);

  const filteredTransits = useMemo(() => {
    const keyword = searchTerm.toLowerCase();
    return processedTransits.filter((item) => {
      if (!mapToggles[item.category]) return false;
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (keyword && !item.name.toLowerCase().includes(keyword) && !item.detail.toLowerCase().includes(keyword)) return false;
      return true;
    });
  }, [processedTransits, searchTerm, selectedCategory, mapToggles]);

  const stats = useMemo(() => {
    const counts = { Pendidikan: 0, Kesehatan: 0, Perdagangan: 0, Pemerintahan: 0, Lainnya: 0 };
    processedTransits.forEach(t => counts[t.category]++);
    return { total: processedTransits.length, ...counts };
  }, [processedTransits]);

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
      
      {/* 1. TOP HEADER (Using Landing Page Component) */}
      <div className="relative z-[9999] h-[80px]">
        {/* We reuse the SiteHeader here. Since it has absolute positioning, we wrap it in a container with height */}
        <SiteHeader variant="light" />
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden px-4 pb-4 md:px-6 md:pb-6 pt-4">
        
        {/* 3. THREE-COLUMN DASHBOARD GRID */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 overflow-hidden max-w-[1600px] mx-auto w-full">
          
          {/* LEFT COLUMN: Explore Panel (Col 3) */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="col-span-1 md:col-span-3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-1 pb-4">
            
            {/* Search Card */}
            <div className="bg-[#002F45] rounded-3xl p-5 md:p-6 text-white relative overflow-hidden shadow-lg shadow-[#002F45]/20">
              <div className="relative z-10">
                <h2 className="text-xl font-bold leading-tight mb-2">Pusat Aktivitas<br/>Bandar Lampung</h2>
                <p className="text-xs text-[#BCD4CC] mb-5 leading-relaxed pr-6">Pencarian fasilitas publik & pergerakan warga.</p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#002F45]" />
                  <input 
                    type="text" 
                    placeholder="Cari nama tempat / aktivitas..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white rounded-xl py-3 pl-10 pr-10 text-sm text-[#12303C] outline-none focus:ring-2 focus:ring-[#E3A750]"
                  />
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#E3A750] rounded-full blur-2xl opacity-20"></div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-4 border border-white/60 shadow-sm flex justify-between">
              {[
                { id: "all", label: "Semua", icon: <MapPin size={18} />, count: stats.total, colorClass: "text-[#002F45]" },
                { id: "Pendidikan", label: "Pendidikan", icon: <GraduationCap size={18} />, count: stats.Pendidikan, colorClass: "text-blue-500" },
                { id: "Perdagangan", label: "Niaga", icon: <ShoppingBag size={18} />, count: stats.Perdagangan, colorClass: "text-amber-500" },
                { id: "Pemerintahan", label: "Pemerintah", icon: <Building2 size={18} />, count: stats.Pemerintahan, colorClass: "text-purple-500" },
              ].map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center gap-1 ${selectedCategory === cat.id ? 'text-[#002F45]' : 'text-[#5E7580] hover:text-[#002F45]'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedCategory === cat.id ? 'bg-[#002F45] text-[#E3A750] shadow-md' : 'bg-[#EEF3F0] ' + cat.colorClass}`}>
                    {cat.icon}
                  </div>
                  <span className="text-[10px] font-semibold">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <h3 className="text-sm font-bold text-[#12303C]">Prioritas Wilayah</h3>
              </div>
              <div className="flex gap-2">
                {["Tinggi", "Sedang", "Rendah", "Semua"].map(p => (
                  <button 
                    key={p} onClick={() => setPriorityFilter(p)}
                    className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg border transition-all ${priorityFilter === p ? 'bg-white border-[#002F45] text-[#002F45] shadow-sm' : 'border-[#EEF3F0] bg-white text-[#5E7580] hover:bg-[#EEF3F0]'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="mt-2 flex flex-col gap-3 flex-1 overflow-y-auto">
              <div className="flex justify-between items-end mb-1">
                <h3 className="text-sm font-bold text-[#12303C]">Daftar Fasilitas Publik</h3>
                <span className="text-[10px] text-[#5E7580] font-semibold">{filteredTransits.length} lokasi</span>
              </div>
              
              {filteredTransits.slice(0, 50).map(item => (
                <div 
                  key={item.id} 
                  onClick={() => handleSelectTransport(item)}
                  className={`flex gap-3 bg-white p-3 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${selectedTransportId === item.id ? 'border-[#002F45] shadow-md ring-1 ring-[#002F45]/20' : 'border-transparent shadow-sm'}`}
                >
                  <div className={`w-12 h-12 ${item.colorData.light} ${item.colorData.text} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {getActivityIcon(item.category, 20)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#12303C] truncate">{item.name}</h4>
                    <p className="text-[10px] font-semibold text-[#5E7580] uppercase tracking-wide mt-0.5">{item.category}</p>
                    <p className="text-[11px] text-[#5E7580] line-clamp-1 mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CENTER COLUMN: Map Panel (Col 6) */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-4 overflow-hidden">
            
            <div className="flex-1 bg-white rounded-3xl border border-white/60 shadow-sm overflow-hidden flex flex-col p-4 relative">
              <div className="flex justify-between items-center mb-4 px-2">
                <div>
                  <h2 className="text-lg font-bold text-[#12303C]">Peta Analisis Transportasi</h2>
                  <p className="text-xs text-[#5E7580]">Visualisasi sebaran fasilitas publik dan kebutuhan rute</p>
                </div>
              </div>

              {/* Map Toggles overlaying */}
              <div className="absolute top-[80px] left-6 z-[1000] flex gap-2 flex-wrap max-w-[80%]">
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-sm transition-all border ${mapToggles[t.id] ? 'bg-white border-white/60 text-[#12303C]' : 'bg-white/80 border-transparent text-[#5E7580] opacity-60'}`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-sm ${mapToggles[t.id] ? t.color : 'bg-slate-300'}`}></div>
                    {t.id}
                  </button>
                ))}
              </div>

              {/* Map Container */}
              <div className="flex-1 rounded-2xl overflow-hidden border border-[#EEF3F0] shadow-inner relative z-0">
                <MapView
                  filteredAreas={filteredAreas}
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

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 shrink-0">
              {[
                { label: "Pendidikan", value: stats.Pendidikan, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
                { label: "Kesehatan", value: stats.Kesehatan, color: "text-red-500", bg: "bg-red-50", border: "border-red-100" },
                { label: "Perdagangan", value: stats.Perdagangan, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
                { label: "Pemerintahan", value: stats.Pemerintahan, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-100" },
                { label: "Total Titik", value: stats.total, color: "text-[#002F45]", bg: "bg-[#002F45]/5", border: "border-[#002F45]/10" },
              ].map((stat, i) => (
                <div key={i} className={`bg-white rounded-2xl p-3 border ${stat.border} shadow-sm flex flex-col items-center justify-center text-center`}>
                  <span className={`text-xl font-black ${stat.color} mb-0.5`}>{stat.value}</span>
                  <span className="text-[9px] font-bold text-[#5E7580] uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Insights Panel (Col 3 / 2) */}
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-1 pb-4">
            
            {/* Informasi Aktivitas Chart */}
            <div className="bg-white rounded-3xl p-5 border border-white/60 shadow-sm">
              <h3 className="text-sm font-bold text-[#12303C] mb-1">Sebaran Aktivitas</h3>
              <p className="text-[10px] text-[#5E7580] mb-5">Proporsi fasilitas publik kota</p>
              
              <div className="flex flex-col items-center gap-4">
                {/* CSS Simulated Doughnut Chart */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#EEF3F0" strokeWidth="4" />
                    <path strokeDasharray={`${(stats.Pendidikan/stats.total)*100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="5" strokeDashoffset="0" />
                    <path strokeDasharray={`${(stats.Kesehatan/stats.total)*100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ef4444" strokeWidth="5" strokeDashoffset={`-${(stats.Pendidikan/stats.total)*100}`} />
                    <path strokeDasharray={`${(stats.Perdagangan/stats.total)*100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="5" strokeDashoffset={`-${((stats.Pendidikan+stats.Kesehatan)/stats.total)*100}`} />
                    <path strokeDasharray={`${(stats.Pemerintahan/stats.total)*100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#a855f7" strokeWidth="5" strokeDashoffset={`-${((stats.Pendidikan+stats.Kesehatan+stats.Perdagangan)/stats.total)*100}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-[#12303C]">{stats.total}</span>
                    <span className="text-[8px] font-bold text-[#5E7580] uppercase">Titik</span>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  {[
                    { label: "Pendidikan", val: stats.Pendidikan, color: "bg-blue-500" },
                    { label: "Kesehatan", val: stats.Kesehatan, color: "bg-red-500" },
                    { label: "Niaga", val: stats.Perdagangan, color: "bg-amber-500" },
                    { label: "Pemerintah", val: stats.Pemerintahan, color: "bg-purple-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                        <span className="font-semibold text-[#5E7580]">{item.label}</span>
                      </div>
                      <span className="font-bold text-[#12303C]">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insight Wilayah */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-end mb-3">
                <h3 className="text-sm font-bold text-[#12303C]">Insight Wilayah</h3>
              </div>

              <div className="space-y-3 flex-1">
                <div className="bg-white rounded-2xl p-4 border border-red-100 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                        <MapPin size={12} />
                      </div>
                      <h4 className="text-xs font-bold text-[#12303C]">Prioritas Tinggi</h4>
                    </div>
                    <div className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{recommendationPoints.length} Titik</div>
                  </div>
                  <p className="text-[10px] text-[#5E7580] leading-relaxed">Kawasan dengan tingkat aktivitas publik tinggi namun minim rute angkutan.</p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                        <Activity size={12} />
                      </div>
                      <h4 className="text-xs font-bold text-[#12303C]">Pusat Pendidikan</h4>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#5E7580] leading-relaxed">Konsentrasi pergerakan pelajar pada jam sibuk membutuhkan rute khusus.</p>
                </div>
              </div>
            </div>

          </motion.div>

        </main>
      </div>
    </div>
  );
}
