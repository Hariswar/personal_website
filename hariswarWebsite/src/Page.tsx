import Experience from "@/components/features/experience";
import Footer from "@/components/SocialIcon";
import Projects from "@/components/features/projects";
import Contact from "@/components/Achievements";
import Layout from "@/layout";
import ChatBox from "@/components/Terminal"; 
import TypedIntro from "@/components/Introduction";
import Scroll from "@/components/Scroll";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [showChatBox, setShowChatBox] = useState(false);

  const handleIntroComplete = () => {
    setShowChatBox(true);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-5 animate-fade-in">
          <div className="sticky top-16">
            <div className="flex items-center gap-2 mb-6">
              <div>
                <TypedIntro onComplete={handleIntroComplete} />
              </div>
            </div>

            <div className="mt-10">
              <ChatBox startTyping={showChatBox} />
            </div>

            {/* View Resume Button */}
            <Scroll speed={0.01}>
              <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.55s" }}>
                <a href="/Hariswar_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 rounded-xl flex items-center gap-3 shadow-lg h-auto transition-all duration-300 hover:shadow-accent/40 hover:shadow-xl hover:scale-105 font-sans border-2 border-accent/50"
                  >
                    <FileText size={20} />
                    View Resume
                  </Button>
                </a>
              </div>
            </Scroll>

            <Scroll speed={0.01}>
              <Contact />
            </Scroll>

            <Footer />
          </div>
        </div>

        {/* Right Column - Projects & Experience - aligned with terminal */}
        <div className="lg:col-span-7 animate-fade-in lg:pt-0" style={{ animationDelay: "0.7s" }}>
          <Projects />
          <Scroll speed={-0.01}>
            <Experience />
          </Scroll>
        </div>
      </div>
    </Layout>
  );
};

export default Page;