import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import MapExplorer from "./map-explorer";
import MapView from "./map-view";

const priorityOptions = ["Prioritas Tinggi", "Prioritas Sedang", "Prioritas Rendah"];

const transportTypeLabels = {
  all: "Semua kategori",
  2: "Layanan finansial",
  4: "Akomodasi",
  6: "Pusat niaga modern",
  7: "Pasar tradisional",
  9: "Pemerintahan",
  999: "Layanan umum lainnya",
  unknown: "Kategori lainnya",
};

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
    fill: "#16a34a",
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

function getTransportType(feature) {
  const fungsi = feature?.properties?.FUNGSI;
  if (fungsi === null || fungsi === undefined) {
    return "9";
  }

  const key = String(fungsi);
  return transportTypeLabels[key] ? key : "unknown";
}

function getFeatureCenter(feature) {
  const layer = L.geoJSON(feature);
  const bounds = layer.getBounds();
  return bounds.isValid() ? bounds.getCenter() : L.latLng(-5.45, 105.26);
}

function StatsCard({ label, value, description, accent = "emerald" }) {
  const accentClass =
    accent === "emerald"
      ? "from-emerald-500/15 to-emerald-500/0"
      : accent === "blue"
        ? "from-sky-500/15 to-sky-500/0"
        : accent === "amber"
          ? "from-amber-500/15 to-amber-500/0"
          : "from-slate-500/15 to-slate-500/0";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-4 h-1.5 w-16 rounded-full bg-gradient-to-r ${accentClass}`} />
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export default function MapPage() {
  const [geoData, setGeoData] = useState(null);
  const [transitData, setTransitData] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState({
    "Prioritas Tinggi": true,
    "Prioritas Sedang": true,
    "Prioritas Rendah": true,
  });
  const [selectedTransportType, setSelectedTransportType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedTransportId, setSelectedTransportId] = useState(null);
  const [focusTarget, setFocusTarget] = useState(null);

  const areaLayerRefs = useRef({});
  const markerRefs = useRef({});

  useEffect(() => {
    fetch("/data/heatmap.geojson")
      .then((res) => res.json())
      .then(setGeoData);
  }, []);

  useEffect(() => {
    fetch("/data/transit.geojson")
      .then((res) => res.json())
      .then(setTransitData);
  }, []);

  const processedAreas = useMemo(() => {
    if (!geoData?.features) return [];

    return geoData.features.map((feature, index) => {
      const status = feature?.properties?.rekomendasi || "Tidak diketahui";
      const areaName =
        feature?.properties?.WADMKC ||
        feature?.properties?.NAMOBJ ||
        feature?.properties?.WADMKK ||
        `Wilayah ${index + 1}`;
      const id = `${areaName}-${index}`;

      return {
        id,
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
      const coordinates = feature?.geometry?.coordinates || [105.26, -5.45];
      const [lng, lat] = coordinates;
      const typeKey = getTransportType(feature);
      const name = feature?.properties?.NAMOBJ || `Titik Transportasi ${index + 1}`;
      const detail =
        feature?.properties?.REMARK ||
        transportTypeLabels[typeKey] ||
        transportTypeLabels.unknown;

      return {
        id: `${name}-${index}`,
        feature,
        name,
        detail,
        lat,
        lng,
        latlng: [lat, lng],
        typeKey,
        typeLabel: transportTypeLabels[typeKey] || transportTypeLabels.unknown,
      };
    });
  }, [transitData]);

  const filteredAreas = useMemo(
    () => processedAreas.filter((area) => priorityFilter[area.status]),
    [processedAreas, priorityFilter],
  );

  const filteredTransits = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return processedTransits.filter((item) => {
      const matchesType =
        selectedTransportType === "all" || item.typeKey === selectedTransportType;
      const matchesSearch =
        keyword.length === 0 ||
        item.name.toLowerCase().includes(keyword) ||
        item.detail.toLowerCase().includes(keyword);

      return matchesType && matchesSearch;
    });
  }, [processedTransits, searchTerm, selectedTransportType]);

  const selectedTransport =
    processedTransits.find((item) => item.id === selectedTransportId) || null;

  const activeInsightArea =
    processedAreas.find((area) => area.id === selectedAreaId) || filteredAreas[0] || null;

  const summary = useMemo(() => {
    const highPriorityCount = processedAreas.filter(
      (area) => area.status === "Prioritas Tinggi",
    ).length;

    const serviceCoverage = processedAreas.length
      ? Math.round(
          (processedAreas.filter((area) => Number(area.transportCount) > 0).length /
            processedAreas.length) *
            100,
        )
      : 0;

    const mobilityIndex = processedAreas.length
      ? (
          processedAreas.reduce((acc, area) => {
            if (area.status === "Prioritas Tinggi") return acc + 55;
            if (area.status === "Prioritas Sedang") return acc + 72;
            if (area.status === "Prioritas Rendah") return acc + 86;
            return acc + 68;
          }, 0) / processedAreas.length
        ).toFixed(1)
      : "0.0";

    return {
      highPriorityCount,
      serviceCoverage,
      totalTransits: processedTransits.length,
      mobilityIndex,
    };
  }, [processedAreas, processedTransits]);

  const transportTypeOptions = useMemo(() => {
    const found = Array.from(new Set(processedTransits.map((item) => item.typeKey)));
    const options = found
      .map((key) => ({
        value: key,
        label: transportTypeLabels[key] || transportTypeLabels.unknown,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return [{ value: "all", label: transportTypeLabels.all }, ...options];
  }, [processedTransits]);

  const recommendationText = useMemo(() => {
    if (!activeInsightArea) return "Belum ada area terpilih.";
    if (activeInsightArea.status === "Prioritas Tinggi") {
      return "Perlu penguatan layanan dan evaluasi koridor utama untuk menaikkan kualitas akses transportasi.";
    }
    if (activeInsightArea.status === "Prioritas Sedang") {
      return "Fokus pada peningkatan konektivitas simpul transit dan penguatan jangkauan layanan pendukung.";
    }
    return "Area relatif stabil dan perlu dipantau untuk menjaga kualitas cakupan layanan.";
  }, [activeInsightArea]);

  const chartData = useMemo(() => {
    const counts = priorityOptions.map((status) => ({
      status,
      count: processedAreas.filter((area) => area.status === status).length,
      color: getPriorityConfig(status).fill,
    }));

    const max = Math.max(...counts.map((item) => item.count), 1);

    return counts.map((item) => ({
      ...item,
      width: `${(item.count / max) * 100}%`,
    }));
  }, [processedAreas]);

  const handlePriorityToggle = (status) => {
    setPriorityFilter((current) => ({
      ...current,
      [status]: !current[status],
    }));
  };

  const handleSelectTransport = (item) => {
    setSelectedTransportId(item.id);
    setFocusTarget({
      center: item.latlng,
      zoom: 15,
    });

    const maybeMarker = markerRefs.current[item.id];
    if (maybeMarker) {
      maybeMarker.openPopup();
    }
  };

  const handleSelectArea = (area, bounds) => {
    setSelectedAreaId(area.id);
    setFocusTarget(
      bounds
        ? { bounds }
        : {
            bounds: L.geoJSON(area.feature).getBounds(),
          },
    );

    const maybeLayer = areaLayerRefs.current[area.id];
    if (maybeLayer) {
      maybeLayer.openPopup();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-6">
          <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Eksplorasi Mobilitas Kota
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-500 md:text-base">
            Analisis wilayah prioritas, sebaran titik transportasi, dan insight layanan
            mobilitas Bandar Lampung dalam antarmuka WebGIS yang lebih rapi dan terstruktur.
          </p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            label="Area Prioritas"
            value={summary.highPriorityCount}
            description="Wilayah yang membutuhkan intervensi transportasi paling tinggi."
            accent="emerald"
          />
          <StatsCard
            label="Cakupan Layanan"
            value={`${summary.serviceCoverage}%`}
            description="Persentase area dengan dukungan titik layanan transportasi."
            accent="blue"
          />
          <StatsCard
            label="Jumlah Titik Transportasi"
            value={summary.totalTransits}
            description="Seluruh titik layanan yang termuat dalam peta aktif."
            accent="amber"
          />
          <StatsCard
            label="Indeks Mobilitas"
            value={summary.mobilityIndex}
            description="Indeks indikatif berbasis prioritas wilayah dan akses layanan."
            accent="slate"
          />
        </section>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-4">
            <MapExplorer
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priorityOptions={priorityOptions}
              priorityFilter={priorityFilter}
              onPriorityToggle={handlePriorityToggle}
              transportTypeOptions={transportTypeOptions}
              selectedTransportType={selectedTransportType}
              onTransportTypeChange={setSelectedTransportType}
              filteredTransits={filteredTransits}
              selectedTransportId={selectedTransportId}
              onSelectTransport={handleSelectTransport}
              insightArea={activeInsightArea}
              recommendationText={recommendationText}
              onFocusArea={() => activeInsightArea && handleSelectArea(activeInsightArea)}
              getPriorityTone={(status) => getPriorityConfig(status).soft}
            />
          </div>

          <div className="col-span-12 xl:col-span-8 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col gap-2">
                <p className="text-sm text-gray-500">Peta Analisis</p>
                <h2 className="text-xl font-semibold text-slate-900">
                  Distribusi Prioritas dan Titik Layanan
                </h2>
                <p className="text-sm leading-6 text-slate-500">
                  Polygon ditampilkan dengan opacity rendah agar marker transportasi tetap jelas dan mudah dibaca.
                </p>
              </div>

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
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">Ringkasan Analitik</p>
                <h3 className="text-xl font-semibold text-slate-900">
                  Komposisi Prioritas Wilayah
                </h3>
              </div>

              <div className="mt-6 space-y-5">
                {chartData.map((item) => (
                  <div key={item.status}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{item.status}</span>
                      <span className="text-slate-500">{item.count} wilayah</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: item.width,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-[#f9fafb] p-4">
                  <p className="text-sm font-semibold text-slate-900">Zona Prioritas Tinggi</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Memerlukan penguatan konektivitas layanan pada area aktivitas yang masih belum terlayani optimal.
                  </p>
                </div>
                <div className="rounded-lg bg-[#f9fafb] p-4">
                  <p className="text-sm font-semibold text-slate-900">Sebaran Titik Transportasi</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Titik layanan cenderung terkonsentrasi di pusat niaga dan area administratif kota.
                  </p>
                </div>
                <div className="rounded-lg bg-[#f9fafb] p-4">
                  <p className="text-sm font-semibold text-slate-900">Arah Intervensi</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Fokuskan peningkatan layanan pada koridor menengah agar tidak bergeser menjadi prioritas tinggi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
