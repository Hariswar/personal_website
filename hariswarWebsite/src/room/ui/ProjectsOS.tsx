import { useEffect, useState } from "react";
import { Github, ExternalLink, X, FolderGit2 } from "lucide-react";
import { projects } from "@/constants/project";

const imageSrc = (src: string) => (src ? src.replace(/^\.\//, "/") : "");

// A tiny desktop that runs on the 3D monitor: project icons open into windows
const ProjectsOS = ({ width, height }: { width: number; height: number }) => {
  const [open, setOpen] = useState<number | null>(null);
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const project = open !== null ? projects[open] : null;

  // The 3D canvas listens for clicks on its wrapper, which also contains this page.
  // Without this, a click here would be read as a click on empty space and exit the view.
  const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

  return (
    <div
      className="room-os"
      style={{ width, height }}
      onPointerDown={stop}
      onPointerUp={stop}
      onClick={stop}
      onWheel={stop}
    >
      <div className="room-os-bar">
        <span className="font-semibold">● hariswarOS</span>
        <span className="opacity-70">~/projects</span>
        <span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>

      <div className="room-os-desktop">
        {projects.map((p, i) => (
          <button key={p.title} className="room-os-icon" onClick={() => setOpen(i)} style={{ animationDelay: `${i * 45}ms` }}>
            <span className="room-os-thumb">
              {p.image ? <img src={imageSrc(p.image)} alt="" loading="lazy" /> : <FolderGit2 size={34} />}
            </span>
            <span className="room-os-name">{p.title}</span>
          </button>
        ))}
      </div>

      {project && (
        <div className="room-os-window" role="dialog" aria-label={project.title}>
          <div className="room-os-window-bar">
            <button aria-label="Close" onClick={() => setOpen(null)} className="room-os-close">
              <X size={12} />
            </button>
            <span>{project.title}</span>
          </div>
          <div className="room-os-window-body">
            {project.image && <img src={imageSrc(project.image)} alt={project.title} className="room-os-shot" />}
            <div className="min-w-0">
              <h3 className="font-playfair text-3xl font-bold mb-2">{project.title}</h3>
              <p className="text-[15px] leading-relaxed text-slate-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((t) => (
                  <span key={t} className="room-tag">{t}</span>
                ))}
              </div>
              <div className="flex gap-3">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="room-btn">
                    <Github size={16} /> Code
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="room-btn room-btn-accent">
                    <ExternalLink size={16} /> Live demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsOS;
