import { CircleMarker, GeoJSON, MapContainer, Pane, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
  typeLabel: string;
  lat: number;
  lng: number;
  latlng: [number, number];
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

function FocusMap({ target }: { target: FocusTarget }) {
  const map = useMap();

  useEffect(() => {
    if (!target) return;

    if ("bounds" in target && target.bounds) {
      map.fitBounds(target.bounds, { padding: [32, 32] });
      return;
    }

    if ("center" in target && target.center) {
      map.flyTo(target.center, target.zoom || 14, { duration: 0.8 });
    }
  }, [map, target]);

  return null;
}

export default function MapView({
  filteredAreas,
  filteredTransits,
  activeInsightArea,
  selectedTransport,
  focusTarget,
  areaLayerRefs,
  markerRefs,
  onSelectArea,
  onSelectTransport,
  getPriorityConfig,
}: MapViewProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <MapContainer
          center={[-5.45, 105.26]}
          zoom={12}
          zoomControl={false}
          className="h-[500px] w-full"
        >
          <FocusMap target={focusTarget} />

          <Pane name="areas" style={{ zIndex: 410 }} />
          <Pane name="markers" style={{ zIndex: 650 }} />

          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          />

          {filteredAreas.map((area) => (
            <GeoJSON
              key={area.id}
              data={area.feature}
              pane="areas"
              style={() => {
                const active = activeInsightArea?.id === area.id;
                const config = getPriorityConfig(area.status);

                return {
                  color: active ? "#0f172a" : "#475569",
                  weight: active ? 2.2 : 1.2,
                  fillColor: config.fill,
                  fillOpacity: active ? 0.26 : 0.2,
                };
              }}
              eventHandlers={{
                click: (event) => onSelectArea(area, event.target.getBounds()),
                mouseover: (event) => {
                  event.target.setStyle({
                    weight: 2.4,
                    fillOpacity: 0.28,
                  });
                },
                mouseout: (event) => {
                  const active = activeInsightArea?.id === area.id;
                  event.target.setStyle({
                    weight: active ? 2.2 : 1.2,
                    fillOpacity: active ? 0.26 : 0.2,
                  });
                },
                add: (event) => {
                  areaLayerRefs.current[area.id] = event.target;
                },
              }}
            >
              <Popup>
                <div className="min-w-[220px] space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Wilayah
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900">{area.areaName}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${getPriorityConfig(area.status).soft}`}>
                      {area.status}
                    </span>
                    <span className="text-xs text-slate-500">{area.transportCount} titik</span>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    {area.status === "Prioritas Tinggi"
                      ? "Memerlukan penguatan layanan transportasi dan evaluasi koridor utama."
                      : area.status === "Prioritas Sedang"
                        ? "Perlu penguatan konektivitas menuju simpul layanan penting."
                        : "Cakupan relatif stabil dengan kebutuhan monitoring berkala."}
                  </p>
                </div>
              </Popup>
            </GeoJSON>
          ))}

          {filteredTransits.map((item) => {
            const active = selectedTransport?.id === item.id;

            return (
              <CircleMarker
                key={item.id}
                center={item.latlng}
                pane="markers"
                radius={active ? 8 : 6}
                pathOptions={{
                  fillColor: active ? "#16a34a" : "#2563eb",
                  color: "#ffffff",
                  weight: active ? 3 : 2,
                  fillOpacity: 0.9,
                }}
                eventHandlers={{
                  click: () => onSelectTransport(item),
                  mouseover: (event) => event.target.setRadius(active ? 9 : 8),
                  mouseout: (event) => event.target.setRadius(active ? 8 : 6),
                  add: (event) => {
                    markerRefs.current[item.id] = event.target;
                  },
                }}
              >
                <Popup>
                  <div className="min-w-[220px] space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Titik Layanan
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-slate-900">{item.name}</h3>
                    </div>
                    <span className="inline-flex rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200">
                      {item.typeLabel}
                    </span>
                    <p className="text-sm leading-6 text-slate-600">{item.detail}</p>
                    <p className="text-xs text-slate-500">
                      Koordinat: {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
