import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import { useTheme } from "./Theme/darkLight";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Navbar />
      <main className="w-full px-6 py-6">
        {children}
      </main>
    </div>
  );
};


export default Layout;