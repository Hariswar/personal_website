import { projects } from "@/constants/project";
import { Github, ExternalLink } from "lucide-react";
import { useTheme } from "@/Theme/darkLight";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import SectionHeading from "@/components/motion/SectionHeading";

export const Projects = () => {
  const { theme } = useTheme();

  // This displays the project section with all the cards 
  return (
    <section id="projects">
      <SectionHeading className="mt-8 pt-4">Projects</SectionHeading>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto p-2 -m-2"
        style={{
          maxHeight: "calc(100vh - 80px)",
        }}
      > {/* creates a card for each project */}
        {projects.map((project, idx) => (
          <Reveal key={idx} delay={(idx % 2) * 120} className="h-full">
            <TiltCard className="h-full rounded-2xl">
              <div
                className={`group flex flex-col h-full w-full rounded-2xl overflow-hidden transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#111]/80 border border-gray-800 hover:border-accent/60'
                    : 'bg-white/80 border border-gray-200 hover:border-accent'
                } backdrop-blur-sm hover:shadow-[0_20px_40px_-12px_hsl(var(--accent)/0.35)]`}
              >
                <div className="relative w-full h-56 bg-black/10 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    // placeholder for projects that don't have a screenshot yet
                    <div className="w-full h-full grid place-items-center bg-gradient-to-br from-primary/30 via-terminal-cyan/20 to-accent/30 bg-[length:200%_200%] animate-gradient-x transition-transform duration-700 ease-out group-hover:scale-110">
                      <span className="font-mono text-sm text-foreground/70">&lt;{project.title} /&gt;</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* quick links slide up over the image on hover */}
                  <div className="absolute bottom-3 left-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} source code`}
                        className="grid place-items-center w-9 h-9 rounded-full bg-white/90 text-black hover:bg-white hover:scale-110 transition-transform"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="grid place-items-center w-9 h-9 rounded-full bg-white/90 text-black hover:bg-white hover:scale-110 transition-transform"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className={`text-2xl font-bold mb-2 font-playfair transition-colors group-hover:text-accent ${theme === 'light' ? 'text-gray-900' : ''}`}>
                    {project.title}
                  </h3>

                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4 text-sm leading-relaxed line-clamp-4`}>
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`inline-block px-3 py-1 mr-2 mb-2 text-xs font-medium rounded-full ${
                            theme === 'dark'
                              ? 'bg-[rgba(45,212,191,0.1)] text-[rgb(45,212,191)]'
                              : 'bg-[rgba(45,212,191,0.2)] text-[rgb(20,184,166)]'
                          } font-mono transition-all duration-300 hover:scale-110 hover:-translate-y-0.5`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-400 transition-colors group/link"
                        >
                          <Github size={18} className="transition-transform group-hover/link:-rotate-12" />
                          <span className="font-medium bg-[length:0%_1px] bg-left-bottom bg-no-repeat bg-gradient-to-r from-current to-current transition-[background-size] duration-300 group-hover/link:bg-[length:100%_1px]">Code</span>
                        </a>
                      )}
                      {/* Displaying live demo link */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-green-500 hover:text-green-400 transition-colors group/link"
                        >
                          <ExternalLink size={18} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          <span className="font-medium bg-[length:0%_1px] bg-left-bottom bg-no-repeat bg-gradient-to-r from-current to-current transition-[background-size] duration-300 group-hover/link:bg-[length:100%_1px]">Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
