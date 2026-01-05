import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="-mr-10 p-1.5 rounded-full border border-[#FBBF24]/50 hover:border-[#FBBF24] hover:bg-[#FBBF24]/10 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={28} className="text-white-400 hover:text-white transition-colors" />
      ) : (
        <Moon size={28} className="text-gray-600 hover:text-gray-900 transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;