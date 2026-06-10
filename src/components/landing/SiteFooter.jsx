import {
  ArrowUpRightIcon,
  AtSignIcon,
  GlobeIcon,
  MapIcon,
  SendIcon,
  ShareIcon,
} from "./LandingIcons";

const columns = [
  { title: "Platform", links: ["Beranda", "Fitur", "Peta", "Data", "Tentang"] },
  { title: "Bantuan", links: ["Panduan", "FAQ", "Kontak", "Kebijakan Privasi"] },
];

export default function SiteFooter() {
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
