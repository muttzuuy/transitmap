import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  CloseIcon,
  MapIcon,
  MenuIcon,
  SearchIcon,
} from "./LandingIcons";

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

export default function SiteHeader() {
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
