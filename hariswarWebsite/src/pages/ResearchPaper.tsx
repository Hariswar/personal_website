import { Layout } from "../layout"; // all the needed files being imported 
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { researchPapers } from "@/constants/researchPapers";
import ParallaxWrapper from "@/components/Scroll";
import { useTheme } from "@/Theme/darkLight";
import { useState } from "react";

// Research paper in a new page 
const ResearchPaper = () => {
  const { theme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-6 animate-fade-in">
          <Link to="/">
            <Button
              variant="ghost"
              className="pl-0 bg-transparent text-[#FBBF24] text-lg md:text-xl hover:bg-[#FBBF24]/10 hover:scale-105 transition-all duration-200"
            >
              <ArrowLeft className="mr-2" />
              Back to Main Page
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-8 animate-fade-in">Research Papers</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchPapers.map((paper, index) => (
            <ParallaxWrapper key={paper.id} className="h-full">
              <Link to={`/research-paper/${paper.id}`}>
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg group ${theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700'
                      : 'bg-white border-gray-200'
                    } ${hoveredIndex === index
                      ? theme === 'dark' // when the theme is dark 
                        ? 'border-[#FBBF24]/50 shadow-[#FBBF24]/20'
                        : 'border-[#FBBF24]/50 shadow-[#FBBF24]/20'
                      : ''
                    }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={paper.image} // image 
                      alt={paper.title} // title 
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <CardTitle className="text-xl mb-2 group-hover:text-[#FBBF24] transition-colors">
                        {paper.title}
                      </CardTitle>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-[#FBBF24] transition-colors ml-2 flex-shrink-0" />
                    </div>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                      {paper.description} 
                    </CardDescription>
                    <div className="mt-4 text-xs text-muted-foreground">
                      {paper.authors.join(", ")} • {paper.publicationDate}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </ParallaxWrapper>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ResearchPaper;