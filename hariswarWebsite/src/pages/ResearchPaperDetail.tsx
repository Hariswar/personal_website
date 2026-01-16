import { Layout } from "../layout";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Users, BookOpen, FileText } from "lucide-react";
import { researchPapers } from "@/constants/researchPapers";
import { useTheme } from "@/Theme/darkLight";

// With the research paper deatils 
const ResearchPaperDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const paper = researchPapers.find(p => p.id === parseInt(id || "0"));

  if (!paper) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Research Paper Not Found</h1>
            <Link to="/research-paper">
              <Button>Back to Research Papers</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    // To go back to main page
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 animate-fade-in">
          <Link to="/research-paper">
            <Button
              variant="ghost"
              className="pl-0 bg-transparent text-[#FBBF24] text-lg md:text-xl hover:bg-[#FBBF24]/10 hover:scale-105 transition-all duration-200"
              >
                <ArrowLeft className="mr-2" />
                Back to Research Papers
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header Image */}
          <div className="relative overflow-hidden rounded-lg mb-8">
            <img 
              src={paper.image} 
              alt={paper.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          {/* Paper Information */}
          <Card className={`mb-8 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className="text-3xl mb-4">{paper.title}</CardTitle>
              <CardDescription className="text-lg">{paper.description}</CardDescription>
              
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{paper.authors.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{paper.publicationDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{paper.journal}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {paper.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>

          {/* With the details */}
          <Card className={`mb-8 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className="text-xl">Full Paper</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                {paper.fullContent.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* PDF of the paper */}
              <div className="mt-8 pt-6 border-t border-border">
                <a 
                  href={paper.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    className="bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-black font-semibold"
                  >
                    <FileText className="mr-2" />
                    Full paper
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ResearchPaperDetail;