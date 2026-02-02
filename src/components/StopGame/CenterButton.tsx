import { Hand } from "lucide-react";
import { cn } from "@/lib/utils";

interface CenterButtonProps {
  onClick: () => void;
  isPlaying: boolean;
}

export function CenterButton({ onClick, isPlaying }: CenterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full",
        "bg-white shadow-xl border-4 border-muted",
        "flex items-center justify-center",
        "transition-all duration-200",
        "hover:scale-105 hover:shadow-2xl",
        "focus:outline-none focus:ring-4 focus:ring-ring",
        isPlaying && "bg-primary border-primary"
      )}
    >
      <Hand
        className={cn(
          "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14",
          "transition-colors duration-200",
          isPlaying ? "text-primary-foreground" : "text-foreground"
        )}
      />
    </button>
  );
}
