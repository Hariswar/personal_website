import { useEffect, useRef, ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

interface Scrolls {
  children: ReactNode;
  speed?: number;
  className?: string;
}

// Parallax wrapper: moves its children at a different speed than the page.
// Writes the transform directly (no React re-render per scroll event) so it stays smooth.
const Scroll = ({
  children,
  speed = 0.05,
  className = ""
}: Scrolls) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * speed}px)`;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default Scroll;
