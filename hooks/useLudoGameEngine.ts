import { Player } from "@/class/Player";
import { Goti } from "@/interface/utils";
import { useEffect, useState } from "react";
import { Animated } from "react-native";

interface GameState {
  boardMap: Map<number, Goti[]>;
  currentPlayer: Player;
  diceValue: number;
  gamePhase: "waiting" | "rolling" | "selecting" | "moving" | "gameOver";
  selectedGoti: Goti | null;
  isDiceAnimating: boolean;
  isGotiSelectionActive: boolean; // New state for goti selection animation
}

interface RollDiceParams {
  scaleAnim: Animated.Value;
  setDiceValue: (value: number) => void;
  setIsRolling: (isRolling: boolean) => void;
  onRollComplete?: (value: number) => void;
  pulseAnimation: Animated.CompositeAnimation;
}

const useLudoGameEngine = (players: Player[]) => {
  const [gameState, setGameState] = useState<GameState>({
    boardMap: new Map(),
    currentPlayer: players[0],
    diceValue: 1,
    gamePhase: "waiting",
    selectedGoti: null,
    isDiceAnimating: true,
    isGotiSelectionActive: false, // Initialize as false
  });

  // Initialize board map with keys 1-52
  useEffect(() => {
    const initialBoardMap = new Map();
    for (let i = 1; i <= 52; i++) {
      initialBoardMap.set(i, []);
    }
    setGameState((prev) => ({ ...prev, boardMap: initialBoardMap }));
  }, []);

  // Step 1: Roll dice
  const rollDice = (params: RollDiceParams) => {
    const { scaleAnim, setDiceValue, setIsRolling, onRollComplete, pulseAnimation } = params;
    
    if (gameState.gamePhase !== "waiting") return;

    setGameState((prev) => ({
      ...prev,
      gamePhase: "rolling",
      isDiceAnimating: false,
      isGotiSelectionActive: false, // Reset goti selection state
    }));

    scaleAnim.stopAnimation();
    const numbers = Array.from(
      { length: 5 },
      () => Math.floor(Math.random() * 6) + 1
    );
    let currentIndex = 0;

    let finalValue = 0;
    const rollInterval = setInterval(() => {
      if (currentIndex < numbers.length) {
        setDiceValue(numbers[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(rollInterval);

        // Final random number
        finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setIsRolling(false);

        // Callback with final value
        onRollComplete?.(finalValue);

        pulseAnimation.start();

        // Update game state with final dice value
        setGameState((prev) => ({
          ...prev,
          diceValue: finalValue,
          gamePhase: "selecting",
          isDiceAnimating: true,
        }));

        // Start goti selection after a short delay to ensure state is updated
        setTimeout(() => {
          startGotiSelection();
        }, 100);
      }
    }, 400);
  };

  // Step 2: Start goti selection phase
  const startGotiSelection = () => {
    console.log("Starting goti selection..."); // Debug log
    
    setGameState((prev) => ({
      ...prev,
      isGotiSelectionActive: true, // Enable goti selection animation
    }));

    // The actual animation will be handled by the Goti components
    // based on the isGotiSelectionActive state
  };

  // Step 3: Select a goti
  const selectGoti = (goti: Goti) => {
    if (gameState.gamePhase !== "selecting") return;

    console.log("Goti selected:", goti); // Debug log

    setGameState((prev) => ({
      ...prev,
      selectedGoti: goti,
      gamePhase: "moving",
      isGotiSelectionActive: false, // Disable goti selection animation
    }));

    // Start moving the selected goti
    moveGoti(goti);
  };

  // Step 4: Move goti step by step
  const moveGoti = (goti: Goti) => {
    const { diceValue, boardMap } = gameState;
    let currentPosition = goti.position;
    let stepsRemaining = diceValue;

    const moveStep = () => {
      if (stepsRemaining <= 0) {
        // Movement complete
        setGameState((prev) => ({
          ...prev,
          gamePhase: "waiting",
          selectedGoti: null,
        }));

        // Switch to next player
        switchToNextPlayer();
        return;
      }

      // Remove goti from current position
      const currentCellGoties = boardMap.get(currentPosition) || [];
      const updatedCurrentCell = currentCellGoties.filter((g) => g !== goti);
      boardMap.set(currentPosition, updatedCurrentCell);

      // Calculate new position
      currentPosition++;
      if (currentPosition > 52) {
        currentPosition = currentPosition - 52;
      }

      // Add goti to new position
      const newCellGoties = boardMap.get(currentPosition) || [];
      newCellGoties.push(goti);
      boardMap.set(currentPosition, newCellGoties);

      // Update goti position
      goti.position = currentPosition;

      // Update board map
      setGameState((prev) => ({
        ...prev,
        boardMap: new Map(boardMap),
      }));

      stepsRemaining--;

      // Continue to next step after delay
      setTimeout(moveStep, 500); // 500ms delay between steps
    };

    moveStep();
  };

  // Switch to next player
  const switchToNextPlayer = () => {
    const currentPlayerIndex = players.findIndex(
      (p) => p === gameState.currentPlayer
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    const nextPlayer = players[nextPlayerIndex];

    setGameState((prev) => ({
      ...prev,
      currentPlayer: nextPlayer,
    }));
  };

  return {
    gameState,
    rollDice,
    selectGoti,
    boardMap: gameState.boardMap,
    currentPlayer: gameState.currentPlayer,
    diceValue: gameState.diceValue,
    gamePhase: gameState.gamePhase,
    isDiceAnimating: gameState.isDiceAnimating,
    isGotiSelectionActive: gameState.isGotiSelectionActive, // Export this state
  };
};

export default useLudoGameEngine;
