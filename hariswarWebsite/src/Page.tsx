import Experience from "@/components/features/experience";
import Footer from "@/components/SocialIcon";
import Projects from "@/components/features/projects";
import Contact from "@/components/Achievements";
import Certifications from "@/components/features/certifications";
import Layout from "@/layout";
import ChatBox from "@/components/Terminal"; 
import TypedIntro from "@/components/Introduction";
import Scroll from "@/components/Scroll";
import Magnetic from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/button";
import { FileText, ArrowUpRight } from "lucide-react";
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
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-6 mt-10">
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
                <Magnetic strength={0.25}>
                  <a href="/Hariswar_Resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Button
                      className="group relative overflow-hidden bg-accent hover:bg-accent text-accent-foreground font-semibold px-8 py-4 rounded-xl flex items-center gap-3 shadow-lg shadow-accent/20 h-auto transition-all duration-300 hover:shadow-accent/50 hover:shadow-2xl font-sans border-2 border-accent/50"
                    >
                      {/* light sweeping across the button */}
                      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine" />
                      <FileText size={20} className="transition-transform duration-300 group-hover:-rotate-12" />
                      View Resume
                      <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Button>
                  </a>
                </Magnetic>
              </div>
            </Scroll>

            <Scroll speed={0.01}>
              <Contact />
            </Scroll>

            <Scroll speed={0.01}>
              <Certifications />
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
