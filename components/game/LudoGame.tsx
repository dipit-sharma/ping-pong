import { Player } from "@/class/Player";
import { cW, W } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LudoGrid from "../LudoGrid";
import { PlayerHome } from "../PlayerHome";
import { Circle } from "./Circle";
import Dice from "./Dice";
import { Square } from "./Square";
import { Star } from "./Star";
import { Triangle } from "./Triangle";

export const LudoGame = () => {
  const [player1, setPlayer1] = useState<Player>(new Player(<Square />, 0));
  const [player2, setPlayer2] = useState<Player>(new Player(<Star />, 1));
  const [player3, setPlayer3] = useState<Player>(new Player(<Circle />, 2));
  const [player4, setPlayer4] = useState<Player>(new Player(<Triangle />, 3));

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
          {/* <View
            style={{
              width: (cW - 3) * 3,
              height: (cW - 3) * 3,
              backgroundColor: "#808080",
              borderRadius: 8,
            }}
          /> */}
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
