import {
  SiNvidia,
  SiRepublicofgamers,
  SiCorsair,
  SiRazer,
  SiMsi,
  SiIntel,
  SiAmd,
  SiLogitech,
  SiSteelseries,
  SiSamsung,
} from "react-icons/si";
import type { ReactNode } from "react";

interface BrandItem {
  id: number;
  name: string;
  icon: ReactNode;
}

const brands: BrandItem[] = [
  { id: 1, name: "NVIDIA", icon: <SiNvidia /> },
  { id: 2, name: "INTEL", icon: <SiIntel /> },
  { id: 3, name: "AMD", icon: <SiAmd /> },
  { id: 4, name: "ROG", icon: <SiRepublicofgamers /> },
  { id: 5, name: "MSI", icon: <SiMsi /> },
  { id: 6, name: "LOGITECH", icon: <SiLogitech /> },
  { id: 7, name: "RAZER", icon: <SiRazer /> },
  { id: 8, name: "STEELSERIES", icon: <SiSteelseries /> },
  { id: 9, name: "CORSAIR", icon: <SiCorsair /> },
  { id: 10, name: "SAMSUNG", icon: <SiSamsung /> },
];

const allBrands = [...brands, ...brands.map(b => ({ ...b, id: b.id + 10 }))];

function MarqueeContainer() {
  return (
    <div className="bg-muted/30 backdrop-blur-sm py-5 w-full overflow-hidden border-y border-border mb-5">
      <div className="flex gap-12 w-max animate-marquee hover:[animation-play-state:paused]">
        {allBrands.map((brand) => (
          <span key={brand.id} className="text-muted-foreground font-heading font-bold text-xl whitespace-nowrap transition-colors duration-500 hover:text-primary flex items-center gap-3">
            <span className="text-2xl">{brand.icon}</span>
            {brand.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MarqueeContainer;
