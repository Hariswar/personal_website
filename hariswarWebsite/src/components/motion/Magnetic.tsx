import { ReactNode, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { isCoarsePointer, prefersReducedMotion } from "@/lib/motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number; // how far it follows the cursor (0 → 1)
  className?: string;
}

// Pulls its child slightly toward the cursor while hovering
const Magnetic = ({ children, strength = 0.3, className }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("inline-block transition-transform duration-300 ease-out", className)}
    >
      {children}
    </div>
  );
};

export default Magnetic;
