import { Player } from "@/class/Player";
import { Goti } from "@/interface/utils";
import { useEffect, useState } from "react";

interface GameState {
  boardMap: Map<number, Goti[]>;
  currentPlayer: Player;
  diceValue: number;
  gamePhase: 'waiting' | 'rolling' | 'selecting' | 'moving' | 'gameOver';
  selectedGoti: Goti | null;
  isDiceAnimating: boolean;
}

const useLudoGameEngine = (players: Player[]) => {
  const [gameState, setGameState] = useState<GameState>({
    boardMap: new Map(),
    currentPlayer: players[0],
    diceValue: 1,
    gamePhase: 'waiting',
    selectedGoti: null,
    isDiceAnimating: true,
  });

  // Initialize board map with keys 1-52
  useEffect(() => {
    const initialBoardMap = new Map();
    for (let i = 1; i <= 52; i++) {
      initialBoardMap.set(i, []);
    }
    setGameState(prev => ({ ...prev, boardMap: initialBoardMap }));
  }, []);

  // Step 1: Roll dice
  const rollDice = () => {
    if (gameState.gamePhase !== 'waiting') return;
    
    setGameState(prev => ({ 
      ...prev, 
      gamePhase: 'rolling',
      isDiceAnimating: false 
    }));

    // Simulate dice roll
    setTimeout(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      setGameState(prev => ({ 
        ...prev, 
        diceValue: randomValue,
        gamePhase: 'selecting',
        isDiceAnimating: true
      }));
      
      // Start pulse animation for all goties of current player
      startGotiSelection();
    }, 2000); // 2 seconds for dice roll
  };

  // Step 2: Start goti selection phase
  const startGotiSelection = () => {
    const currentPlayerGoties = gameState.currentPlayer.getGotiArray();
    
    // Enable pulse animation for all goties
    currentPlayerGoties.forEach(goti => {
      if (goti.shape && typeof goti.shape === 'function') {
        // Update the shape component to animate
        goti.shape(true); // Enable animation
      }
    });
  };

  // Step 3: Select a goti
  const selectGoti = (goti: Goti) => {
    if (gameState.gamePhase !== 'selecting') return;
    
    setGameState(prev => ({ 
      ...prev, 
      selectedGoti: goti,
      gamePhase: 'moving'
    }));

    // Stop pulse animation for all goties
    const currentPlayerGoties = gameState.currentPlayer.getGotiArray();
    currentPlayerGoties.forEach(g => {
      if (g.shape && typeof g.shape === 'function') {
        g.shape(false); // Disable animation
      }
    });

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
        setGameState(prev => ({ 
          ...prev, 
          gamePhase: 'waiting',
          selectedGoti: null
        }));
        
        // Switch to next player
        switchToNextPlayer();
        return;
      }

      // Remove goti from current position
      const currentCellGoties = boardMap.get(currentPosition) || [];
      const updatedCurrentCell = currentCellGoties.filter(g => g !== goti);
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
      setGameState(prev => ({ 
        ...prev, 
        boardMap: new Map(boardMap)
      }));

      stepsRemaining--;
      
      // Continue to next step after delay
      setTimeout(moveStep, 500); // 500ms delay between steps
    };

    moveStep();
  };

  // Switch to next player
  const switchToNextPlayer = () => {
    const currentPlayerIndex = players.findIndex(p => p === gameState.currentPlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    const nextPlayer = players[nextPlayerIndex];
    
    setGameState(prev => ({ 
      ...prev, 
      currentPlayer: nextPlayer
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
  };
};

export default useLudoGameEngine;
