import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const location = useLocation();
  const isResearchPaperPage = location.pathname === "/research-paper";
  const { theme } = useTheme();

  return (
    <nav className="w-full flex items-center justify-between py-4 mb-8">
      <div className="flex items-center">
        {/* Left side empty */}
      </div>
      <div className="flex items-center space-x-4">
        {!isResearchPaperPage && (
          <Link
            to="/research-paper"
            className={cn(
              "px-10 py-5",
              "bg-transparent text-[#FBBF24]",
              "rounded-md border-2 border-[#FBBF24]",
              "hover:bg-[#FBBF24]/10 transition-all duration-300",
              "font-medium text-base tracking-wide",
              "hover:scale-105 transition-transform duration-200",
              "animate-fade-in"
            )}
          >
            Research Paper
          </Link>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;