import { projects } from "@/constants/project";
import { Github, ExternalLink } from "lucide-react";
import { useTheme } from "@/Theme/darkLight";
import { useState } from "react";
import Scroll from "../Scroll";

export const Projects = () => {
  const { theme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // This displays the project section with all the cards 
  return (
    <>
      <h2 className="text-[40px] font-bold mb-8 mt-8 pt-4 text-green-400 font-playfair">
        Projects
      </h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-6 overflow-y-auto items-start"
        style={{
          maxHeight: "calc(100vh - 80px)",
          paddingRight: "3px"
        }}
      > {/* creates a card for each project */}
        {projects.map((project, idx) => (
          <Scroll
            key={idx}
            speed={0.03 * (idx % 2 === 0 ? 1 : -1)}
            className="animate-fade-in"
          >
            <div
              className={`flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#111] border border-gray-800 hover:border-yellow-500/50'
                  : 'bg-gray-50 border border-gray-200 hover:border-yellow-400'
              } w-full hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:brightness-125`}
              style={{ animationDelay: `${idx * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-64 bg-black/10 overflow-hidden">
                <img
                  src={project.image} // Project image
                  alt={project.title} 
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredIndex === idx ? 'scale-105' : 'scale-100'
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 ${
                    hoveredIndex === idx ? 'opacity-100' : ''
                  } transition-opacity duration-300`}
                />
              </div>

              <div className="p-6 flex flex-col">
                <h3 className={`text-2xl font-bold mb-2 font-playfair ${theme === 'light' ? 'text-gray-900' : ''}`}>
                  {project.title}
                </h3>

                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-6 text-sm leading-relaxed`}>
                  {project.description}
                </p>

                <div className="mt-auto">
                  <div className="mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`inline-block px-3 py-1 mr-2 mb-2 text-xs font-medium rounded-full ${
                          theme === 'dark'
                            ? 'bg-[rgba(45,212,191,0.1)] text-[rgb(45,212,191)]'
                            : 'bg-[rgba(45,212,191,0.2)] text-[rgb(20,184,166)]'
                        } font-mono transition-all duration-300 hover:scale-105`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-400 transition-colors group"
                      >
                        <Github size={18} />
                        <span className="font-medium">Code</span>
                      </a>
                    )}
                    {/* Displaying live demo link */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-green-500 hover:text-green-400 transition-colors group"
                      >
                        <ExternalLink size={18} />
                        <span className="font-medium">Demo</span>
                      </a>
                    )}
                  </div>
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