import { useState, useEffect, useCallback, useRef } from "react";

type GameState = "idle" | "playing" | "ended";

export function useStopGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [timeLeft, setTimeLeft] = useState(20);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    clearTimer();
    setTimeLeft(20);
    setGameState("playing");

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setGameState("ended");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  const stopGame = useCallback(() => {
    clearTimer();
    setGameState("idle");
    setTimeLeft(20);
  }, [clearTimer]);

  const resetTimer = useCallback(() => {
    if (gameState === "playing") {
      clearTimer();
      setTimeLeft(20);

      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            setGameState("ended");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [gameState, clearTimer]);

  const pressLetter = useCallback((letter: string) => {
    setActiveLetter(letter.toUpperCase());
    setTimeout(() => setActiveLetter(null), 200);
  }, []);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (e.code === "Space") {
        e.preventDefault();
        if (gameState === "idle" || gameState === "ended") {
          startGame();
        } else if (gameState === "playing") {
          resetTimer();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        stopGame();
      } else if (/^[A-Z]$/.test(key) && gameState === "playing") {
        pressLetter(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, startGame, stopGame, resetTimer, pressLetter]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    gameState,
    timeLeft,
    activeLetter,
    startGame,
    stopGame,
    resetTimer,
    pressLetter,
  };
}
