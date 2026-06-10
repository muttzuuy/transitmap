import SiteHeader from "../components/landing/SiteHeader";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Users, MapPin, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Tentang() {
  return (
    <div className="min-h-screen bg-[#EEF3F0] font-sans text-[#12303C]">
      <SiteHeader variant="light" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-gradient-to-bl from-[#BCD4CC]/40 to-transparent rounded-bl-full -z-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-[300px] bg-gradient-to-tr from-[#E3A750]/20 to-transparent rounded-tr-full -z-10 blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-black text-[#002F45] mb-6 leading-tight">
              Membangun Sistem <span className="text-[#E3A750]">Transportasi Cerdas</span> untuk Masa Depan
            </h1>
            <p className="text-lg text-[#5E7580] leading-relaxed">
              GeoTransit Lampung adalah platform analitik geospasial yang didedikasikan untuk memetakan sebaran fasilitas publik dan menganalisis kebutuhan infrastruktur transportasi di seluruh wilayah Bandar Lampung.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-[#002F45]/5 border border-white/60"
            >
              <div className="w-14 h-14 bg-[#002F45]/5 rounded-2xl flex items-center justify-center mb-6 text-[#002F45]">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#002F45] mb-4">Visi Kami</h3>
              <p className="text-[#5E7580] leading-relaxed">
                Menjadi pusat intelijen tata ruang yang memungkinkan para pemangku kebijakan merancang rute transportasi yang presisi, tepat sasaran, dan merata, mengurangi ketimpangan akses di masyarakat.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#002F45] p-8 rounded-3xl shadow-xl shadow-[#002F45]/10 border border-[#002F45]"
            >
              <div className="w-14 h-14 bg-[#E3A750]/20 rounded-2xl flex items-center justify-center mb-6 text-[#E3A750]">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Misi Kami</h3>
              <p className="text-[#BCD4CC] leading-relaxed">
                Menyediakan visualisasi data yang mudah dipahami, akurat, dan interaktif. Kami menjembatani kesenjangan antara data mentah dengan wawasan operasional yang langsung bisa diterapkan.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats / Value Props */}
      <section className="py-20 px-4 bg-white relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002F45]">Teknologi dan Data</h2>
            <p className="text-[#5E7580] mt-4 max-w-2xl mx-auto">Kami memanfaatkan sistem pemetaan modern dan analisis data spatial untuk memberikan wawasan yang mendalam.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <MapPin />, title: "Pemetaan Interaktif", desc: "Didukung oleh Leaflet dan geoJSON untuk rendering peta berkinerja tinggi." },
              { icon: <Database />, title: "Data Aktual", desc: "Menggunakan ribuan titik sebaran fasilitas kesehatan, pendidikan, dan niaga." },
              { icon: <Target />, title: "Rekomendasi Pintar", desc: "Algoritma penentuan prioritas halte dan rute di area dengan kepadatan tinggi." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto bg-[#EEF3F0] text-[#E3A750] rounded-full flex items-center justify-center mb-6 shadow-inner">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-[#12303C] mb-3">{item.title}</h4>
                <p className="text-sm text-[#5E7580] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#002F45] to-[#12303C] rounded-[40px] p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3A750]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Mulai Eksplorasi Data Sekarang</h2>
          <p className="text-[#BCD4CC] mb-10 max-w-2xl mx-auto relative z-10 text-lg">
            Temukan insight yang Anda butuhkan untuk merencanakan perjalanan atau menganalisis distribusi fasilitas umum.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/map" className="inline-flex items-center justify-center gap-2 bg-[#E3A750] text-[#002F45] font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg shadow-[#E3A750]/30">
              Buka Dashboard Peta
            </Link>
            <Link to="/kontak" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
              Hubungi Kami <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
