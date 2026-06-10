const fs = require('fs');
const path = require('path');

const componentsDir = 'src/components/landing';
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

let globalImports = new Set();
let codeBody = '';

// We need to keep React if used, but React 19 might not need it. Still good to keep external imports.
files.forEach(file => {
  const content = fs.readFileSync(path.join(componentsDir, file), 'utf8');
  const lines = content.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('import ')) {
      // Keep imports that are not relative to local components
      if (!line.includes('./') && !line.includes('../components/landing')) {
        let newImport = line;
        // Fix asset paths because Landing.jsx is in src/page (one level up) 
        // components/landing is in src/components/landing (two levels up to src)
        if (line.includes('../../assets')) {
           newImport = line.replace('../../assets', '../assets');
        }
        globalImports.add(newImport);
      }
    } else if (line.startsWith('export default function ')) {
      codeBody += line.replace('export default function ', 'function ') + '\n';
    } else if (line.startsWith('export function ')) {
      codeBody += line.replace('export function ', 'function ') + '\n';
    } else {
      codeBody += line + '\n';
    }
  });
  codeBody += '\n';
});

let finalCode = Array.from(globalImports).join('\n') + '\n\n' + codeBody;

// Append the actual Landing component that calls them all
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
console.log('Successfully merged components into src/page/Landing.jsx');
