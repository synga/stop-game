import { cn } from "@/lib/utils";

interface TimerProps {
  timeLeft: number;
  isVisible: boolean;
  isEnded: boolean;
}

export function Timer({ timeLeft, isVisible, isEnded }: TimerProps) {
  if (!isVisible) return null;

  return (
    <div className="text-center mb-6 animate-fade-in">
      {isEnded ? (
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
          ⏰ Tempo esgotado!
        </div>
      ) : (
        <div
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl font-bold tabular-nums",
            timeLeft <= 5 ? "text-primary animate-pulse" : "text-foreground"
          )}
        >
          {timeLeft}
        </div>
      )}
    </div>
  );
}
