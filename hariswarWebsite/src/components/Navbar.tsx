import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "./light_darkMode";
import { useTheme } from "@/Theme/darkLight";

// This Navbar component conditionally renders a "Research Paper" link
const Navbar = () => {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  const researchLink = pathname !== "/research-paper";

  const setup = cn(
    "px-10 py-5",
    "bg-transparent text-[#FBBF24]",
    "rounded-md border-2 border-[#FBBF24]",
    "hover:bg-[#FBBF24]/10 transition-all duration-300",
    "font-medium text-base tracking-wide",
    "hover:scale-105 transition-transform duration-200",
    "animate-fade-in"
  );

  return (
    <nav className="w-full mb-8 py-4 flex items-center justify-between">
      <div className="flex items-center" />

      <div className="flex items-center gap-6">
        {researchLink && (
          <Link to="/research-paper" className={setup}>
            Research Paper
          </Link>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;