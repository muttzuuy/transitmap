import { motion } from "framer-motion";
import cityMapImage from "../../assets/landing/city-map.png";
import { ArrowRightIcon, CheckCircleIcon } from "./LandingIcons";

const points = [
  "Struktur wilayah hingga tingkat kelurahan",
  "Analisis konektivitas dan aksesibilitas layanan",
  "Dasar pengambilan keputusan berbasis data",
  "Mendukung perencanaan berkelanjutan",
];

export default function CitySection() {
  return (
    <section
      id="tentang"
      className="relative bg-[linear-gradient(180deg,#EEF3F0_0%,#F4F3ED_50%,#F6F4EE_100%)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#002F45]/12 bg-[#002F45]/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-[#002F45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#002F45]" /> Identitas Kota
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#12303C] sm:text-4xl">
              Memahami Kota, Merancang <span className="text-[#002F45]">Mobilitas</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-[#5E7580]">
              WebGIS Transportasi Bandar Lampung memadukan data spasial, sosial, dan
              transportasi untuk memberikan gambaran menyeluruh tentang kondisi
              mobilitas kota.
            </p>

            <ul className="mt-7 space-y-3.5">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-[#24404C]">
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-[#002F45]" />
                  {point}
                </li>
              ))}
            </ul>

            <a
              href="#visualisasi"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-[#002F45]/10 bg-white/90 px-6 py-3.5 text-sm font-semibold text-[#12303C] shadow-lg shadow-[#002F45]/6 transition-all duration-300 hover:scale-[1.03] hover:border-[#002F45]/20 hover:bg-[#EEF3F0] hover:shadow-xl"
            >
              Selengkapnya tentang Kota
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-[#BCD4CC]/40 via-[#002F45]/10 to-[#E3A750]/12 blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#002F45] p-4 shadow-2xl shadow-[#002F45]/30">
              <div
                className="pointer-events-none absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(188,212,204,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(188,212,204,0.15) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <img
                src={cityMapImage}
                alt="Visualisasi peta wilayah administrasi Bandar Lampung"
                className="relative w-full rounded-[24px]"
              />
            </div>

            <div className="relative z-10 mx-4 -mt-16 rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-2xl shadow-[#002F45]/12 backdrop-blur-xl sm:mx-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#6B818A]">
                Wilayah Administrasi
              </p>
              <div className="mt-4 grid grid-cols-2 gap-y-5">
                <div>
                  <p className="text-3xl font-bold tracking-tight text-[#12303C]">20</p>
                  <p className="text-xs text-[#6B818A]">Kecamatan</p>
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight text-[#12303C]">126</p>
                  <p className="text-xs text-[#6B818A]">Kelurahan</p>
                </div>
                <div className="border-t border-[#002F45]/8 pt-4">
                  <p className="text-xs text-[#6B818A]">Total Luas Wilayah</p>
                  <p className="text-base font-bold text-[#12303C]">197,22 km²</p>
                </div>
                <div className="border-t border-[#002F45]/8 pt-4">
                  <p className="text-xs text-[#6B818A]">Jumlah Penduduk (2024)</p>
                  <p className="text-base font-bold text-[#12303C]">± 1,09 Juta Jiwa</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
