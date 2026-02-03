import { useState, useEffect, useCallback, useRef } from "react";

type GameState = "idle" | "awaiting_theme" | "playing" | "ended" | "continuing";

export function useStopGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [timeLeft, setTimeLeft] = useState(20);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [disabledLetters, setDisabledLetters] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<string>("");
  const intervalRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const requestTheme = useCallback(() => {
    setGameState("awaiting_theme");
  }, []);

  const startGame = useCallback((roundTheme: string) => {
    clearTimer();
    setTimeLeft(20);
    setTheme(roundTheme);
    setDisabledLetters(new Set());
    setSelectedLetter(null);
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
    setTheme("");
    setDisabledLetters(new Set());
    setSelectedLetter(null);
  }, [clearTimer]);

  const resetTimer = useCallback(() => {
    if (gameState === "playing") {
      // Disable the currently selected letter when resetting
      if (selectedLetter) {
        setDisabledLetters((prev) => new Set([...prev, selectedLetter]));
        setSelectedLetter(null);
      }
      
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
  }, [gameState, clearTimer, selectedLetter]);

  const pressLetter = useCallback((letter: string) => {
    const upperLetter = letter.toUpperCase();
    if (disabledLetters.has(upperLetter)) return;
    
    setActiveLetter(upperLetter);
    setSelectedLetter(upperLetter);
    setTimeout(() => setActiveLetter(null), 200);
  }, [disabledLetters]);
  const cancelThemeDialog = useCallback(() => {
    setGameState("idle");
  }, []);

  const continueGame = useCallback(() => {
    if (gameState === "ended") {
      // Disable the currently selected letter
      if (selectedLetter) {
        setDisabledLetters((prev) => new Set([...prev, selectedLetter]));
        setSelectedLetter(null);
      }
      setGameState("continuing");
    }
  }, [gameState, selectedLetter]);

  const selectLetterAndRestart = useCallback((letter: string) => {
    const upperLetter = letter.toUpperCase();
    if (disabledLetters.has(upperLetter)) return;
    
    setActiveLetter(upperLetter);
    setSelectedLetter(upperLetter);
    setTimeout(() => setActiveLetter(null), 200);
    
    // Start timer again
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
  }, [disabledLetters, clearTimer]);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (e.code === "Space") {
        e.preventDefault();
        if (gameState === "idle" || gameState === "ended") {
          requestTheme();
        } else if (gameState === "playing") {
          resetTimer();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        if (gameState === "awaiting_theme") {
          cancelThemeDialog();
        }
      } else if (/^[A-Z]$/.test(key)) {
        if (gameState === "playing") {
          pressLetter(key);
        } else if (gameState === "continuing") {
          selectLetterAndRestart(key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, requestTheme, resetTimer, pressLetter, cancelThemeDialog, selectLetterAndRestart]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    gameState,
    timeLeft,
    activeLetter,
    selectedLetter,
    disabledLetters,
    theme,
    requestTheme,
    startGame,
    stopGame,
    resetTimer,
    pressLetter,
    cancelThemeDialog,
    continueGame,
    selectLetterAndRestart,
  };
}
