import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

// Section title with an underline that draws itself in when revealed
const SectionHeading = ({ children, subtitle, className }: SectionHeadingProps) => (
  <Reveal className={cn("mb-8", className)}>
    <h2 className="group/heading relative inline-block text-4xl md:text-[40px] font-bold font-playfair text-primary">
      {children}
      <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary via-terminal-cyan to-accent transition-transform duration-700 delay-300 [.is-visible_&]:scale-x-100" />
    </h2>
    {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
  </Reveal>
);

export default SectionHeading;
