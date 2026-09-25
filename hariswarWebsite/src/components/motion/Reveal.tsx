import { ReactNode, useEffect, useRef, useState, CSSProperties, ElementType } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "scale";

interface RevealProps {
  children: ReactNode;
  delay?: number; // in milliseconds
  direction?: Direction;
  className?: string;
  as?: ElementType;
}

const offsets: Record<Direction, string> = {
  up: "translateY(24px)",
  down: "translateY(-24px)",
  left: "translateX(-40px)",
  right: "translateX(40px)",
  scale: "scale(0.94)",
};

// Fades and slides its children in the first time they scroll into view
const Reveal = ({ children, delay = 0, direction = "up", className, as: Tag = "div" }: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms`, "--reveal-from": offsets[direction] } as CSSProperties}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
