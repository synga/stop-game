import { useState } from "react";
import { useStopGame } from "@/hooks/useStopGame";
import { Disc } from "./Disc";
import { Timer } from "./Timer";
import { ThemeDialog } from "./ThemeDialog";

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
    pressLetter,
    resetTimer,
    cancelThemeDialog,
  } = useStopGame();

  const handleCenterClick = () => {
    if (gameState === "idle" || gameState === "ended") {
      requestTheme();
    } else if (gameState === "playing") {
      resetTimer();
    }
  };

  const handleThemeSubmit = (roundTheme: string) => {
    startGame(roundTheme);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      {/* Theme display */}
      {theme && (gameState === "playing" || gameState === "ended") && (
        <div className="mb-4 px-6 py-3 bg-card rounded-xl shadow-lg border">
          <p className="text-sm text-muted-foreground">Tema da rodada:</p>
          <p className="text-xl font-bold text-foreground">{theme}</p>
        </div>
      )}

      <Timer
        timeLeft={timeLeft}
        isVisible={gameState === "playing" || gameState === "ended"}
        isEnded={gameState === "ended"}
      />

      <Disc
        activeLetter={activeLetter}
        selectedLetter={selectedLetter}
        disabledLetters={disabledLetters}
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
          Selecionar letra
        </p>
        <p>
          <kbd className="px-2 py-1 bg-muted rounded font-mono">ESC</kbd>{" "}
          Parar jogo
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
