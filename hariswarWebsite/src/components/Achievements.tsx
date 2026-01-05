import { Card, CardContent } from "@/components/ui/card";
import { Award, Code, Trophy, Github } from "lucide-react";

const details = [
  {
    // details 6 projects 
    icon: <Code className="w-6 h-6 text-blue-400" />,
    value: "6+ Projects",
    description: "Showcases my passion in computer science through real world projects.",
  },
  {
    // details for the contributions 
    icon: <Github className="w-6 h-6 text-purple-400" />,
    value: "1.2k Contributions",
    description: "Includes all of my contributions with projects in Github.",
  },
  {
    // details for the hackathons 
    icon: <Trophy className="w-6 h-6 text-yellow-400" />,
    value: "Hackathon Finalist",
    description: "Placed as a finalist out of 5 international hackathons I have participated.",
  },
  {
    // details for the dean's list 
    icon: <Award className="w-6 h-6 text-emerald-400" />,
    value: "Dean's List",
    description: "Showcases my academic excellence from freshman year to now.",
  },
];

// displays everything and calls the above. 
export const Achievements = () => {
  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-green-400 font-playfair mb-2">Achievments</h2>
        <p className="text-muted-foreground">A reflection of my journey through code, hackathons, and learning new technologies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {details.map((stat, index) => (
          <Card key={index} className="bg-card border-border hover:border-yellow-400/60 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-primary mt-1">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Achievements;