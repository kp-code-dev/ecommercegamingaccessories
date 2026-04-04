import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function AppleToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`w-[54px] rounded-[50px] cursor-pointer transition-colors duration-300 relative flex items-center p-[2px] ${
        theme === "dark"
          ? "bg-primary shadow-[inset_0_0_5px_rgba(0,0,0,0.3)]"
          : "bg-muted shadow-[inset_0_0_5px_rgba(0,0,0,0.1)]"
      }`}
      onClick={toggleTheme}
    >
      <div
        className={`w-6 h-6 rounded-full shadow-[0_0_10px_hsl(var(--primary)/0.4)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center bg-card ${
          theme === "dark" ? "translate-x-[26px]" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <FaMoon className="text-primary text-xs -rotate-[10deg]" />
        ) : (
          <FaSun className="text-yellow-500 text-sm" />
        )}
      </div>
    </div>
  );
}
