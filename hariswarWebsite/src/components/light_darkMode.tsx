import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/Theme/darkLight';

// A button to switch between light and dark modes. 
export const Modes = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative grid place-items-center w-11 h-11 rounded-full border border-accent/50 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_20px_hsl(var(--accent)/0.35)] transition-all duration-300 overflow-hidden"
      aria-label="Toggle theme"
    >
      {/* Both icons are stacked and the inactive one spins away */}
      <Sun
        size={22}
        className={`absolute text-accent transition-all duration-500 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
      />
      <Moon
        size={22}
        className={`absolute text-foreground transition-all duration-500 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
      />
    </button>
  );
};

export default Modes;
