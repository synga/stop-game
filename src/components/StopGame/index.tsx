import { useStopGame } from "@/hooks/useStopGame";
import { Disc } from "./Disc";
import { Timer } from "./Timer";

export function StopGame() {
  const {
    gameState,
    timeLeft,
    activeLetter,
    startGame,
    pressLetter,
  } = useStopGame();

  const handleCenterClick = () => {
    if (gameState === "idle" || gameState === "ended") {
      startGame();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Timer
        timeLeft={timeLeft}
        isVisible={gameState !== "idle"}
        isEnded={gameState === "ended"}
      />

      <Disc
        activeLetter={activeLetter}
        isPlaying={gameState === "playing"}
        onCenterClick={handleCenterClick}
        onLetterClick={pressLetter}
      />

      {/* Instructions */}
      <div className="mt-8 text-center text-muted-foreground text-sm sm:text-base">
        <p className="mb-1">
          <kbd className="px-2 py-1 bg-muted rounded font-mono">Espaço</kbd>{" "}
          Iniciar / Reiniciar timer
        </p>
        <p className="mb-1">
          <kbd className="px-2 py-1 bg-muted rounded font-mono">A-Z</kbd>{" "}
          Ativar letra
        </p>
        <p>
          <kbd className="px-2 py-1 bg-muted rounded font-mono">ESC</kbd>{" "}
          Parar jogo
        </p>
      </div>
    </div>
  );
}
