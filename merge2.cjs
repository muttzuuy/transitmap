const fs = require('fs');
const path = require('path');

const componentsDir = 'src/components/landing';
// Order matters a bit but not strictly because function declarations are hoisted.
// Just make sure LandingIcons is there, HeroSection, etc.
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

let finalCode = `import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../assets/landing/bandar-lampung-hero.png";
import laptopDashboard from "../assets/landing/laptop-dashboard.png";
import cityMapImage from "../assets/landing/city-map.png";

`;

for (const file of files) {
  let content = fs.readFileSync(path.join(componentsDir, file), 'utf8');
  
  // Remove all import statements
  // We handle single line and multi-line imports
  content = content.replace(/import\s+.*?\s+from\s+['"].*?['"];?/gs, '');
  content = content.replace(/import\s+['"].*?['"];?/gs, '');

  // Convert export default function to function
  content = content.replace(/export default function /g, 'function ');
  // Convert export function to function
  content = content.replace(/export function /g, 'function ');

  finalCode += content + '\n\n';
}

finalCode += `
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
`;

fs.writeFileSync('src/page/Landing.jsx', finalCode);
console.log('Done');
