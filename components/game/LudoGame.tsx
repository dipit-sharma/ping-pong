import { Player } from "@/class/Player";
import { cW, W } from "@/constants/Colors";
import useLudoGameEngine from "@/hooks/useLudoGameEngine";
import { Goti } from "@/interface/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LudoGrid from "../LudoGrid";
import { PlayerHome } from "../PlayerHome";
import { Circle } from "./Circle";
import Dice from "./Dice";
import { Square } from "./Square";
import { Star } from "./Star";
import { Triangle } from "./Triangle";

// Define the context type
interface LudoGameContextType {
  currentPlayer: number;
  setCurrentPlayer: (player: number) => void;
  diceValue: number;
  setDiceValue: (value: number) => void;
  gameState: "waiting" | "rolling" | "moving" | "gameOver";
  setGameState: (state: "waiting" | "rolling" | "moving" | "gameOver") => void;
  boardMap: Map<number, any[]>;
  setBoardMap: (map: Map<number, any[]>) => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

// Create the context
export const LudoGameContext = createContext<LudoGameContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useLudoGame = () => {
  const context = useContext(LudoGameContext);
  if (context === undefined) {
    throw new Error("useLudoGame must be used within a LudoGameProvider");
  }
  return context;
};

// Context Provider Component
const LudoGameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [gameState, setGameState] = useState<
    "waiting" | "rolling" | "moving" | "gameOver"
  >("waiting");
  const [boardMap, setBoardMap] = useState<Map<number, any[]>>(new Map());
  const [players, setPlayers] = useState<Player[]>([]);

  const contextValue: LudoGameContextType = {
    currentPlayer,
    setCurrentPlayer,
    diceValue,
    setDiceValue,
    gameState,
    setGameState,
    boardMap,
    setBoardMap,
    players,
    setPlayers,
  };

  return (
    <LudoGameContext.Provider value={contextValue}>
      {children}
    </LudoGameContext.Provider>
  );
};

const LudoGameContent = () => {
  const [player1, setPlayer1] = useState<Player>(
    new Player((isAnimating) => <Square isAnimating={isAnimating} />, 48)
  );
  const [player2, setPlayer2] = useState<Player>(
    new Player((isAnimating) => <Star isAnimating={isAnimating} />, 9)
  );
  const [player3, setPlayer3] = useState<Player>(
    new Player((isAnimating) => <Circle isAnimating={isAnimating} />, 35)
  );
  const [player4, setPlayer4] = useState<Player>(
    new Player((isAnimating) => <Triangle isAnimating={isAnimating} />, 22)
  );

  // {currentPlayer, boardMap<number, Goti[]>} = ludoGameLoop
  // after dice rolled, currentPlayer goti moves,
  // for(i in diceVal)
  //  delete boardMap[currentGoti.id],
  //  newPosition = currentGoti.position + i
  //  if newPosition > 52, newPosition = newPosition - 52
  //  if newPosition === currentGoti.lastCell, move to home path
  //  boardMap[newPosition] = currentGoti

  const {
    gameState,
    rollDice,
    selectGoti,
    isGotiSelectionActive,
    currentPlayer: currentPlayerFromEngine,
  } = useLudoGameEngine([player1, player2, player4, player3]);

  // Get current player's goties for selection
  const currentPlayerGoties = currentPlayerFromEngine?.getGotiArray() || [];

  // Handle goti selection
  const handleGotiSelect = (goti: Goti) => {
    console.log("Goti selected in LudoGame:", goti);
    selectGoti(goti);
  };

  useEffect(() => {
    LudoGrid.createGrids();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ludo Game</Text>
      <Text style={styles.subtitle}>Play against my Algorithm</Text>

      <View style={styles.gameBoard}>
        <View style={styles.topRow}>
          <PlayerHome
            isGotiSelectionActive={
              isGotiSelectionActive && currentPlayerFromEngine === player1
            }
            size={W}
            player={player1}
            handleGotiSelect={handleGotiSelect}
          />
          <LudoGrid.TopGrid
            isGotiSelectionActive={isGotiSelectionActive}
            currentPlayerGoties={currentPlayerGoties}
            onGotiSelect={handleGotiSelect}
            boardMap={gameState.boardMap}
          />
          <PlayerHome
            isGotiSelectionActive={
              isGotiSelectionActive && currentPlayerFromEngine === player2
            }
            size={W}
            player={player2}
            handleGotiSelect={handleGotiSelect}
          />
        </View>
        <View style={styles.topRow}>
          <LudoGrid.Grid3
            isGotiSelectionActive={isGotiSelectionActive}
            currentPlayerGoties={currentPlayerGoties}
            onGotiSelect={handleGotiSelect}
            boardMap={gameState.boardMap}
          />
          <Dice rollDice={rollDice} size={(cW - 3) * 3} />
          <LudoGrid.Grid4
            isGotiSelectionActive={isGotiSelectionActive}
            currentPlayerGoties={currentPlayerGoties}
            onGotiSelect={handleGotiSelect}
            boardMap={gameState.boardMap}
          />
        </View>
        <View style={styles.bottomRow}>
          <PlayerHome
            isGotiSelectionActive={
              isGotiSelectionActive && currentPlayerFromEngine === player3
            }
            size={W}
            player={player3}
            handleGotiSelect={handleGotiSelect}
          />
          <LudoGrid.GridBottom
            isGotiSelectionActive={isGotiSelectionActive}
            currentPlayerGoties={currentPlayerGoties}
            onGotiSelect={handleGotiSelect}
            boardMap={gameState.boardMap}
          />
          <PlayerHome
            isGotiSelectionActive={
              isGotiSelectionActive && currentPlayerFromEngine === player4
            }
            size={W}
            player={player4}
            handleGotiSelect={handleGotiSelect}
          />
        </View>
      </View>
    </View>
  );
};

export const LudoGame = () => {
  return (
    <LudoGameProvider>
      <LudoGameContent />
    </LudoGameProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#808080",
    marginBottom: 30,
  },
  gameBoard: {
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
