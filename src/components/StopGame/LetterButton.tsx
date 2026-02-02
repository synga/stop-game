import { cn } from "@/lib/utils";

interface LetterButtonProps {
  letter: string;
  angle: number;
  radius: number;
  isActive: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export function LetterButton({
  letter,
  angle,
  radius,
  isActive,
  isSelected,
  isDisabled,
  onClick,
}: LetterButtonProps) {
  // Calculate position using polar coordinates
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "absolute w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full",
        "bg-white text-foreground font-bold text-sm sm:text-base md:text-lg",
        "flex items-center justify-center",
        "shadow-md border-2 border-muted",
        "transition-all duration-150",
        "hover:scale-110 hover:bg-secondary hover:text-secondary-foreground",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        isActive && "bg-secondary text-secondary-foreground scale-125 shadow-lg",
        isSelected && !isActive && "bg-secondary text-secondary-foreground scale-110 shadow-lg ring-2 ring-secondary",
        isDisabled && "opacity-40 cursor-not-allowed hover:scale-100 hover:bg-white hover:text-foreground"
      )}
      style={{
        left: `calc(50% + ${x}px - 1.75rem)`,
        top: `calc(50% + ${y}px - 1.75rem)`,
      }}
    >
      {letter}
    </button>
  );
}
