import { Link } from "react-router-dom";
import { X, Github, ExternalLink, ArrowUpRight, Mail, FileText } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { projects } from "@/constants/project";
import { jobExperiences } from "@/constants/jobexperience";
import { socials } from "@/constants/socials";
import { currentlyLearning } from "@/constants/room";
import { skills, courses } from "../skills";
import { stations, StationId } from "../stations";
import { ReactNode, useEffect, useRef, useState } from "react";

const socialIcons: Record<string, ReactNode> = {
  Github: <FaGithub size={18} />,
  LinkedIn: <FaLinkedin size={18} />,
  Instagram: <FaInstagram size={18} />,
  Email: <Mail size={18} />,
};

// Side panel (bottom sheet on phones) with the details for the focused station
const InfoPanel = ({ station, onClose }: { station: StationId | null; onClose: () => void }) => {
  // keep showing the last station while the panel slides out
  const [shown, setShown] = useState<StationId | null>(station);
  if (station && station !== shown) setShown(station);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (station) body.current?.scrollTo({ top: 0 });
  }, [station]);

  const s = shown ? stations[shown] : null;

  return (
    <aside className={`room-panel ${station ? "room-panel-open" : ""}`} aria-hidden={!station} aria-label={s?.label}>
      {s && (
        <>
          <div className="room-panel-head">
            <h2 className="font-playfair text-3xl font-bold text-white">
              <span className="mr-2" aria-hidden>{s.emoji}</span>
              {s.label}
            </h2>
            <button onClick={onClose} className="room-icon-btn" aria-label="Close panel">
              <X size={18} />
            </button>
          </div>
          <div ref={body} className="room-panel-body">
            {shown === "monitor" && <ProjectsList />}
            {shown === "bookshelf" && <Skills />}
            {shown === "whiteboard" && <Learning />}
            {shown === "posters" && <Experience />}
            {shown === "phone" && <Contact />}
          </div>
        </>
      )}
    </aside>
  );
};

const ProjectsList = () => (
  <div className="space-y-4">
    {projects.map((p, i) => (
      <article key={p.title} className="room-card room-stagger" style={{ animationDelay: `${i * 50}ms` }}>
        {p.image && <img src={p.image.replace(/^\.\//, "/")} alt={p.title} loading="lazy" className="w-full h-36 object-cover rounded-lg mb-3" />}
        <h3 className="text-lg font-semibold text-white">{p.title}</h3>
        <p className="text-sm text-slate-300 line-clamp-3 mt-1">{p.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {p.technologies.map((t) => <span key={t} className="room-tag">{t}</span>)}
        </div>
        <div className="flex gap-3 mt-3">
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="room-link"><Github size={15} /> Code</a>
          )}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="room-link"><ExternalLink size={15} /> Demo</a>
          )}
        </div>
      </article>
    ))}
  </div>
);

const Skills = () => {
  const max = skills[0]?.uses ?? 1;
  return (
    <>
      <p className="text-slate-400 text-sm mb-4">Every book on the shelf is a tool I've used. Hover one to pull it out.</p>
      <h3 className="room-section">Skills</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {skills.map((s, i) => (
          <span
            key={s.name}
            className="room-tag room-stagger"
            style={{ animationDelay: `${i * 20}ms`, opacity: 0.55 + (s.uses / max) * 0.45 }}
            title={`Used in ${s.uses} project${s.uses > 1 ? "s" : ""} or role${s.uses > 1 ? "s" : ""}`}
          >
            {s.name}
          </span>
        ))}
      </div>
      <h3 className="room-section">Courses & certifications</h3>
      <ul className="space-y-2">
        {courses.map((c, i) => (
          <li key={c.title} className="room-stagger" style={{ animationDelay: `${i * 40}ms` }}>
            {c.url ? (
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="room-row group">
                <span>🎓 {c.title}</span>
                <ArrowUpRight size={16} className="shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <div className="room-row">🎓 {c.title}</div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

const Learning = () => (
  <div className="space-y-5">
    {currentlyLearning.map((item, i) => (
      <div key={item.title} className="room-card room-stagger" style={{ animationDelay: `${i * 80}ms` }}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          <span className="text-xs font-mono text-slate-400">{Math.round(item.progress * 100)}%</span>
        </div>
        <p className="text-sm text-slate-300 mt-1">{item.detail}</p>
        <div className="room-meter mt-3">
          <div style={{ width: `${item.progress * 100}%`, animationDelay: `${200 + i * 120}ms` }} />
        </div>
      </div>
    ))}
  </div>
);

const Experience = () => (
  <>
    <ol className="relative border-l border-white/15 ml-2 space-y-6">
      {jobExperiences.map((job, i) => (
        <li key={job.title} className="pl-5 relative room-stagger" style={{ animationDelay: `${i * 70}ms` }}>
          <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#ffb46b] shadow-[0_0_10px_#ffb46b]" />
          <div className="text-xs font-mono text-slate-400">{job.period}</div>
          <h3 className="text-lg font-semibold text-white mt-0.5">{job.title}</h3>
          <div className="text-sm text-[#7fb2ff]">{job.company} · {job.location}</div>
          <p className="text-sm text-slate-300 mt-2 line-clamp-4">{job.description}</p>
        </li>
      ))}
    </ol>
    <Link to="/research-paper" className="room-btn room-btn-accent mt-8 w-full justify-center">
      Read my research papers <ArrowUpRight size={16} />
    </Link>
  </>
);

const Contact = () => (
  <>
    <p className="text-slate-300 mb-5">
      Always happy to talk about internships, research, hackathons, or anything you saw in the room.
    </p>
    <div className="space-y-2">
      {socials.map(({ platform, url }, i) => (
        <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="room-row group room-stagger" style={{ animationDelay: `${i * 60}ms` }}>
          <span className="flex items-center gap-3">
            {socialIcons[platform]}
            <span>{platform === "Email" ? url.replace("mailto:", "") : platform}</span>
          </span>
          <ArrowUpRight size={16} className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
    <a href="/Hariswar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="room-btn room-btn-accent mt-6 w-full justify-center">
      <FileText size={16} /> View resume
    </a>
  </>
);

export default InfoPanel;
