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

export function ArrowRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

export function PlayCircleIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4Z" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function MapIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2Z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </IconBase>
  );
}

export function SearchIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </IconBase>
  );
}

export function MenuIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function CloseIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  );
}

export function TrendingUpIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 16 10 10l4 4 6-8" />
      <path d="M20 6v6h-6" />
    </IconBase>
  );
}

export function BusIcon(props) {
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

export function BarChartIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 19V9" />
      <path d="M12 19V5" />
      <path d="M19 19v-7" />
      <path d="M4 19h16" />
    </IconBase>
  );
}

export function CheckCircleIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.3 2.3 4.8-5.1" />
    </IconBase>
  );
}

export function LayersIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </IconBase>
  );
}

export function FlameIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12.5 3.5c1.6 2.4.9 4.4-.6 5.8-1.5 1.4-2 2.6-2 4.1a4.1 4.1 0 0 0 8.2 0c0-3.7-2-5.9-5.6-9.9Z" />
      <path d="M10.5 14.2c.2 2 1.5 3.3 3 3.3 1.7 0 2.8-1.3 2.8-3.1 0-1.1-.5-2.1-1.8-3.5-.2 1.3-.8 2.1-1.7 2.7-.8.5-1.5.2-2.3.6Z" />
    </IconBase>
  );
}

export function FileDownIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M12 11v6" />
      <path d="m9.5 14.5 2.5 2.5 2.5-2.5" />
    </IconBase>
  );
}

export function ActivityIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 12h4l2-5 4 10 2-5h6" />
    </IconBase>
  );
}

export function DatabaseIcon(props) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </IconBase>
  );
}

export function MapPinIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 21s6-4.4 6-10a6 6 0 1 0-12 0c0 5.6 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </IconBase>
  );
}

export function GlobeIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </IconBase>
  );
}

export function SendIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m21 3-9 18-2.5-7.5L2 11l19-8Z" />
    </IconBase>
  );
}

export function AtSignIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M15.5 15.5c-.9.8-1.8 1.2-2.8 1.2-2.1 0-3.7-1.5-3.7-3.9 0-2.8 2-4.8 4.8-4.8 2.7 0 4.6 1.8 4.6 4.8v1.3c0 1.2.7 1.7 1.5 1.7" />
      <path d="M15 12.8c0 1.6-.9 2.7-2.2 2.7s-2.2-1.1-2.2-2.7.9-2.8 2.2-2.8S15 11.2 15 12.8Z" />
    </IconBase>
  );
}

export function ShareIcon(props) {
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

export function ArrowUpRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </IconBase>
  );
}
