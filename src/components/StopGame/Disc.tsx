import { LetterButton } from "./LetterButton";
import { CenterButton } from "./CenterButton";
import { useIsMobile } from "@/hooks/use-mobile";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface DiscProps {
  activeLetter: string | null;
  isPlaying: boolean;
  onCenterClick: () => void;
  onLetterClick: (letter: string) => void;
}

export function Disc({
  activeLetter,
  isPlaying,
  onCenterClick,
  onLetterClick,
}: DiscProps) {
  const isMobile = useIsMobile();
  
  // Adjust radius based on screen size
  const radius = isMobile ? 130 : 180;
  const discSize = isMobile ? 320 : 420;

  return (
    <div
      className="relative mx-auto"
      style={{ width: discSize, height: discSize }}
    >
      {/* Outer red ring */}
      <div
        className="absolute inset-0 rounded-full bg-primary shadow-2xl"
        style={{
          background: `radial-gradient(circle, 
            hsl(var(--stop-blue)) 0%, 
            hsl(var(--stop-blue)) 40%, 
            hsl(var(--stop-red-dark)) 40%, 
            hsl(var(--stop-red)) 60%,
            hsl(var(--stop-blue-dark)) 60%,
            hsl(var(--stop-blue)) 80%,
            hsl(var(--stop-red-dark)) 80%,
            hsl(var(--stop-red)) 100%
          )`,
        }}
      />

      {/* Letter buttons arranged in a circle */}
      {ALPHABET.map((letter, index) => {
        const angle = (index * 360) / 26 - 90; // Start from top (-90 degrees)
        return (
          <LetterButton
            key={letter}
            letter={letter}
            angle={angle}
            radius={radius}
            isActive={activeLetter === letter}
            onClick={() => onLetterClick(letter)}
          />
        );
      })}

      {/* Center button with hand icon */}
      <CenterButton onClick={onCenterClick} isPlaying={isPlaying} />
    </div>
  );
}
