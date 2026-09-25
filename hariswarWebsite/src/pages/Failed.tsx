import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Background from "@/components/motion/Background";

// when none of the route matches 
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: ", // shows the error message
      location.pathname
    );
  }, [location.pathname]);

  // displaying the message 
  return (
    <div className="relative isolate min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <Background />
      <div className="text-center animate-fade-in">
        <h1 className="text-[8rem] leading-none font-extrabold font-playfair text-gradient animate-gradient-x animate-float">404</h1>
        <p className="font-mono text-terminal-green mt-4 mb-8">
          <span className="text-terminal-purple">$ </span>cd {location.pathname}: no such page
          <span className="animate-cursor-blink ml-0.5">█</span>
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-accent text-accent font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
