import { Player } from "@/class/Player";
import React from "react";
import { StyleSheet, View } from "react-native";

interface PlayerHomeProps {
  size?: number;
  player: Player;
}

export const PlayerHome: React.FC<PlayerHomeProps> = ({
  size = 120,
  player,
}) => {
  const containerSize = size;
  const smallSquareSize = size * 0.3; // 30% of container size

  return (
    <View
      style={[
        styles.container,
        { width: containerSize, height: containerSize },
      ]}
    >
      <View style={styles.innerContainer}>
        <View style={styles.topRow}>
          <View
            style={[
              styles.smallSquare,
              { width: smallSquareSize, height: smallSquareSize },
            ]}
          >
            {player.isHome(0) ? player.getGotiArray()[0].shape : <View />}
          </View>
          <View
            style={[
              styles.smallSquare,
              { width: smallSquareSize, height: smallSquareSize },
            ]}
          >
            {player.isHome(1) ? player.getGotiArray()[1].shape : <View />}
          </View>
        </View>
        <View style={styles.bottomRow}>
          <View
            style={[
              styles.smallSquare,
              { width: smallSquareSize, height: smallSquareSize },
            ]}
          >
            {player.isHome(2) ? player.getGotiArray()[2].shape : <View />}
          </View>
          <View
            style={[
              styles.smallSquare,
              { width: smallSquareSize, height: smallSquareSize },
            ]}
          >
            {player.isHome(3) ? player.getGotiArray()[3].shape : <View />}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2a2a2a", // Grey background
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: "row",
  },
  smallSquare: {
    backgroundColor: "#1a1a1a",
    borderRadius: 4,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
