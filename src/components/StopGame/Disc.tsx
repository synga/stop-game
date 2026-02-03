import { LetterButton } from "./LetterButton";
import { CenterButton } from "./CenterButton";
import { useIsMobile } from "@/hooks/use-mobile";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface DiscProps {
  activeLetter: string | null;
  selectedLetter: string | null;
  disabledLetters: Set<string>;
  isPlaying: boolean;
  onCenterClick: () => void;
  onLetterClick: (letter: string) => void;
}

export function Disc({
  activeLetter,
  selectedLetter,
  disabledLetters,
  isPlaying,
  onCenterClick,
  onLetterClick,
}: DiscProps) {
  const isMobile = useIsMobile();
  
  // Increased radius for better spacing between letters
  const radius = isMobile ? 155 : 220;
  const discSize = isMobile ? 380 : 520;

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
            hsl(var(--stop-blue)) 35%, 
            hsl(var(--stop-red-dark)) 35%, 
            hsl(var(--stop-red)) 55%,
            hsl(var(--stop-blue-dark)) 55%,
            hsl(var(--stop-blue)) 75%,
            hsl(var(--stop-red-dark)) 75%,
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
            isSelected={selectedLetter === letter}
            isDisabled={disabledLetters.has(letter)}
            onClick={() => onLetterClick(letter)}
          />
        );
      })}

      {/* Center button with hand icon */}
      <CenterButton onClick={onCenterClick} isPlaying={isPlaying} />
    </div>
  );
}
