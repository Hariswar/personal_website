import { socials } from "@/constants/socials";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useTheme } from "@/Theme/darkLight";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";
import { CSSProperties } from "react";

// Included the all the socials that I use 
const socialIcon = {
  Github: { 
    icon: <FaGithub size={26} />, 
    color: "#a855f7",  // colors
    shadow: "rgba(168, 85, 247, 0.4)" // shadow
  },
  LinkedIn: { 
    icon: <FaLinkedin size={26} />, 
    color: "#0A66C2", 
    shadow: "rgba(10, 102, 194, 0.4)" 
  },
  Instagram: { 
    icon: <FaInstagram size={26} />, 
    color: "#E4405F", 
    shadow: "rgba(228, 64, 95, 0.4)" 
  },
  Email: { 
    icon: <MdEmail size={26} />, 
    color: "#22d3ee", 
    shadow: "rgba(34, 211, 238, 0.4)" 
  },
} as const;

export const Icon = () => {
  const { theme } = useTheme();

  return (
    <footer className="flex flex-wrap gap-4 mt-8 mb-12">
      {socials.map(({ platform, url }, index) => {
        const config = socialIcon[platform as keyof typeof socialIcon];
        if (!config) return null;

        const borderColor = theme === "dark" ? `${config.color}80` : `${config.color}60`; // based on the theme color 

        return (
          <Reveal key={platform} direction="scale" delay={index * 90}>
            <Magnetic strength={0.4} className="group relative">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="group relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-[0_0_20px_var(--glow),0_0_40px_var(--glow)]"
                style={{ 
                  color: config.color, 
                  borderColor: borderColor,
                  "--glow": config.shadow,
                } as CSSProperties}
              >
                {/* color fills in from the bottom on hover */}
                <span
                  className="absolute inset-0 translate-y-full rounded-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                  style={{ background: config.color }}
                />
                <span className="relative transition-all duration-300 group-hover:text-white group-hover:scale-110 group-hover:-rotate-6">
                  {config.icon}
                </span>
              </a>
              {/* tooltip */}
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                {platform}
              </span>
            </Magnetic>
          </Reveal>
        );
      })}
    </footer>
  );
};

export default Icon;
