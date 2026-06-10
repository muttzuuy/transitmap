import { useState } from "react";
import SiteHeader from "../components/landing/SiteHeader";
import SiteFooter from "../components/landing/SiteFooter";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../assets/landing/bandar-lampung-hero.png";
import dashboardImage from "../assets/landing/laptop-dashboard.png";
import cityMapImage from "../assets/landing/city-map.png";
import greenBusImage from "../assets/landing/green-bus.png";





const points = [
  "Kepadatan lalu lintas di jam sibuk",
  "Kebutuhan integrasi layanan angkutan umum",
  "Penyebaran pusat aktivitas yang belum merata",
  "Optimalisasi rute dan infrastruktur pejalan kaki",
];

function CitySection() {
  return (
    <section id="tentang" className="relative py-24 lg:py-32 bg-[#F6F4EE] overflow-hidden">
      {/* Elegant minimalist background decor */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#BCD4CC]/30 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-20 right-40 w-80 h-80 bg-[#E3A750]/20 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#002F45_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          
          {/* Text Content - Clean and Spacious */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 relative z-20"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#002F45]/10 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#002F45] shadow-sm">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#E3A750] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E3A750]"></span>
              </span>
              Latar Belakang
            </span>
            
            <h2 className="mt-8 text-4xl lg:text-[2.75rem] font-black tracking-tight text-[#12303C] leading-[1.15]">
              Memahami Kota,<br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-[#002F45]">Merancang Mobilitas</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#E3A750]/30 -z-10 transform -rotate-1" />
              </span>
            </h2>
            
            <p className="mt-6 text-lg text-[#5E7580] leading-relaxed">
              Pertumbuhan populasi Bandar Lampung memicu lonjakan mobilitas harian. Tanpa perencanaan yang presisi berbasis data spasial, kemacetan tidak dapat dihindari.
            </p>
            
            <div className="mt-8 space-y-5">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BCD4CC]/30 text-[#002F45]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <p className="text-[15px] font-semibold text-[#12303C] leading-snug">{point}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <Link
                to="/tentang"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#12303C] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#12303C]/20 transition-all hover:bg-[#002F45] hover:-translate-y-1 hover:shadow-2xl"
              >
                Baca Laporan Lengkap 
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Image Content - Clean Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7 relative z-10 lg:pl-10 mt-12 lg:mt-0"
          >
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#002F45]/15 border-8 border-white bg-white">
                <div className="absolute inset-0 bg-[#002F45]/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <img
                  src={cityMapImage}
                  alt="Peta Bandar Lampung"
                  className="w-full h-[450px] lg:h-[600px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Floating Real-time Badge */}
              <div className="absolute -bottom-6 -left-6 z-20 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-xl shadow-[#002F45]/15 border border-[#002F45]/5 transform transition-transform duration-500 hover:-translate-y-2">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E3A750]/10 text-[#E3A750]">
                   <svg className="w-6 h-6 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                 </div>
                 <div>
                   <p className="text-sm font-black text-[#12303C]">Real-time Sync</p>
                   <p className="text-[11px] font-bold text-[#5E7580] uppercase tracking-wider">Sistem Terintegrasi</p>
                 </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -top-6 -right-6 z-0 w-24 h-24 bg-[radial-gradient(#002F45_2px,transparent_2px)] [background-size:12px_12px] opacity-30" />
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
    <section id="peta" className="relative bg-[#002F45] py-24 lg:py-32 mt-12">
      {/* Top curved divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-12 md:h-24">
          <path d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" fill="#002F45" />
        </svg>
      </div>

      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#BCD4CC 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute -left-32 top-0 w-[600px] h-[600px] rounded-full bg-[#BCD4CC]/10 blur-[100px] z-0 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#E3A750]/10 blur-[120px] z-0 pointer-events-none" />

      {/* Decorative graphic right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-10 mix-blend-screen grayscale z-0 pointer-events-none">
         <img src={greenBusImage} alt="Bus Illustration" className="w-full h-full object-contain filter invert opacity-50 transform translate-x-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 border-b border-white/10 pb-16 mb-16">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center sm:items-start group"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-[#BCD4CC] ring-1 ring-white/10 mb-5 shadow-sm transition-transform group-hover:scale-110 group-hover:bg-[#E3A750] group-hover:text-[#002F45] group-hover:ring-[#E3A750]/50">
                <stat.icon className="h-6 w-6" />
              </span>
              <p className="text-4xl font-black tracking-tight text-white mb-2">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-[#BCD4CC]/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#BCD4CC]/20 bg-[#BCD4CC]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#BCD4CC] mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#E3A750] animate-pulse" /> Mulai Eksplorasi
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl leading-[1.1]">
              Siap Menjelajahi <span className="bg-gradient-to-r from-[#BCD4CC] to-[#E3A750] bg-clip-text text-transparent">Data Kota?</span>
            </h2>
            <p className="mt-6 text-lg lg:text-xl leading-relaxed text-[#BCD4CC]/80 max-w-2xl font-medium">
              Akses peta interaktif yang lengkap dengan jalur transportasi, titik aktivitas, dan kepadatan populasi Bandar Lampung tanpa batas.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              to="/map"
              className="group relative inline-flex h-16 sm:h-20 items-center justify-center gap-4 rounded-full bg-white px-8 sm:px-12 text-base sm:text-lg font-black text-[#002F45] shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(227,167,80,0.3)] hover:text-[#12303C] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#E3A750] to-[#ECB86A] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              Buka Peta Sekarang
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#002F45]/5 group-hover:bg-[#E3A750]/20 transition-colors">
                <ArrowRightIcon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom curved divider to transition to footer */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[99%] z-10">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-12 md:h-24">
          <path d="M0,120 C480,0 960,0 1440,120 L1440,0 L0,0 Z" fill="#002F45" />
        </svg>
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
      className="relative bg-[linear-gradient(180deg,#F6F4EE_0%,#EEF3F0_52%,#E7EEEB_100%)] overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#BCD4CC]/20 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E3A750]/10 rounded-full blur-[100px] mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#002F45_1px,transparent_1px)] [background-size:30px_30px] pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#002F45]/12 bg-[#002F45]/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-[#002F45]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#002F45]" /> Kapabilitas Platform
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-tight text-[#12303C] sm:text-5xl leading-tight">
              Analisis Mendalam untuk <span className="text-[#002F45]">Keputusan Tepat</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-[#5E7580] max-w-md">
            Temukan pola mobilitas, identifikasi area krisis, dan rencanakan rute yang lebih efisien dengan alat analisis visual kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Box 1: Large Feature */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-[#002F45] p-10 lg:p-14 shadow-2xl shadow-[#002F45]/20"
          >
            <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-[#E3A750] rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110">
                <MapIcon className="h-8 w-8" />
              </span>
              <div>
                <h3 className="text-3xl font-black text-white mb-4">Area Prioritas & Koridor</h3>
                <p className="text-lg text-white/70 max-w-lg leading-relaxed mb-8">
                  Identifikasi wilayah dan koridor yang membutuhkan intervensi transportasi paling cepat. Gunakan data historis untuk memprediksi kebutuhan infrastruktur masa depan.
                </p>
                <Link
                  to="/data"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#002F45] transition-all hover:scale-105 hover:bg-[#EEF3F0]"
                >
                  Lihat Pemetaan <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Bento Box 2: Tall Feature */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="md:col-span-4 group relative overflow-hidden rounded-[2.5rem] bg-[#BCD4CC] p-10 shadow-2xl shadow-[#BCD4CC]/30 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#2D5966] shadow-xl shadow-white/20 transition-transform duration-500 group-hover:scale-110 mb-12">
              <BarChartIcon className="h-8 w-8" />
            </span>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-[#12303C] mb-4">Kepadatan Aktivitas</h3>
              <p className="text-base text-[#2D5966] leading-relaxed">
                Pantau distribusi pusat-pusat aktivitas masyarakat dalam berbagai waktu dan kondisi untuk mengatur rute secara optimal.
              </p>
            </div>
          </motion.div>

          {/* Bento Box 3: Wide Feature */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="md:col-span-12 group relative overflow-hidden rounded-[2.5rem] bg-white border border-[#002F45]/10 p-10 lg:p-12 shadow-xl shadow-[#002F45]/5 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-[#E3A750]/10 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-6 relative z-10">
              <span className="flex shrink-0 h-20 w-20 items-center justify-center rounded-[2rem] bg-[#E3A750]/10 text-[#A86F1C] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                <BusIcon className="h-10 w-10" />
              </span>
              <div>
                <h3 className="text-2xl font-black text-[#12303C] mb-2">Akses & Konektivitas Transportasi</h3>
                <p className="text-base text-[#5E7580] max-w-2xl leading-relaxed">
                  Evaluasi keterjangkauan layanan transportasi angkutan umum untuk seluruh kecamatan di Bandar Lampung. Analisis jarak tempuh dan kemudahan pergantian moda bagi penumpang komuter.
                </p>
              </div>
            </div>
            
            <Link
              to="/tentang"
              className="shrink-0 relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#002F45] text-white shadow-xl shadow-[#002F45]/20 transition-transform hover:scale-110 hover:bg-[#12303C]"
            >
              <ArrowRightIcon className="h-6 w-6" />
            </Link>
          </motion.div>
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
          className="mt-16 rounded-[30px] border border-white/20 bg-black/40 p-2.5 shadow-2xl shadow-[#002F45]/25 backdrop-blur-xl lg:max-w-4xl"
        >
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats2.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3.5 rounded-[22px] p-4 transition-all duration-300 hover:bg-white/10"
              >
                <span
                  className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.iconClass}`}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-2xl font-bold leading-none tracking-tight text-white/90">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-white/70">{item.label}</p>
                  <p className="text-[11px] leading-tight text-white/50">{item.sub}</p>
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
    <section id="visualisasi" className="relative py-24 lg:py-32 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#002F45]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#E3A750]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#002F45 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Abstract Background Element */}
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-[#BCD4CC]/30 via-[#E3A750]/20 to-[#002F45]/10 blur-2xl transform -rotate-6" />
            
            <div className="relative overflow-hidden rounded-[2.5rem] border-[12px] border-white/80 bg-white shadow-2xl shadow-[#002F45]/15 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[#002F45]/25 group">
              <div className="absolute inset-0 bg-[#002F45]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
              <img
                src={dashboardImage}
                alt="Dashboard WebGIS pada laptop dengan heatmap dan grafik"
                className="w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Floating Element */}
            <div className="absolute -bottom-10 -right-10 rounded-3xl bg-white p-6 shadow-xl shadow-[#002F45]/10 border border-[#002F45]/5 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <ActivityIcon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#12303C]">Live Monitoring</p>
                  <p className="text-xs text-[#5E7580]">Data Transportasi Aktif</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:pl-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#002F45]/12 bg-[#002F45]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#002F45] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#002F45] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#002F45]"></span>
              </span>
              Visualisasi Interaktif
            </span>
            <h2 className="mt-8 text-4xl font-black tracking-tight text-[#12303C] sm:text-5xl leading-[1.1]">
              Ubah Data Rumit Menjadi <span className="bg-gradient-to-r from-[#002F45] to-[#2D5966] bg-clip-text text-transparent">Wawasan Nyata</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#5E7580]">
              Visualisasi canggih dari kami mengubah angka mentah menjadi peta interaktif yang mudah dipahami. Prediksi kemacetan, temukan area strategis, dan presentasikan laporan dengan percaya diri.
            </p>

            <div className="mt-10 grid gap-5">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-5 rounded-3xl bg-slate-50 border border-slate-100 p-5 shadow-sm transition-all hover:bg-white hover:shadow-lg hover:border-[#002F45]/10"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#BCD4CC]/20 text-[#002F45]">
                    <feature.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#12303C]">{feature.title}</h3>
                    <p className="mt-1 text-sm text-[#5E7580]">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10 pt-8 border-t border-slate-200">
              <Link
                to="/data"
                className="inline-flex items-center gap-3 rounded-full bg-[#12303C] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#12303C]/20 transition-all hover:bg-[#002F45] hover:-translate-y-1 hover:shadow-2xl"
              >
                Jelajahi Dashboard <ArrowUpRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



function ContactSection() {
  return (
    <section id="kontak" className="relative bg-white py-24 lg:py-32">
      {/* Subtle top inner shadow to blend with the CtaSection SVG */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#002F45]/5 to-transparent pointer-events-none" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-r from-[#BCD4CC]/20 to-[#E3A750]/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, #002F45 1px, transparent 1px), linear-gradient(to bottom, #002F45 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-[3rem] bg-white/80 backdrop-blur-xl p-10 sm:p-16 text-center shadow-2xl shadow-[#002F45]/10 border border-white/60 overflow-hidden"
        >
          {/* Abstract corner accents */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E3A750]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#002F45]/10 rounded-full blur-2xl pointer-events-none" />

          <span className="inline-flex items-center gap-2 rounded-full border border-[#002F45]/10 bg-[#002F45]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#002F45]">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#E3A750] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E3A750]"></span>
            </span>
            Hubungi Kami
          </span>
          <h2 className="mt-8 text-4xl font-black tracking-tight text-[#12303C] sm:text-5xl leading-tight">
            Punya Pertanyaan atau <span className="bg-gradient-to-r from-[#002F45] to-[#2D5966] bg-clip-text text-transparent">Masukan?</span>
          </h2>
          <p className="mt-6 text-lg text-[#5E7580] max-w-2xl mx-auto leading-relaxed">
            Kami siap membantu Anda dalam memanfaatkan data transportasi kota secara optimal. Jadwalkan diskusi dengan tim ahli kami hari ini.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/kontak"
              className="group inline-flex w-full sm:w-auto h-14 items-center justify-center gap-3 rounded-full bg-[#12303C] px-8 text-sm font-bold text-white shadow-xl shadow-[#12303C]/20 transition-all duration-300 hover:scale-105 hover:bg-[#002F45] hover:shadow-2xl"
            >
              Kirim Pesan <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
            <a
              href="mailto:halo@transitmap.id"
              className="group inline-flex w-full sm:w-auto h-14 items-center justify-center gap-3 rounded-full bg-white border border-[#002F45]/10 px-8 text-sm font-bold text-[#12303C] shadow-sm transition-all duration-300 hover:scale-105 hover:bg-slate-50"
            >
              halo@transitmap.id
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <>
      <SiteHeader />
      <main className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#F6F4EE_0%,#F1F4F0_52%,#F6F4EE_100%)] text-[#12303C]">
        <HeroSection />
        <CitySection />
        <VisualizationSection />
        <FeaturesSection />
        <CtaSection />
        <ContactSection />
        <SiteFooter />
      </main>
    </>
  );
}
