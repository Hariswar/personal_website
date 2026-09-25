import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./light_darkMode";
import { useTheme } from "@/Theme/darkLight";

const sections = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
];

// Sticky navbar that turns into frosted glass once you scroll
const Navbar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const researchLink = pathname !== "/research-paper";

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled ? "glass shadow-lg shadow-black/5 py-3" : "py-5 bg-transparent border-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between animate-fade-in">
        <Link to="/" className="group flex items-center gap-2 font-playfair text-2xl font-extrabold" aria-label="Home">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-terminal-cyan text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-500 group-hover:rotate-[360deg]">
            H
          </span>
          <span className="hidden sm:inline">
            ariswar<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {isHome && (
            <ul className="hidden md:flex items-center gap-1 mr-2">
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {researchLink && (
            <Link
              to="/research-paper"
              className="px-4 sm:px-6 py-2.5 rounded-lg border-2 border-accent text-accent font-medium text-sm sm:text-base tracking-wide hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_24px_hsl(var(--accent)/0.45)] transition-all duration-300"
            >
              Research Paper
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
