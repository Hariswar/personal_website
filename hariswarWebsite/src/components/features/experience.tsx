import { jobExperiences } from "@/constants/jobexperience";
import { useTheme } from "@/Theme/darkLight";
import { useState, useEffect, useRef } from "react";

// sets up direction and others such as bubble 
export const Experience = () => {
  const { theme } = useTheme(); // gets the theme
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bulletDirection, setBulletDirection] = useState({ x: 0, y: 0 });
  const [submarineTilt, setSubmarineTilt] = useState({ rotate: 0, direction: 'neutral' as 'left' | 'right' | 'neutral' });
  const [isInView, setIsInView] = useState(false);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const submarineRef = useRef<HTMLDivElement>(null);
  const bubbleIdRef = useRef(0);
  const hoveredIndexRef = useRef<number | null>(null);

  useEffect(() => {
    hoveredIndexRef.current = hoveredIndex;
  }, [hoveredIndex]);

  const clearHoverIfStale = () => {
    const hi = hoveredIndexRef.current;
    if (hi === null) return;

    const containerHovered = !!container.current?.matches(':hover');
    const hoveredEl = cardRefs.current[hi];
    const cardHovered = !!hoveredEl?.matches(':hover');

    if (!containerHovered || !cardHovered) {
      setHoveredIndex(null);
      setSubmarineTilt({ rotate: 0, direction: 'neutral' });
      setBubbles([]);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (container.current) {
      observer.observe(container.current);
    }

    return () => {
      if (container.current) {
        observer.unobserve(container.current);
      }
    };
  }, [isInView]);

  // Scroll tracking for submarine movement
  useEffect(() => {
    const handleScroll = () => {
      if (container.current) {
        const rect = container.current.getBoundingClientRect();
        const containerHeight = container.current.scrollHeight;
        const windowHeight = window.innerHeight;

        const containerTop = rect.top;
        const scrollStart = windowHeight;
        const scrollEnd = -containerHeight;
        const scrollRange = scrollStart - scrollEnd;
        const scrolled = scrollStart - containerTop;
        const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

        setScrollProgress(progress);
        
        clearHoverIfStale();
      }
    };
    // Scroll feature 
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pointer movement 
  useEffect(() => {
    const handlePointerMove = () => clearHoverIfStale();
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="mb-10 mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
      <h2 className="text-[40px] font-bold mb-8 text-green-400 font-playfair">Experience</h2>

      <div className="relative" ref={container}>
        {/* this is the floating bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400/20' : 'bg-cyan-500/30'
                }`}
              style={{
                left: `${(i * 23 + 10) % 100}%`,
                top: `${(i * 37 + 20) % 100}%`,
                animation: `particle-float ${8 + (i % 3) * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Timeline road with wave animation */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke={theme === 'dark' ? 'rgba(34, 211, 238, 0.6)' : 'rgba(6, 182, 212, 0.6)'}
              strokeWidth="4"
              strokeDasharray="10 5"
              strokeDashoffset="0"
              className="animate-[timeline-wave_2s_linear_infinite]"
              style={{
                animation: 'timeline-wave 2s linear infinite'
              }}
            />
          </svg>
        </div>

        {/* This is for the submarine */}
        <div
          ref={submarineRef}
          className="absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ease-out pointer-events-none"
          style={{
            top: `${scrollProgress * 100}%`,
          }}
        >
          {}
          {isInView && (
            <>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${theme === 'dark' ? 'border-cyan-400/60' : 'border-cyan-500/60'
                    }`}
                  style={{
                    width: '100px',
                    height: '100px',
                    animation: `sonar-ping 2s ease-out`,
                    animationDelay: `${i * 0.4}s`,
                    animationIterationCount: 1
                  }}
                />
              ))}
            </>
          )}

          {/* Submarine image with the tilt */}
          <div className="relative w-48 h-36">
            <img
              src="/submarine.png"
              alt="Submarine"
              className={`w-full h-full object-contain transition-transform duration-300`}
              style={{ transform: `rotate(${submarineTilt.rotate}deg)` }}
            />

            {/* Bubble trail */}
            {bubbles.map((bubble) => (
              <div
                key={bubble.id}
                className={`absolute w-3 h-3 rounded-full pointer-events-none ${theme === 'dark' ? 'bg-cyan-400/40' : 'bg-cyan-500/50'
                  }`}
                style={{
                  left: `${bubble.x}px`,
                  top: `${bubble.y}px`,
                  animation: `bubble-float 3s ease-out forwards`,
                  animationDelay: `${bubble.delay}s`
                }}
              />
            ))}

            {/* Shooting bullets with trails */}
            {hoveredIndex !== null && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {[...Array(6)].map((_, bulletIndex) => {
                  const isHoveredLeft = hoveredIndex % 2 === 0;
                  const horizontalMove = isHoveredLeft ? -350 : 350;
                  const verticalMove = bulletDirection.y;
                  const bulletSize = 8;
                  const spreadX = (bulletIndex - 2.5) * 3;
                  const spreadY = (bulletIndex - 2.5) * 2;

                  return (
                    <div
                      key={bulletIndex}
                      className="bullet-with-trail absolute top-0 left-0 rounded-full shadow-lg shadow-yellow-400/70"
                      style={{
                        width: `${bulletSize}px`,
                        height: `${bulletSize}px`,
                        background: 'linear-gradient(135deg, rgba(255, 255, 0, 1), rgba(255, 215, 0, 1))',
                        animation: `bulletShoot-${isHoveredLeft ? 'left' : 'right'} 0.8s ease-out infinite`,
                        animationDelay: `${bulletIndex * 0.12}s`,
                        '--bullet-x': `${horizontalMove + spreadX}px`,
                        '--bullet-y': `${verticalMove + spreadY}px`,
                      } as React.CSSProperties & { '--bullet-x': string; '--bullet-y': string }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {jobExperiences.map((job, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <div key={idx} className="relative mb-12 last:mb-0 animate-fade-in" style={{ animationDelay: `${0.7 + idx * 0.2}s` }}>
              <div className="grid grid-cols-2 gap-8">
                <div className={isLeft ? '' : 'order-2'}>
                  <div
                    className={`relative rounded-2xl min-h-[320px] shadow-lg ${theme === 'dark'
                        ? 'bg-gray-900/50 border border-green-500/20 hover:border-yellow-500/50 shadow-black/20'
                        : 'bg-white/80 border border-gray-200 hover:border-yellow-400 shadow-gray-400/20'
                      } p-7 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 backdrop-blur-sm ${isLeft ? 'ml-auto' : 'mr-auto'
                      } ${hoveredIndex === idx ? 'animate-card-shake' : ''}`}
                    onMouseEnter={() => {
                      setHoveredIndex(idx);
                      const newBubble = {
                        id: bubbleIdRef.current++,
                        x: Math.random() * 20 - 10,
                        y: 0,
                        delay: Math.random() * 0.3
                      };
                      setBubbles((prev) => [...prev.slice(-8), newBubble]);

                      // Flip submarine based on the experience cards 
                      const isLeft = idx % 2 === 0;
                      setSubmarineTilt({
                        rotate: isLeft ? 0 : 180,
                        direction: isLeft ? 'left' : 'right'
                      });

                      if (submarineRef.current && cardRefs.current[idx]) {
                        const submarineRect = submarineRef.current.getBoundingClientRect();
                        const cardRect = cardRefs.current[idx]!.getBoundingClientRect();

                        const submarineCenter = {
                          x: submarineRect.left + submarineRect.width / 2,
                          y: submarineRect.top + submarineRect.height / 2,
                        };

                        const cardCenter = {
                          x: cardRect.left + cardRect.width / 2,
                          y: cardRect.top + cardRect.height / 2,
                        };

                        const deltaY = cardCenter.y - submarineCenter.y;
                        const targetX = isLeft ? cardRect.left + cardRect.width : cardRect.left;
                        const deltaX = targetX - submarineCenter.x;

                        setBulletDirection({ x: deltaX, y: deltaY });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      setSubmarineTilt({ rotate: 0, direction: 'neutral' });
                      setBubbles([]);
                    }}
                    ref={(el) => { cardRefs.current[idx] = el; }}
                  >
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {job.period}
                        </span>
                      </div>
                      <h3 className={`text-2xl font-bold mb-2 font-playfair ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {job.title}
                      </h3>
                      <div className="text-blue-500 font-semibold text-lg mb-1">{job.company}</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{job.location}</div>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-[1.7] mb-4`}>
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${theme === 'dark'
                              ? 'bg-[rgba(45,212,191,0.1)] text-[rgb(45,212,191)]'
                              : 'bg-[rgba(45,212,191,0.2)] text-[rgb(20,184,166)]'
                            }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={isLeft ? 'order-2' : ''}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;