import { useEffect, useRef } from "react";
import { isCoarsePointer, prefersReducedMotion } from "@/lib/motion";

// Fixed ambient background: drifting color blobs, a faint grid, and a light that follows the cursor
const Background = () => {
  const spotlight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isCoarsePointer()) return;

    let frame = 0;
    const handleMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        spotlight.current?.style.setProperty("--mx", `${e.clientX}px`);
        spotlight.current?.style.setProperty("--my", `${e.clientY}px`);
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[120px] animate-blob dark:bg-primary/15" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-terminal-cyan/15 blur-[120px] animate-blob [animation-delay:-6s]" />
      <div className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[120px] animate-blob [animation-delay:-12s]" />
      <div className="absolute inset-0 bg-grid" />
      <div ref={spotlight} className="absolute inset-0 cursor-spotlight" />
    </div>
  );
};

export default Background;
