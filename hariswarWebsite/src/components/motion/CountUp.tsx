import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

interface CountUpProps {
  end: number;
  duration?: number; // in milliseconds
  suffix?: string;
}

// Counts from 0 up to `end` once the number scrolls into view
const CountUp = ({ end, duration = 1600, suffix = "" }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(() => (prefersReducedMotion() ? end : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setValue(Math.round(end * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  return <span ref={ref} className="tabular-nums">{value}{suffix}</span>;
};

export default CountUp;
