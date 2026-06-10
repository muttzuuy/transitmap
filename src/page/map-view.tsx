import { GeoJSON, MapContainer, Pane, Popup, TileLayer, useMap, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

type AreaItem = {
  id: string;
  feature: any;
  areaName: string;
  status: string;
  transportCount: number;
};

type TransitItem = {
  id: string;
  name: string;
  detail: string;
  category: string;
  colorData: {
    text: string;
    bg: string;
    light: string;
    hex: string;
  };
  lat: number;
  lng: number;
  latlng: [number, number];
};

type RecommendationItem = {
  id: string;
  areaId: string;
  latlng: [number, number];
  name: string;
  detail: string;
  status: string;
};

type FocusTarget =
  | {
      bounds: L.LatLngBounds;
      center?: never;
      zoom?: never;
    }
  | {
      center: [number, number];
      zoom?: number;
      bounds?: never;
    }
  | null;

type MapViewProps = {
  filteredAreas: AreaItem[];
  filteredTransits: TransitItem[];
  recommendationPoints?: RecommendationItem[];
  activeInsightArea: AreaItem | null;
  selectedTransport: TransitItem | null;
  focusTarget: FocusTarget;
  areaLayerRefs: React.MutableRefObject<Record<string, any>>;
  markerRefs: React.MutableRefObject<Record<string, any>>;
  onSelectArea: (area: AreaItem, bounds?: L.LatLngBounds) => void;
  onSelectTransport: (item: TransitItem) => void;
  getPriorityConfig: (status: string) => {
    fill: string;
    soft: string;
    border: string;
    label: string;
  };
};

const userIcon = L.divIcon({
  className: "custom-user-marker",
  html: `<div style="width: 16px; height: 16px; background-color: #3b82f6; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.4);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const recommendationIcon = L.divIcon({
  className: "custom-recommendation-marker",
  html: `<div class="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white pulse-glow shadow-lg flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-white"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const svgIcons: Record<string, string> = {
  Pendidikan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-white"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  Kesehatan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-white"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  Perdagangan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-white"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  Pemerintahan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-white"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  Lainnya: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-white"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
};

const iconCache: Record<string, L.DivIcon> = {};

const createActivityIcon = (category: string, hexColor: string, active: boolean, isFaded: boolean) => {
  const key = `${category}-${hexColor}-${active}-${isFaded}`;
  if (iconCache[key]) {
    return iconCache[key];
  }

  const size = active ? 36 : 28;
  const shadow = active ? 'shadow-xl shadow-black/40' : 'shadow-md shadow-black/20';
  const scale = active ? 'scale-110 z-50' : 'hover:scale-105';
  const opacity = isFaded ? 'opacity-40 grayscale' : 'opacity-100';
  const icon = svgIcons[category] || svgIcons.Lainnya;
  
  const divIcon = L.divIcon({
    className: "custom-activity-marker",
    html: `
      <div class="flex flex-col items-center justify-center transition-all duration-300 ${scale} ${opacity}" style="width: ${size}px; height: ${size}px;">
        <div class="flex items-center justify-center rounded-xl ${shadow} border-2 border-white w-full h-full" style="background-color: ${hexColor};">
          ${icon}
        </div>
        ${active ? `<div class="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white -mt-0.5 filter drop-shadow-sm"></div>` : ''}
      </div>
    `,
    iconSize: [size, size + (active ? 8 : 0)],
    iconAnchor: [size / 2, size + (active ? 8 : 0)],
    popupAnchor: [0, -(size + (active ? 8 : 0))]
  });

  iconCache[key] = divIcon;
  return divIcon;
};

function FocusMap({ target, userLocation }: { target: FocusTarget; userLocation: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (!target) return;

    if ("bounds" in target && target.bounds) {
      map.fitBounds(target.bounds, { padding: [32, 32] });
      return;
    }

    if ("center" in target && target.center) {
      map.flyTo(target.center, target.zoom || 15, { duration: 0.8 });
    }
  }, [map, target]);

  return null;
}

function RoutingMachine({ start, end, distanceCallback }: { start: [number, number] | null; end: [number, number] | null; distanceCallback?: (dist: string) => void }) {
  const map = useMap();

  useEffect(() => {
    if (!start || !end || !map) return;

    const routingControl = (L as any).Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: "#3b82f6", opacity: 0.8, weight: 6, className: 'animate-route' }]
      },
      createMarker: () => null,
      addWaypoints: false,
      draggableWaypoints: false,
      fitBounds: true,
    }).addTo(map);

    routingControl.on('routesfound', function(e: any) {
      const routes = e.routes;
      const summary = routes[0].summary;
      const dist = summary.totalDistance > 1000 
        ? (summary.totalDistance / 1000).toFixed(1) + ' km' 
        : Math.round(summary.totalDistance) + ' m';
      
      if (distanceCallback) distanceCallback(dist);
    });

    return () => {
      try {
        if (map && routingControl) {
          map.removeControl(routingControl);
        }
      } catch (e) {
        console.error(e);
      }
    };
  }, [map, start, end]);

  return null;
}

export default function MapView({
  filteredAreas,
  filteredTransits,
  recommendationPoints = [],
  activeInsightArea,
  selectedTransport,
  focusTarget,
  areaLayerRefs,
  markerRefs,
  onSelectArea,
  onSelectTransport,
  getPriorityConfig,
}: MapViewProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [routeDestination, setRouteDestination] = useState<[number, number] | null>(null);
  const [routeDistance, setRouteDistance] = useState<string>("");
  const [isLocating, setIsLocating] = useState(false);

  const handleLocateUser = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Gagal mendapatkan lokasi Anda. Pastikan izin lokasi (GPS) diberikan di browser.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleNavigation = (latlng: [number, number]) => {
    if (userLocation) {
      setRouteDestination(latlng);
    } else {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(loc);
          setRouteDestination(latlng);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Gagal mengakses GPS. Izin lokasi diperlukan untuk navigasi rute.");
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const handleOpenGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank");
  };

  const handleOpenReviews = (name: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`, "_blank");
  };

  const closeRoute = () => {
    setRouteDestination(null);
    setRouteDistance("");
  };

  return (
    <div className="relative w-full h-full bg-slate-50">
      
      {/* Lokasi Saya Button Overlaid on Map */}
      <button
        onClick={handleLocateUser}
        disabled={isLocating}
        className="absolute bottom-8 right-8 z-[1000] flex h-14 w-14 items-center justify-center rounded-full bg-[#002F45] text-[#E3A750] shadow-xl ring-2 ring-[#E3A750] transition-all hover:bg-[#E3A750] hover:text-[#002F45] hover:ring-[#002F45] focus:outline-none focus:ring-2 disabled:opacity-70 hover:scale-105"
        aria-label="Lokasi Saya"
        title="Lokasi Saya"
      >
        {isLocating ? (
          <svg className="h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>

      {/* Floating Route Info Panel */}
      {routeDestination && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-4 rounded-full bg-[#002F45]/95 backdrop-blur-md px-6 py-3 shadow-xl ring-1 ring-white/20">
          <div className="flex items-center gap-2 text-[#E3A750]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-white tracking-wide">Jarak Rute: {routeDistance ? `${routeDistance}` : "Menghitung..."}</span>
          </div>
          <div className="w-px h-5 bg-white/20"></div>
          <button
            onClick={closeRoute}
            className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            Tutup Rute
          </button>
        </div>
      )}

      <MapContainer
        center={[-5.45, 105.26]}
        zoom={12}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <FocusMap 
          target={userLocation && isLocating ? { center: userLocation, zoom: 15 } : focusTarget} 
          userLocation={userLocation} 
        />
        
        <RoutingMachine start={userLocation} end={routeDestination} distanceCallback={setRouteDistance} />

        <Pane name="areas" style={{ zIndex: 410 }} />
        <Pane name="markers" style={{ zIndex: 650 }} />
        <Pane name="recommendations" style={{ zIndex: 660 }} />

        {/* Clean minimal tile layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon} zIndexOffset={1000}>
            <Popup>
              <p className="m-0 text-sm font-bold text-slate-800">Lokasi Anda</p>
            </Popup>
          </Marker>
        )}

        {/* Areas / Polygons */}
        {filteredAreas.map((area) => (
          <GeoJSON
            key={area.id}
            data={area.feature}
            pane="areas"
            style={() => {
              const active = activeInsightArea?.id === area.id;
              const config = getPriorityConfig(area.status);

              return {
                color: active ? "#002F45" : config.fill,
                weight: active ? 2.5 : 1,
                fillColor: config.fill,
                fillOpacity: active ? 0.35 : 0.15, // Reduced opacity for cleaner look
              };
            }}
            eventHandlers={{
              click: (event) => onSelectArea(area, event.target.getBounds()),
              mouseover: (event) => {
                event.target.setStyle({ weight: 2.5, fillOpacity: 0.35 });
              },
              mouseout: (event) => {
                const active = activeInsightArea?.id === area.id;
                const config = getPriorityConfig(area.status);
                event.target.setStyle({
                  weight: active ? 2.5 : 1,
                  color: active ? "#002F45" : config.fill,
                  fillOpacity: active ? 0.35 : 0.15,
                });
              },
              add: (event) => {
                areaLayerRefs.current[area.id] = event.target;
              },
            }}
          >
            <Popup className="custom-popup border-0">
              <div className="min-w-[240px] p-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#5E7580] mb-1">Zona Aktivitas</p>
                <h3 className="text-lg font-bold text-[#12303C] leading-tight mb-3">{area.areaName}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${getPriorityConfig(area.status).soft}`}>
                    {area.status}
                  </span>
                </div>
              </div>
            </Popup>
          </GeoJSON>
        ))}

        {/* Activity Points (Using Custom DivIcon instead of CircleMarker) */}
        {filteredTransits.map((item) => {
          const active = selectedTransport?.id === item.id;
          const isFaded = selectedTransport && !active;

          return (
            <Marker
              key={item.id}
              position={item.latlng}
              icon={createActivityIcon(item.category, item.colorData.hex, active, !!isFaded)}
              eventHandlers={{
                click: () => onSelectTransport(item),
                add: (event) => {
                  markerRefs.current[item.id] = event.target;
                },
              }}
            >
              <Popup className="custom-popup border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="min-w-[280px] p-3">
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${item.colorData.bg} text-white mb-3 shadow-sm`}>
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#12303C] leading-tight">{item.name}</h3>
                    <p className="mt-1.5 text-sm text-[#5E7580] line-clamp-2 leading-relaxed">{item.detail}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-[#EEF3F0] pt-3">
                    <button
                      onClick={() => handleNavigation(item.latlng)}
                      className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#002F45]/5 py-2.5 text-[#002F45] font-bold transition-all hover:bg-[#002F45] hover:text-[#E3A750]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[10px] uppercase tracking-wide">Navigasi</span>
                    </button>

                    <button
                      onClick={() => handleOpenGoogleMaps(item.lat, item.lng)}
                      className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2.5 text-slate-600 transition-colors hover:bg-blue-500 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[10px] font-bold tracking-wide uppercase">Maps</span>
                    </button>

                    <button
                      onClick={() => handleOpenReviews(item.name)}
                      className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-slate-50 py-2.5 text-slate-600 transition-colors hover:bg-amber-500 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-[10px] font-bold tracking-wide uppercase">Ulasan</span>
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Recommendation Points */}
        {recommendationPoints.map((item) => (
          <Marker 
            key={item.id} 
            position={item.latlng} 
            icon={recommendationIcon}
          >
            <Popup className="custom-popup border-0 shadow-2xl rounded-2xl overflow-hidden">
              <div className="min-w-[260px] p-3">
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 ring-1 ring-inset ring-emerald-600/20 mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Rekomendasi Cerdas
                  </span>
                  <h3 className="text-lg font-bold text-[#12303C] leading-tight mb-2">{item.name}</h3>
                  <p className="mt-2 text-xs text-[#5E7580] leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
