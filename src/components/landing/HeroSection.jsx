import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/landing/bandar-lampung-hero.png";
import {
  ArrowRightIcon,
  BarChartIcon,
  BusIcon,
  MapIcon,
  PlayCircleIcon,
  TrendingUpIcon,
} from "./LandingIcons";

const stats = [
  {
    icon: MapIcon,
    value: "1.200+",
    label: "Area Terpetakan",
    sub: "Wilayah dan koridor strategis",
    iconClass: "bg-white/10 text-[#BCD4CC]",
  },
  {
    icon: TrendingUpIcon,
    value: "78%",
    label: "Cakupan Layanan",
    sub: "Layanan transportasi aktif",
    iconClass: "bg-[#BCD4CC]/20 text-[#BCD4CC]",
  },
  {
    icon: BusIcon,
    value: "7.8",
    label: "Skor Konektivitas",
    sub: "Rata-rata indeks kota",
    iconClass: "bg-[#E3A750]/16 text-[#E3A750]",
  },
  {
    icon: BarChartIcon,
    value: "15",
    label: "Indikator Analisis",
    sub: "Parameter terintegrasi",
    iconClass: "bg-white/10 text-[#E8F0ED]",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut", delay },
  }),
};

export default function HeroSection() {
  return (
    <section id="beranda" className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Pemandangan udara Kota Bandar Lampung"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002F45]/95 via-[#002F45]/78 to-[#002F45]/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002F45]/72 via-[#002F45]/12 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_28%,rgba(227,167,80,0.24),transparent_16%),radial-gradient(circle_at_22%_76%,rgba(188,212,204,0.2),transparent_18%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-36 pt-36 lg:pb-44 lg:pt-44">
        <motion.span
          initial="hidden"
          animate="visible"
          custom={0.05}
          variants={fadeInUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-white backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#BCD4CC]" /> Smart Mobility Platform
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.12}
          variants={fadeInUp}
          className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-7xl"
        >
          WebGIS Transportasi Kota{" "}
          <span className="bg-gradient-to-r from-[#BCD4CC] to-[#E3A750] bg-clip-text text-transparent">
            Bandar Lampung
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeInUp}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          Platform analisis spasial berbasis data untuk memahami mobilitas kota,
          mengidentifikasi wilayah prioritas, dan mendukung perencanaan transportasi
          yang lebih efektif.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.28}
          variants={fadeInUp}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/map"
            className="group inline-flex items-center gap-2 rounded-full bg-[#E3A750] px-7 py-4 text-sm font-semibold text-[#002F45] shadow-xl shadow-[#E3A750]/25 transition-all duration-300 hover:scale-[1.03] hover:bg-[#ECB86A] hover:shadow-2xl"
          >
            Jelajahi Peta
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#fitur"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-white/20"
          >
            Pelajari Platform <PlayCircleIcon className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.34 }}
          className="mt-16 rounded-[30px] border border-white/35 bg-white/84 p-2.5 shadow-2xl shadow-[#002F45]/25 backdrop-blur-xl lg:max-w-4xl"
        >
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3.5 rounded-[22px] p-4 transition-all duration-300 hover:bg-[#BCD4CC]/18"
              >
                <span
                  className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.iconClass}`}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold leading-none tracking-tight text-[#12303C]">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-[#24404C]">{item.label}</p>
                  <p className="text-[11px] leading-tight text-[#5E7580]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[5] leading-[0]">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="h-[60px] w-full sm:h-[90px] lg:h-[120px]"
          aria-hidden="true"
        >
          <path
            d="M0,120 L0,64 C240,8 480,0 720,28 C960,56 1200,108 1440,72 L1440,120 Z"
            fill="#F6F4EE"
          />
        </svg>
      </div>
    </section>
  );
}
