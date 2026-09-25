import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Background from "./components/motion/Background";
import ScrollProgress from "./components/motion/ScrollProgress";
import { useTheme } from "./Theme/darkLight";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  useTheme();

  return (
    <div className="relative isolate min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <ScrollProgress />
      <Background />
      <Navbar />
      <main className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
        {children}
      </main>
    </div>
  );
};


export default Layout;
