type PriorityStatus = "Prioritas Tinggi" | "Prioritas Sedang" | "Prioritas Rendah";

type TransportItem = {
  id: string;
  name: string;
  detail: string;
  typeKey: string;
  typeLabel: string;
};

type InsightArea = {
  id: string;
  areaName: string;
  status: PriorityStatus | string;
  transportCount: number;
};

type ExplorerProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  priorityOptions: PriorityStatus[];
  priorityFilter: Record<string, boolean>;
  onPriorityToggle: (status: PriorityStatus) => void;
  transportTypeOptions: Array<{ value: string; label: string }>;
  selectedTransportType: string;
  onTransportTypeChange: (value: string) => void;
  filteredTransits: TransportItem[];
  selectedTransportId: string | null;
  onSelectTransport: (item: TransportItem) => void;
  insightArea: InsightArea | null;
  recommendationText: string;
  onFocusArea: () => void;
  getPriorityTone: (status: string) => string;
};

export default function MapExplorer({
  searchTerm,
  onSearchChange,
  priorityOptions,
  priorityFilter,
  onPriorityToggle,
  transportTypeOptions,
  selectedTransportType,
  onTransportTypeChange,
  filteredTransits,
  selectedTransportId,
  onSelectTransport,
  insightArea,
  recommendationText,
  onFocusArea,
  getPriorityTone,
}: ExplorerProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Pencarian Lokasi</p>
        <div className="mt-3 rounded-lg bg-[#f9fafb] p-4">
          <label className="block">
            <span className="sr-only">Cari lokasi atau halte</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cari lokasi, halte, atau kawasan..."
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Filter Analisis</p>
        <div className="mt-3 space-y-4 rounded-lg bg-[#f9fafb] p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Prioritas Wilayah
            </p>
            <div className="mt-3 space-y-2">
              {priorityOptions.map((status) => (
                <label
                  key={status}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={priorityFilter[status]}
                      onChange={() => onPriorityToggle(status)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-slate-700">{status}</span>
                  </span>
                  <span className={`rounded-full px-2 py-1 text-[11px] font-medium ring-1 ${getPriorityTone(status)}`}>
                    aktif
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Jenis Transportasi
            </p>
            <select
              value={selectedTransportType}
              onChange={(event) => onTransportTypeChange(event.target.value)}
              className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              {transportTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Daftar Titik Transportasi</p>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {filteredTransits.length} titik
          </span>
        </div>

        <div className="mt-3 rounded-lg bg-[#f9fafb] p-4">
          <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
            {filteredTransits.map((item) => {
              const active = selectedTransportId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTransport(item)}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                    active
                      ? "border-emerald-300 bg-emerald-50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      {item.typeLabel}
                    </span>
                  </div>
                </button>
              );
            })}

            {filteredTransits.length === 0 && (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                Tidak ada lokasi yang cocok dengan filter.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Insight Wilayah</p>
        <div className="mt-3 rounded-lg bg-emerald-50 p-4">
          {insightArea ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Area Terpilih
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{insightArea.areaName}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white p-3">
                  <p className="text-xs text-slate-500">Status</p>
                  <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${getPriorityTone(insightArea.status)}`}>
                    {insightArea.status}
                  </span>
                </div>
                <div className="rounded-lg bg-white p-3">
                  <p className="text-xs text-slate-500">Jumlah Titik</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{insightArea.transportCount}</p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Rekomendasi
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{recommendationText}</p>
              </div>

              <button
                type="button"
                onClick={onFocusArea}
                className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Fokuskan ke Peta
              </button>
            </div>
          ) : (
            <p className="text-sm leading-6 text-slate-600">
              Pilih area atau titik transportasi untuk melihat insight wilayah secara detail.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
