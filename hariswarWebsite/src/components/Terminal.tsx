import { useState, useEffect } from 'react';

// ths would trigger to start the typing inside the terminal
type terminalProps = {
  startTyping?: boolean;
};

const terminalSetup = ({ startTyping = false }: terminalProps) => {
  const [displayedMessages, setDisplayedMessages] = useState<Array<{ text: string, isUser: boolean, isComplete: boolean }>>([]);
  // shows which message is being typed
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // all the infromation inside the terminal 
  const informationInTerminal = [
    { text: "Hello, I'm Hariswar!", isUser: false },
    { text: "Where do you study?", isUser: true },
    { text: "I am studying Computer Science at Missouri University of Science and Technology", isUser: false },
    { text: "What do you do?", isUser: true },
    { text: "I'm a .", isUser: false }, // I have to finish this
    { text: "What are you involved in?", isUser: true },
    { text: "I", isUser: false }, // I have to finish this
    { text: "What's next?", isUser: true },
    { text: "I'm seeking opportunities to apply my skills in real-world situations", isUser: false } // I have to finish this 
  ];

  // Start typing animation when the terminal prop changes
  useEffect(() => {
    if (startTyping) {
      setIsActive(true);
    }
  }, [startTyping]);

  useEffect(() => {
    if (!isActive) return;

    if (currentMessageIndex < informationInTerminal.length) {
      const currentMessage = informationInTerminal[currentMessageIndex];

      if (currentCharIndex < currentMessage.text.length) {
        const timer = setTimeout(() => {
          setDisplayedMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[currentMessageIndex]) {
              newMessages[currentMessageIndex] = {
                ...newMessages[currentMessageIndex],
                text: currentMessage.text.substring(0, currentCharIndex + 1)
              };
            } else {
              newMessages[currentMessageIndex] = {
                text: currentMessage.text.substring(0, currentCharIndex + 1),
                isUser: currentMessage.isUser,
                isComplete: false
              };
            }
            return newMessages;
          });

          setCurrentCharIndex(prev => prev + 1);
        }, 50); // Typing speed

        return () => clearTimeout(timer);
      } else {
        // Current message is complete
        setDisplayedMessages(prev => {
          const newMessages = [...prev];
          newMessages[currentMessageIndex] = {
            ...newMessages[currentMessageIndex],
            isComplete: true
          };
          return newMessages;
        });

        // Move to next message after the pause
        const nextMessageTimer = setTimeout(() => {
          setCurrentMessageIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, currentMessageIndex === 0 ? 1000 : 1500);

        return () => clearTimeout(nextMessageTimer);
      }
    }
  }, [currentMessageIndex, currentCharIndex, isActive]);

  // Syntax highlighting helper
  const renderSyntaxHighlight = (text: string, isUser: boolean) => {
    if (isUser) {
      return <span className="text-terminal-comment font-mono">{text}</span>;
    }

    // Parse for basic syntax highlighting
    const parts = text.split(/(".*?"|'.*?')/g);

    return parts.map((part, i) => {
      if (part.startsWith('"') || part.startsWith("'")) {
        return <span key={i} className="text-terminal-string font-mono">{part}</span>;
      }
      // Highlight keywords
      const keywords = ['I', "I'm", 'Hello', 'Let'];
      keywords.forEach(keyword => {
        if (part.includes(keyword)) {
        }
      });
      return <span key={i} className="text-terminal-green font-mono">{part}</span>;
    });
  };

  return (
    <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
      {/* Terminal Header*/}
      <div className="rounded-t-lg bg-terminal-header border border-border px-3 py-2 flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        <span className="ml-3 text-xs text-muted-foreground font-mono">hariswar@portfolio ~ </span>
      </div>

      {/* Terminal Body */}
      <div className="bg-terminal-bg border-x border-b border-border rounded-b-lg p-5 font-mono text-sm min-h-[200px]">
        {displayedMessages.map((message, index) => (
          <div key={index} className="mb-3 leading-relaxed">
            <span className={`${message.isUser ? 'text-terminal-yellow' : 'text-terminal-green'
              }`}>
              <span className="text-terminal-purple">{message.isUser ? '// ' : '$ '}</span>
              {renderSyntaxHighlight(message.text, message.isUser)}
            </span>
            {!message.isComplete && index === currentMessageIndex && (
              <span className={`animate-cursor-blink ml-0.5 ${message.isUser ? 'text-terminal-yellow' : 'text-terminal-green'
                }`}>
                █
              </span>
            )}
          </div>
        ))}

        {// Resume prompt after infromation in the terminal box in done
        }
        {currentMessageIndex >= informationInTerminal.length && (
          <div className="mt-4 pt-4 border-t border-border">
            <span className="text-terminal-cyan">
              <span className="text-terminal-purple">$ </span>
              Check out my resume attached below.
            </span>
            <span className="animate-cursor-blink ml-0.5 text-terminal-cyan">█</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default terminalSetup;