import { useStopGame } from "@/hooks/useStopGame";
import { Disc } from "./Disc";
import { Timer } from "./Timer";
import { ThemeDialog } from "./ThemeDialog";
import { Button } from "@/components/ui/button";
import { StopCircle, Play } from "lucide-react";

export function StopGame() {
  const {
    gameState,
    timeLeft,
    activeLetter,
    selectedLetter,
    disabledLetters,
    theme,
    requestTheme,
    startGame,
    stopGame,
    pressLetter,
    resetTimer,
    cancelThemeDialog,
    continueGame,
    selectLetterAndRestart,
  } = useStopGame();

  const handleCenterClick = () => {
    if (gameState === "idle" || gameState === "ended") {
      requestTheme();
    } else if (gameState === "playing") {
      resetTimer();
    }
  };

  const handleLetterClick = (letter: string) => {
    if (gameState === "continuing") {
      selectLetterAndRestart(letter);
    } else {
      pressLetter(letter);
    }
  };

  const handleThemeSubmit = (roundTheme: string) => {
    startGame(roundTheme);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      {/* Theme display */}
      {theme && (gameState === "playing" || gameState === "ended" || gameState === "continuing") && (
        <div className="mb-4 px-6 py-3 bg-card rounded-xl shadow-lg border">
          <p className="text-sm text-muted-foreground">Tema da rodada:</p>
          <p className="text-xl font-bold text-foreground">{theme}</p>
        </div>
      )}

      <Timer
        timeLeft={timeLeft}
        isVisible={gameState === "playing" || gameState === "ended" || gameState === "continuing"}
        isEnded={gameState === "ended" || gameState === "continuing"}
      />

      {/* Continue instruction */}
      {gameState === "continuing" && (
        <p className="mb-4 text-muted-foreground text-sm">Clique em uma letra para continuar</p>
      )}

      <Disc
        activeLetter={activeLetter}
        selectedLetter={selectedLetter}
        disabledLetters={disabledLetters}
        isPlaying={gameState === "playing" || gameState === "continuing"}
        onCenterClick={handleCenterClick}
        onLetterClick={handleLetterClick}
      />

      {/* Game control buttons */}
      <div className="mt-6 flex gap-4">
        {(gameState === "playing" || gameState === "continuing") && (
          <Button
            variant="destructive"
            onClick={stopGame}
            className="gap-2"
          >
            <StopCircle className="w-4 h-4" />
            Parar Jogo
          </Button>
        )}
        
        {gameState === "ended" && (
          <Button
            onClick={continueGame}
            className="gap-2"
          >
            <Play className="w-4 h-4" />
            Continuar
          </Button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center text-muted-foreground text-sm sm:text-base">
        <p className="mb-1">
          <kbd className="px-2 py-1 bg-muted rounded font-mono">Espaço</kbd>{" "}
          Iniciar / Reiniciar timer
        </p>
        <p>
          <kbd className="px-2 py-1 bg-muted rounded font-mono">A-Z</kbd>{" "}
          Selecionar letra
        </p>
      </div>

      {/* Theme dialog */}
      <ThemeDialog
        isOpen={gameState === "awaiting_theme"}
        onSubmit={handleThemeSubmit}
        onCancel={cancelThemeDialog}
      />
    </div>
  );
}
