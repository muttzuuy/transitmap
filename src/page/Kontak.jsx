import SiteHeader from "../components/landing/SiteHeader";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Kontak() {
  return (
    <div className="min-h-screen bg-[#EEF3F0] font-sans text-[#12303C]">
      <SiteHeader variant="light" />

      <section className="relative pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-[#002F45] mb-6"
            >
              Hubungi <span className="text-[#E3A750]">Kami</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#5E7580]"
            >
              Punya pertanyaan terkait data, kolaborasi, atau masalah teknis? Tim kami siap membantu Anda.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-5 flex flex-col gap-6"
            >
              <div className="bg-[#002F45] p-8 rounded-3xl text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-8">Informasi Kontak</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#E3A750]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Kantor Pusat</h4>
                      <p className="text-sm text-[#BCD4CC] leading-relaxed">Jl. ZA. Pagar Alam No. 1<br/>Gedong Meneng, Rajabasa<br/>Bandar Lampung 35145</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#E3A750]">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <p className="text-sm text-[#BCD4CC]">support@bldtransport.id</p>
                      <p className="text-sm text-[#BCD4CC]">data@bldtransport.id</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#E3A750]">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Telepon</h4>
                      <p className="text-sm text-[#BCD4CC]">+62 721 1234 5678</p>
                      <p className="text-sm text-[#BCD4CC]">+62 812 3456 7890 (WA)</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-7"
            >
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-[#002F45]/5 border border-white/60">
                <h3 className="text-2xl font-bold text-[#002F45] mb-6">Kirim Pesan</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#12303C]">Nama Lengkap</label>
                      <input type="text" className="w-full bg-[#EEF3F0] border-transparent rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-transparent outline-none transition-all" placeholder="Masukkan nama" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#12303C]">Email</label>
                      <input type="email" className="w-full bg-[#EEF3F0] border-transparent rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-transparent outline-none transition-all" placeholder="nama@email.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#12303C]">Subjek</label>
                    <input type="text" className="w-full bg-[#EEF3F0] border-transparent rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-transparent outline-none transition-all" placeholder="Topik pesan" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#12303C]">Pesan</label>
                    <textarea rows="5" className="w-full bg-[#EEF3F0] border-transparent rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-transparent outline-none transition-all resize-none" placeholder="Tuliskan pesan Anda di sini..."></textarea>
                  </div>

                  <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#002F45] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#12303C] transition-colors shadow-lg shadow-[#002F45]/20">
                    Kirim Pesan <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
