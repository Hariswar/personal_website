import { Card, CardContent } from "@/components/ui/card";
import { Award, Code, Trophy, Github } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import SectionHeading from "@/components/motion/SectionHeading";
import { ReactNode } from "react";

type Detail = {
  icon: ReactNode;
  value: string;
  count?: number; // when set, the number counts up on scroll
  description: string;
  glow: string;
};

const details: Detail[] = [
  {
    // details 6 projects 
    icon: <Code className="w-6 h-6 text-blue-400" />,
    value: "Projects",
    count: 6,
    description: "Showcases my passion in computer science through real world projects.",
    glow: "from-blue-400/20",
  },
  {
    // details for the contributions 
    icon: <Github className="w-6 h-6 text-purple-400" />,
    value: "Contributions",
    count: 230,
    description: "Last year contributions with projects in Github.",
    glow: "from-purple-400/20",
  },
  {
    // details for the hackathons 
    icon: <Trophy className="w-6 h-6 text-yellow-400" />,
    value: "Hackathon Finalist",
    description: "Placed as a finalist out of 5 international hackathons I have participated.",
    glow: "from-yellow-400/20",
  },
  {
    // details for the dean's list 
    icon: <Award className="w-6 h-6 text-emerald-400" />,
    value: "Dean's List",
    description: "Showcases my academic excellence from freshman year to now.",
    glow: "from-emerald-400/20",
  },
];

// displays everything and calls the above. 
export const Achievements = () => {
  return (
    <section id="achievements" className="mt-16 max-w-4xl mx-auto">
      <SectionHeading subtitle="A reflection of my journey through code, hackathons, and learning new technologies.">
        Achievements
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {details.map((stat, index) => (
          <Reveal key={index} delay={index * 100} className="h-full">
            <Card className="group relative h-full overflow-hidden bg-card/70 backdrop-blur-sm border-border hover:border-accent/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/15 transition-all duration-300">
              {/* colored glow that rises on hover */}
              <div className={`absolute inset-0 bg-gradient-to-t ${stat.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <CardContent className="relative p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-muted/60 transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.count !== undefined && <><CountUp end={stat.count} suffix="+" />{" "}</>}
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
