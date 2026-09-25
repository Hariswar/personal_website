import { projects } from "@/constants/project";
import { jobExperiences } from "@/constants/jobexperience";
import { certifications } from "@/constants/certifications";
import { coursework } from "@/constants/room";

// Soft skills listed in the job entries; kept off the "technical" shelf
const softSkills = new Set(["Leadership", "Communication", "Teamwork", "Github"]);

// Every technology used across projects and jobs, most used first
const counts = new Map<string, number>();
[...projects.map((p) => p.technologies), ...jobExperiences.map((j) => j.technologies)]
  .flat()
  .map((t) => t.trim())
  .filter((t) => t && !softSkills.has(t))
  .forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1));

export const skills = [...counts.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([name, uses]) => ({ name, uses }));

export const courses = [
  ...coursework.map((title) => ({ title, url: undefined as string | undefined })),
  ...certifications.map((c) => ({ title: c.title, url: c.url as string | undefined })),
];
