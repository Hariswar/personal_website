import { projects } from "@/constants/project";
import { Github, ExternalLink } from "lucide-react";
import { useTheme } from "@/Theme/darkLight";
import { useState } from "react";
import Scroll from "../Scroll";

// all the projects features with github link and online deployment
export const Projects = () => {
  const { theme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <h2 className="text-[40px] font-bold mb-8 mt-8 pt-4 text-green-400 font-playfair">Projects</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-6 overflow-y-auto"
        style={{
          maxHeight: "calc(100vh - 80px)",
          paddingRight: "3px"
        }}
      >
        {projects.map((project, idx) => (
          <Scroll
            key={idx}
            speed={0.03 * (idx % 2 === 0 ? 1 : -1)} 
            className="animate-fade-in"
          >
            <div
              className={`flex flex-col rounded-2xl overflow-hidden h-[480px] ${theme === 'dark'
                ? 'bg-[#111] border border-gray-800 hover:border-yellow-500/50'
                : 'bg-gray-50 border border-gray-200 hover:border-yellow-400'} w-full transition-all duration-300 
              hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:brightness-125`}
              style={{ animationDelay: `${idx * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={project.image} // image 
                  alt={project.title} // title 
                  className={`w-full h-full object-cover transition-transform duration-500 ${hoveredIndex === idx ? 'scale-110' : 'scale-100'}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 ${hoveredIndex === idx ? 'opacity-100' : ''} transition-opacity duration-300`}></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className={`text-2xl font-bold mb-2 font-playfair ${theme === 'light' ? 'text-gray-900' : ''}`}>{project.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-6 flex-grow text-sm leading-relaxed`}>
                  {project.description}
                </p>
                <div className="mb-6">
                  {project.technologies.map((tech, techIdx) => (
                    <span
                      key={tech}
                      className={`inline-block px-3 py-1 mr-2 mb-2 text-xs font-medium rounded-full ${theme === 'dark'
                        ? 'bg-[rgba(45,212,191,0.1)] text-[rgb(45,212,191)]'
                        : 'bg-[rgba(45,212,191,0.2)] text-[rgb(20,184,166)]'} font-mono transition-all duration-300 hover:scale-105`}
                      style={{ animationDelay: `${(idx + techIdx) * 0.05}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-400 transition-colors group"
                    >
                      <Github size={16} />
                      <span className="font-medium">Code</span>
                    </a>
                  )}
                  {project.liveUrl && (  // live url
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-green-500 hover:text-green-400 transition-colors group"
                    >
                      <ExternalLink size={16} />
                      <span className="font-medium">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Scroll>
        ))}
      </div>
    </>
  );
};

export default Projects;