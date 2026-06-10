import { motion } from "framer-motion";
import { ArrowRightIcon, BarChartIcon, BusIcon, MapIcon } from "./LandingIcons";

const cards = [
  {
    icon: MapIcon,
    title: "Area Prioritas",
    desc: "Identifikasi wilayah dan koridor yang membutuhkan intervensi transportasi paling cepat.",
    tone: "bg-[#002F45]/10 text-[#002F45]",
  },
  {
    icon: BarChartIcon,
    title: "Kepadatan Aktivitas",
    desc: "Pantau distribusi pusat-pusat aktivitas masyarakat dalam berbagai waktu dan kondisi.",
    tone: "bg-[#BCD4CC]/30 text-[#2D5966]",
  },
  {
    icon: BusIcon,
    title: "Akses Transportasi",
    desc: "Evaluasi keterjangkauan dan jaringan layanan transportasi untuk seluruh kecamatan.",
    tone: "bg-[#E3A750]/16 text-[#A86F1C]",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="fitur"
      className="relative bg-[linear-gradient(180deg,#F6F4EE_0%,#EEF3F0_52%,#E7EEEB_100%)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#002F45]/12 bg-[#002F45]/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-[#002F45]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#002F45]" /> Fitur Utama Analisis
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-[#12303C] sm:text-4xl">
            Semua yang Anda Butuhkan dalam Satu Platform
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
              className="group rounded-[30px] border border-white/70 bg-white/88 p-8 shadow-xl shadow-[#002F45]/6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#002F45]/10 hover:shadow-2xl hover:shadow-[#002F45]/10"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.tone} ring-1 ring-inset ring-current/10 transition-transform duration-300 group-hover:scale-110`}
              >
                <card.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-[#12303C]">
                {card.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#5E7580]">{card.desc}</p>
              <a
                href="#visualisasi"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#002F45] transition-all duration-300 group-hover:gap-2.5"
              >
                Pelajari lebih lanjut <ArrowRightIcon className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
