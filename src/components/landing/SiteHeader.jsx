import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRightIcon,
  CloseIcon,
  MapIcon,
  MenuIcon,
} from "./LandingIcons";

import logoImage from "../../assets/geotransit-logo.png";

const navItems = [
  { label: "Beranda", href: "/#beranda", isRoute: true },
  { label: "Fitur", href: "/#fitur", isRoute: true },
  { label: "Peta", href: "/map", isRoute: true },
  { label: "Data", href: "/data", isRoute: true },
  { label: "Tentang", href: "/tentang", isRoute: true },
  { label: "Kontak", href: "/kontak", isRoute: true },
];

function NavItem({ item, active = false, onClick, variant = "dark" }) {
  const isLight = variant === "light";
  
  const className = `rounded-full px-4 py-1.5 text-sm transition-all duration-300 font-medium ${
    active
      ? isLight 
        ? "bg-[#002F45] text-white shadow-sm" 
        : "bg-white/20 text-white shadow-sm"
      : isLight
        ? "text-[#12303C] hover:bg-[#BCD4CC]/30 hover:text-[#002F45]"
        : "text-white/80 hover:bg-white/10 hover:text-white"
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

export default function SiteHeader({ variant = "dark" }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLight = variant === "light";

  // If the user navigates to a hash, scroll to it manually since react-router doesn't do it perfectly
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`mx-auto mt-4 flex max-w-7xl items-center justify-between gap-4 rounded-[28px] border px-5 py-3 shadow-xl backdrop-blur-xl lg:px-6 transition-colors duration-300 ${
        isLight 
          ? "bg-white/90 border-white/40 shadow-[#002F45]/10 ring-1 ring-[#002F45]/5" 
          : "bg-[#002F45]/60 border-white/15 shadow-[#002F45]/30 ring-1 ring-white/10"
      }`}>
        <Link to="/#beranda" className="flex items-center gap-2.5">
          <span className="flex items-center justify-center">
            <img src={logoImage} alt="GeoTransit Lampung" className="h-10 w-auto drop-shadow-md" />
          </span>
          <span className={`text-sm font-bold tracking-tight sm:text-base ${isLight ? "text-[#002F45]" : "text-white"}`}>
            GeoTransit Lampung
          </span>
        </Link>

        <nav className={`hidden items-center gap-1 rounded-full px-1.5 py-1.5 lg:flex border ${
          isLight ? "bg-[#EEF3F0]/50 border-[#002F45]/5" : "bg-white/5 border-white/10"
        }`}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (location.pathname === '/' && location.hash === item.href.replace('/', ''));
            return <NavItem key={item.label} item={item} active={isActive} variant={variant} />;
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/full-map"
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E3A750] to-[#F1BE71] px-5 py-2.5 text-sm font-bold text-[#002F45] shadow-lg shadow-[#E3A750]/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#E3A750]/40"
          >
            Masuk ke Peta Full
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`inline-flex items-center justify-center rounded-xl p-2 md:hidden ${isLight ? "text-[#002F45]" : "text-white"}`}
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
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#12303C] transition hover:bg-[#BCD4CC]/30 hover:text-[#002F45]"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#12303C] transition hover:bg-[#BCD4CC]/30 hover:text-[#002F45]"
                >
                  {item.label}
                </a>
              ),
            )}
            <Link
              to="/full-map"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#002F45] px-4 py-3 text-sm font-bold text-[#E3A750] shadow-lg shadow-[#002F45]/15"
            >
              Masuk ke Peta Full <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
