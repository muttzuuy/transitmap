import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../assets/landing/bandar-lampung-hero.png";
import dashboardImage from "../assets/landing/laptop-dashboard.png";
import cityMapImage from "../assets/landing/city-map.png";





const points = [
  "Struktur wilayah hingga tingkat kelurahan",
  "Analisis konektivitas dan aksesibilitas layanan",
  "Dasar pengambilan keputusan berbasis data",
  "Mendukung perencanaan berkelanjutan",
];

function CitySection() {
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





const stats = [
  { icon: MapIcon, value: "+1.200", label: "Area Terpetakan" },
  { icon: BarChartIcon, value: "15", label: "Indikator Analisis" },
  { icon: BusIcon, value: "8", label: "Moda Transportasi" },
  { icon: DatabaseIcon, value: "100%", label: "Data Terintegrasi" },
];

function CtaSection() {
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

function FeaturesSection() {
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







const stats2 = [
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

function HeroSection() {
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
            {stats2.map((item) => (
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


function IconBase({ children, className = "h-5 w-5", viewBox = "0 0 24 24" }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

function PlayCircleIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4Z" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function MapIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2Z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </IconBase>
  );
}

function SearchIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </IconBase>
  );
}

function MenuIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

function CloseIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  );
}

function TrendingUpIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 16 10 10l4 4 6-8" />
      <path d="M20 6v6h-6" />
    </IconBase>
  );
}

function BusIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M7 18V8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v10" />
      <path d="M7 10h10" />
      <path d="M8 18h8" />
      <circle cx="9" cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function BarChartIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 19V9" />
      <path d="M12 19V5" />
      <path d="M19 19v-7" />
      <path d="M4 19h16" />
    </IconBase>
  );
}

function CheckCircleIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.3 2.3 4.8-5.1" />
    </IconBase>
  );
}

function LayersIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </IconBase>
  );
}

function FlameIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12.5 3.5c1.6 2.4.9 4.4-.6 5.8-1.5 1.4-2 2.6-2 4.1a4.1 4.1 0 0 0 8.2 0c0-3.7-2-5.9-5.6-9.9Z" />
      <path d="M10.5 14.2c.2 2 1.5 3.3 3 3.3 1.7 0 2.8-1.3 2.8-3.1 0-1.1-.5-2.1-1.8-3.5-.2 1.3-.8 2.1-1.7 2.7-.8.5-1.5.2-2.3.6Z" />
    </IconBase>
  );
}

function FileDownIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M12 11v6" />
      <path d="m9.5 14.5 2.5 2.5 2.5-2.5" />
    </IconBase>
  );
}

function ActivityIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 12h4l2-5 4 10 2-5h6" />
    </IconBase>
  );
}

function DatabaseIcon(props) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </IconBase>
  );
}

function MapPinIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 21s6-4.4 6-10a6 6 0 1 0-12 0c0 5.6 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </IconBase>
  );
}

function GlobeIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </IconBase>
  );
}

function SendIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m21 3-9 18-2.5-7.5L2 11l19-8Z" />
    </IconBase>
  );
}

function AtSignIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M15.5 15.5c-.9.8-1.8 1.2-2.8 1.2-2.1 0-3.7-1.5-3.7-3.9 0-2.8 2-4.8 4.8-4.8 2.7 0 4.6 1.8 4.6 4.8v1.3c0 1.2.7 1.7 1.5 1.7" />
      <path d="M15 12.8c0 1.6-.9 2.7-2.2 2.7s-2.2-1.1-2.2-2.7.9-2.8 2.2-2.8S15 11.2 15 12.8Z" />
    </IconBase>
  );
}

function ShareIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="18" cy="5" r="2" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="m8 11 8-5" />
      <path d="m8 13 8 5" />
    </IconBase>
  );
}

function ArrowUpRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </IconBase>
  );
}




const columns = [
  { title: "Platform", links: ["Beranda", "Fitur", "Peta", "Data", "Tentang"] },
  { title: "Bantuan", links: ["Panduan", "FAQ", "Kontak", "Kebijakan Privasi"] },
];

function SiteFooter() {
  return (
    <footer id="kontak" className="border-t border-[#002F45]/8 bg-white/72 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#002F45] text-white shadow-lg shadow-[#002F45]/15">
                <MapIcon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold leading-tight text-[#12303C]">
                Bandar Lampung
                <br />
                Transport
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#5E7580]">
              WebGIS Transportasi untuk perencanaan kota yang lebih cerdas dan
              berkelanjutan.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[GlobeIcon, SendIcon, AtSignIcon, ShareIcon].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF3F0] text-[#45606C] transition-colors hover:bg-[#002F45] hover:text-white"
                  aria-label="Social media"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-[#12303C]">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#5E7580] transition-colors hover:text-[#002F45]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-sm font-semibold text-[#12303C]">Kontak</p>
            <div className="mt-4 space-y-2 text-sm text-[#5E7580]">
              <p>Jl. Dr. Susilo No. 2, Enggal Bandar Lampung, Indonesia</p>
              <p>info@bandarlampung.go.id</p>
              <p>(0721) 1234 5678</p>
            </div>

            <p className="mt-6 text-sm font-semibold text-[#12303C]">Newsletter</p>
            <p className="mt-2 text-xs leading-relaxed text-[#5E7580]">
              Dapatkan update dan informasi terbaru seputar transportasi kota.
            </p>
            <form className="mt-3 flex items-center gap-2 rounded-full border border-[#002F45]/10 bg-[#F6F4EE] p-1 pl-4">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#12303C] outline-none placeholder:text-[#7B8F97]"
              />
              <button
                type="submit"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#002F45] text-white"
                aria-label="Berlangganan"
              >
                <ArrowUpRightIcon className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#002F45]/8 pt-6 text-xs text-[#6B818A] sm:flex-row">
          <p>© 2024 Bandar Lampung Transport. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#002F45]">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-[#002F45]">
              Syarat &amp; Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}






const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Fitur", href: "#fitur" },
  { label: "Peta", href: "/map", isRoute: true },
  { label: "Data", href: "#visualisasi" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

function NavItem({ item, active = false, onClick }) {
  const className = `rounded-full px-3.5 py-1.5 text-sm transition-all duration-300 ${
    active
      ? "bg-white/16 font-semibold text-white shadow-sm"
      : "text-white/72 hover:bg-white/10 hover:text-white"
  }`;

  if (item.isRoute) {
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between gap-4 rounded-[28px] border border-white/15 bg-[#002F45]/42 px-5 py-3 shadow-2xl shadow-[#002F45]/20 ring-1 ring-white/8 backdrop-blur-xl lg:px-6">
        <a href="#beranda" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E3A750] to-[#BCD4CC] text-[#002F45] shadow-lg shadow-[#E3A750]/25">
            <MapIcon className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
            Bandar Lampung Transport
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1.5 py-1.5 lg:flex">
          {navItems.map((item, index) => (
            <NavItem key={item.label} item={item} active={index === 0} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white/65 transition-all duration-300 hover:bg-white/10 hover:text-white"
            aria-label="Cari data"
          >
            <SearchIcon className="h-4 w-4" />
            <span className="hidden lg:inline">Cari data, peta, lokasi...</span>
          </button>
          <Link
            to="/map"
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E3A750] to-[#F1BE71] px-4 py-2 text-sm font-semibold text-[#002F45] shadow-lg shadow-[#E3A750]/30 transition-all duration-300 hover:scale-[1.03]"
          >
            Masuk ke Peta
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-xl p-2 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="mx-4 mt-3 rounded-[28px] border border-[#002F45]/10 bg-white/95 p-4 shadow-2xl backdrop-blur md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-[#32515F] transition hover:bg-[#BCD4CC]/30 hover:text-[#002F45]"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-[#32515F] transition hover:bg-[#BCD4CC]/30 hover:text-[#002F45]"
                >
                  {item.label}
                </a>
              ),
            )}
            <Link
              to="/map"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#002F45] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#002F45]/15"
            >
              Masuk ke Peta <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}






const features = [
  {
    icon: LayersIcon,
    title: "Peta interaktif dan layer dinamis",
    desc: "Eksplorasi data spasial secara real-time",
  },
  {
    icon: FlameIcon,
    title: "Heatmap dan analisis kepadatan",
    desc: "Menemukan pola aktivitas dan kepadatan",
  },
  {
    icon: FileDownIcon,
    title: "Laporan dan ekspor data",
    desc: "Unduh data dan hasil analisis dengan mudah",
  },
  {
    icon: ActivityIcon,
    title: "Monitoring indikator kinerja",
    desc: "Pantau perkembangan mobilitas dari waktu ke waktu",
  },
];

function VisualizationSection() {
  return (
    <section id="visualisasi" className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#002F45]/12 via-[#BCD4CC]/18 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-[32px] border border-white/80 bg-gradient-to-br from-[#EEF3F0] via-white to-[#F2ECE2] p-6 shadow-2xl shadow-[#002F45]/10 transition-transform duration-300 hover:scale-[1.01]">
            <img
              src={dashboardImage}
              alt="Dashboard WebGIS pada laptop dengan heatmap dan grafik"
              className="w-full rounded-[20px] drop-shadow-xl"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#002F45]/12 bg-[#002F45]/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-[#002F45]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#002F45]" /> Visualisasi Interaktif
          </span>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-[#12303C] sm:text-4xl">
            Lihat, Pahami, Putuskan Dengan Data yang Akurat
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-[#5E7580]">
            Visualisasi interaktif membantu Anda melihat pola, menemukan insight,
            dan mengevaluasi skenario perencanaan dengan lebih cepat.
          </p>

          <div className="mt-8 space-y-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 rounded-[22px] border border-transparent p-3 transition-all duration-300 hover:border-[#002F45]/8 hover:bg-white/70 hover:shadow-lg hover:shadow-[#002F45]/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#002F45]/10 text-[#002F45] ring-1 ring-[#002F45]/10">
                  <feature.icon className="h-5 w-5" />
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-semibold text-[#12303C]">{feature.title}</p>
                  <p className="text-sm text-[#5E7580]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}



export default function Landing() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#F6F4EE_0%,#F1F4F0_52%,#F6F4EE_100%)] text-[#12303C]">
      <SiteHeader />
      <HeroSection />
      <CitySection />
      <VisualizationSection />
      <FeaturesSection />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}
