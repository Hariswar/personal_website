import { useEffect, useState, ReactNode } from 'react';

interface Scrolls {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const Scroll = ({
  children,
  speed = 0.05,
  className = ""
}: Scrolls) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`transition-transform will-change-transform ${className}`}
      style={{
        transform: `translateY(${offset * speed}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default Scroll;