import { socials } from "@/constants/socials";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useTheme } from "@/Theme/darkLight";

// Included the all the socials that I use 
const socialIcon = {
  Github: { 
    icon: <FaGithub size={28} />, 
    color: "#a855f7",  // colors
    shadow: "rgba(168, 85, 247, 0.4)" // shadow
  },
  LinkedIn: { 
    icon: <FaLinkedin size={28} />, 
    color: "#0A66C2", 
    shadow: "rgba(10, 102, 194, 0.4)" 
  },
  Instagram: { 
    icon: <FaInstagram size={28} />, 
    color: "#E4405F", 
    shadow: "rgba(228, 64, 95, 0.4)" 
  },
  Email: { 
    icon: <MdEmail size={28} />, 
    color: "#22d3ee", 
    shadow: "rgba(34, 211, 238, 0.4)" 
  },
} as const;

export const Icon = () => {
  const { theme } = useTheme();

  return (
    <footer className="flex space-x-5 mt-8">
      {socials.map(({ platform, url }) => {
        const config = socialIcon[platform as keyof typeof socialIcon];
        if (!config) return null;

        const borderColor = theme === "dark" ? `${config.color}80` : `${config.color}60`; // based on the theme color 

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            className="group relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 bg-transparent hover:bg-white hover:border-white hover:scale-110"
            style={{ 
              color: config.color, 
              borderColor: borderColor 
            }}
            // Using a CSS variable for the shadow which keeps the JSX clean
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 20px ${config.shadow}, 0 0 40px ${config.shadow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {config.icon}
          </a>
        );
      })}
    </footer>
  );
};

export default Icon;