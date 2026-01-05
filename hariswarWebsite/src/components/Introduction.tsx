import React, { useState, useEffect, useRef } from 'react';

// Defined the props for the typed intro part.  
interface IntroductionProps {
  onComplete?: () => void;
}

// These are the components that handles the typing animation for the my name intro and role intro
const Introduction = ({ onComplete }: IntroductionProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [displayedPrefix, setDisplayedPrefix] = useState('');
  const [displayedRole, setDisplayedRole] = useState('');
  const [showRole, setShowRole] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/keyboard-typing-sound-effect-33550315.mp3'); // gets the audio file from the public folder
    audio.volume = 0.15;
    audioRef.current = audio;

    const text = "Hey, It's\nHariswar 👋";
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));

        // So bascially it allows to play sound only for the non-space characters. 
        if (text[currentIndex] !== ' ' && text[currentIndex] !== '\n') {
          audioRef.current?.play().catch(error => console.log("Audio play failed:", error));
          audioRef.current!.currentTime = 0;
        }

        currentIndex++;
      } else {
        // this would stop typing once the text is done. 
        clearInterval(typingInterval);
        setTypingComplete(true);

        // delay before starting to type the role
        setTimeout(() => {
          setShowRole(true);
          typePrefixText();
        }, 500);
      }
    }, 100); // this is the typing speed in milliseconds

    return () => {
      clearInterval(typingInterval);
      audioRef.current = null;
    };
  }, []);

  const typePrefixText = () => {
    const prefixText = "I am a ";
    let prefixIndex = 0;

    const prefixTypingInterval = setInterval(() => {
      if (prefixIndex < prefixText.length) {
        setDisplayedPrefix(prefixText.substring(0, prefixIndex + 1));
        prefixIndex++;
      } else {
        clearInterval(prefixTypingInterval);
        // Start typing role after prefix is complete
        roleType();
      }
    }, 100);
  };

  // This is the role that displays under my name as developer. 
  const roleType = () => {
    const roleText = "Developer";
    let roleIndex = 0;

    const roleTypingInterval = setInterval(() => {
      if (roleIndex < roleText.length) {
        setDisplayedRole(roleText.substring(0, roleIndex + 1));
        roleIndex++;
      } else {
        clearInterval(roleTypingInterval);
        setTimeout(() => {
          onComplete?.();
        }, 1000);
      }
    }, 100);
  };

  return (
    <h1 className="text-6xl md:text-7xl font-extrabold font-playfair leading-tight -mt-10">
      {displayedText.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <span className="text-foreground">{line}</span>
          ) : (
            <span className="text-primary">
              {line.includes('👋') ? (
                <>
                  {line.split('👋')[0]}
                  <span className="inline-block hover:animate-wave origin-bottom-right cursor-pointer">
                    👋
                  </span>
                </>
              ) : (
                line
              )}
            </span>
          )}
          {index < displayedText.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
      {showRole && (
        // this would show the prefix and role.  
        <div className="mt-3 text-3xl md:text-4xl font-playfair font-bold">
          <span className="text-foreground">{displayedPrefix}</span>
          <span className="text-accent">{displayedRole}</span>
        </div>
      )}
    </h1>
  );
};

export default Introduction;