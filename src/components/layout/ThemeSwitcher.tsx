import { FaPalette } from "react-icons/fa";
import AppleToggle from "@/components/ui/AppleToggle";

export default function ThemeSwitcher() {
  return (
    <div className="fixed left-0 top-[17%] -translate-y-1/2 z-[9999] flex items-center group">
      <div className="bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center rounded-r-lg cursor-pointer shadow-[2px_0_10px_rgba(0,0,0,0.5)] relative z-[2] transition-colors group-hover:bg-accent">
        <FaPalette size={20} />
      </div>
      <div className="absolute left-[-200px] opacity-0 bg-card/90 backdrop-blur-xl py-2.5 px-4 rounded-r-lg border border-border border-l-0 transition-all duration-400 z-[1] flex items-center group-hover:left-10 group-hover:opacity-100">
        <AppleToggle />
      </div>
    </div>
  );
}
