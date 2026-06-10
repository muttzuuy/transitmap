import { motion } from "framer-motion";
import dashboardImage from "../../assets/landing/laptop-dashboard.png";
import {
  ActivityIcon,
  FileDownIcon,
  FlameIcon,
  LayersIcon,
} from "./LandingIcons";

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

export default function VisualizationSection() {
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
