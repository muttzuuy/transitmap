import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  BarChartIcon,
  BusIcon,
  DatabaseIcon,
  MapIcon,
  MapPinIcon,
} from "./LandingIcons";

const stats = [
  { icon: MapIcon, value: "+1.200", label: "Area Terpetakan" },
  { icon: BarChartIcon, value: "15", label: "Indikator Analisis" },
  { icon: BusIcon, value: "8", label: "Moda Transportasi" },
  { icon: DatabaseIcon, value: "100%", label: "Data Terintegrasi" },
];

export default function CtaSection() {
  return (
    <section id="peta" className="mx-auto max-w-7xl px-6 py-16">
      <div className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#002F45] via-[#0B4861] to-[#1C6278] px-6 py-14 shadow-2xl shadow-[#002F45]/25 sm:px-12 lg:py-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#BCD4CC]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#E3A750]/12 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative grid gap-5 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#BCD4CC] ring-1 ring-white/10 backdrop-blur">
                <stat.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-bold tracking-tight text-white">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-10 max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            Siap Menjelajahi Data Kota?
          </h2>
          <p className="mt-4 leading-relaxed text-white/72">
            Mulai eksplorasi peta interaktif dan dapatkan insight terbaik untuk
            perencanaan transportasi Bandar Lampung.
          </p>
          <Link
            to="/map"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#002F45] shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
          >
            Masuk ke Peta Sekarang
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <MapPinIcon className="absolute -right-1 bottom-12 hidden h-24 w-24 fill-[#BCD4CC]/20 text-white drop-shadow-2xl lg:block" />
      </div>
    </section>
  );
}
