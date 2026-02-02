import { cn } from "@/lib/utils";

interface LetterButtonProps {
  letter: string;
  angle: number;
  radius: number;
  isActive: boolean;
  onClick: () => void;
}

export function LetterButton({
  letter,
  angle,
  radius,
  isActive,
  onClick,
}: LetterButtonProps) {
  // Calculate position using polar coordinates
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full",
        "bg-white text-foreground font-bold text-xs sm:text-sm md:text-base",
        "flex items-center justify-center",
        "shadow-md border-2 border-muted",
        "transition-all duration-150",
        "hover:scale-110 hover:bg-secondary hover:text-secondary-foreground",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        isActive && "bg-secondary text-secondary-foreground scale-125 shadow-lg"
      )}
      style={{
        left: `calc(50% + ${x}px - 1.5rem)`,
        top: `calc(50% + ${y}px - 1.5rem)`,
      }}
    >
      {letter}
    </button>
  );
}
