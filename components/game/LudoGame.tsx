import { Player } from "@/class/Player";
import { cW, W } from "@/constants/Colors";
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
  gameState: 'waiting' | 'rolling' | 'moving' | 'gameOver';
  setGameState: (state: 'waiting' | 'rolling' | 'moving' | 'gameOver') => void;
  boardMap: Map<number, any[]>;
  setBoardMap: (map: Map<number, any[]>) => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

// Create the context
export const LudoGameContext = createContext<LudoGameContextType | undefined>(undefined);

// Custom hook to use the context
export const useLudoGame = () => {
  const context = useContext(LudoGameContext);
  if (context === undefined) {
    throw new Error('useLudoGame must be used within a LudoGameProvider');
  }
  return context;
};

// Context Provider Component
const LudoGameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [gameState, setGameState] = useState<'waiting' | 'rolling' | 'moving' | 'gameOver'>('waiting');
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
  const [player1, setPlayer1] = useState<Player>(new Player((isAnimating)=><Square isAnimating={isAnimating} />, 0));
  const [player2, setPlayer2] = useState<Player>(new Player((isAnimating)=><Star isAnimating={isAnimating} />, 1));
  const [player3, setPlayer3] = useState<Player>(new Player((isAnimating)=><Circle isAnimating={isAnimating} />, 2));
  const [player4, setPlayer4] = useState<Player>(new Player((isAnimating)=><Triangle isAnimating={isAnimating} />, 3));

  // {currentPlayer, boardMap<number, Goti[]>} = ludoGameLoop
  // after dice rolled, currentPlayer goti moves,
  // for(i in diceVal)
  //  delete boardMap[currentGoti.id],
  //  newPosition = currentGoti.position + i
  //  if newPosition > 52, newPosition = newPosition - 52
  //  if newPosition === currentGoti.lastCell, move to home path
  //  boardMap[newPosition] = currentGoti

  useEffect(() => {
    LudoGrid.createGrids();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ludo Game</Text>
      <Text style={styles.subtitle}>Play against my Algorithm</Text>

      <View style={styles.gameBoard}>
        <View style={styles.topRow}>
          <PlayerHome size={W} player={player1} />
          <LudoGrid.TopGrid />
          <PlayerHome size={W} player={player2} />
        </View>
        <View style={styles.topRow}>
          <LudoGrid.Grid3 />
          <Dice size={(cW - 3) * 3} />
          <LudoGrid.Grid4 />
        </View>
        <View style={styles.bottomRow}>
          <PlayerHome size={W} player={player3} />
          <LudoGrid.GridBottom />
          <PlayerHome size={W} player={player4} />
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
