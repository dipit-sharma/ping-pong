import { cW, W } from "@/constants/Colors";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LudoGrid from "../LudoGrid";
import { PlayerHome } from "../PlayerHome";

export const LudoGame = () => {
  useEffect(() => {
    LudoGrid.createGrids();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ludo Game</Text>
      <Text style={styles.subtitle}>Play against my Algorithm</Text>

      <View style={styles.gameBoard}>
        <View style={styles.topRow}>
          <PlayerHome size={W} />
          <LudoGrid.Grid1 />
          <PlayerHome size={W} />
        </View>
        <View style={styles.topRow}>
          <LudoGrid.Grid3 />
          <View
            style={{
              width: (cW - 3) * 3,
              height: (cW - 3) * 3,
              backgroundColor: "#808080",
              borderRadius: 8,
            }}
          />
          <LudoGrid.Grid4 />
        </View>
        <View style={styles.bottomRow}>
          <PlayerHome size={W} />
          <LudoGrid.Grid2 />
          <PlayerHome size={W} />
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
