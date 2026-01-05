import { useEffect, useState, ReactNode } from 'react';

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxWrapper = ({
  children,
  speed = 0.05,
  className = ""
}: ParallaxWrapperProps) => {
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

export default ParallaxWrapper;