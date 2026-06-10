import { motion } from "framer-motion";
import SiteHeader from "../components/landing/SiteHeader";
import { Link } from "react-router-dom";
import dashboardImage from "../assets/landing/laptop-dashboard.png";
import { LayersIcon, FlameIcon, FileDownIcon, BusIcon, MapPinIcon, ArrowRightIcon } from "../components/landing/LandingIcons";

const features = [
  {
    icon: LayersIcon,
    title: "Layer Data Ganda",
    desc: "Tumpang tindih (overlay) berbagai peta tematik untuk analisis komprehensif.",
  },
  {
    icon: FlameIcon,
    title: "Heatmap Kepadatan",
    desc: "Kenali konsentrasi aktivitas dan pergerakan secara visual.",
  },
  {
    icon: FileDownIcon,
    title: "Ekspor Hasil Laporan",
    desc: "Unduh data analisis dalam format standar yang siap digunakan.",
  },
];

const transportModes = [
  {
    icon: BusIcon,
    title: "BRT Trans Bandar Lampung",
    count: "8 Halte Utama",
    desc: "Sistem transit bus cepat yang melayani rute koridor utama di penjuru kota.",
  },
  {
    icon: MapPinIcon,
    title: "Terminal Penumpang",
    count: "3 Terminal",
    desc: "Fasilitas transit antarkota dan dalam kota seperti Rajabasa, Kemiling, dan Panjang.",
  },
  {
    icon: MapPinIcon,
    title: "Stasiun Kereta Api",
    count: "1 Stasiun Utama",
    desc: "Stasiun Tanjung Karang sebagai gerbang utama mobilitas rel dari/menuju Palembang.",
  }
];

export default function DataPage() {
  return (
    <div className="relative min-h-screen bg-[linear-gradient(180deg,#F6F4EE_0%,#F1F4F0_52%,#F6F4EE_100%)] font-sans text-[#12303C] overflow-hidden">
      <SiteHeader variant="dark" />
      
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-[#002F45] [clip-path:polygon(0_0,100%_0,100%_100%,0_85%)]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center pt-16 pb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Data <span className="text-[#E3A750]">Transportasi & Visualisasi</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            Platform kami menghimpun berbagai dimensi data pergerakan kota, mulai dari titik transit hingga kepadatan aktivitas, disajikan dalam visualisasi cerdas.
          </motion.p>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#002F45]/12 bg-[#002F45]/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-[#002F45]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#002F45]" /> Jaringan Terintegrasi
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#12303C] sm:text-4xl">
            Moda Transportasi Utama
          </h2>
          <p className="mt-4 text-[#5E7580] max-w-2xl mx-auto">
            Inventarisasi fasilitas transportasi yang beroperasi untuk memfasilitasi pergerakan warga.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-24">
          {transportModes.map((mode, index) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-[#002F45]/5 border border-[#002F45]/10"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#002F45]/5 text-[#002F45] ring-1 ring-[#002F45]/10">
                  <mode.icon className="h-6 w-6" />
                </span>
                <span className="text-2xl font-bold text-[#E3A750]">{mode.count}</span>
              </div>
              <h3 className="text-xl font-bold text-[#12303C] mb-3">{mode.title}</h3>
              <p className="text-[#5E7580] text-sm leading-relaxed">{mode.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 pt-16 border-t border-[#002F45]/10">
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
            
            <div className="mt-10">
              <Link
                to="/map"
                className="group inline-flex items-center gap-2 rounded-full bg-[#002F45] px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#12303C] hover:scale-[1.02]"
              >
                Eksplorasi Peta Penuh
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Simple footer area */}
      <footer className="bg-[#002F45] py-8 text-center">
        <p className="text-white/60 text-sm">© 2024 GeoTransit Lampung. All rights reserved.</p>
      </footer>
    </div>
  );
}
