import { Player } from "@/class/Player";
import { Goti as GotiType } from "@/interface/utils";
import React from "react";
import { StyleSheet, View } from "react-native";
import Goti from "./Goti";

interface PlayerHomeProps {
  size?: number;
  player: Player;
  isGotiSelectionActive: boolean;
  handleGotiSelect: (goti: GotiType) => void;
}

export const PlayerHome: React.FC<PlayerHomeProps> = ({
  size = 120,
  player,
  isGotiSelectionActive,
  handleGotiSelect,
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
            {player.isHome(0) ? (
              <Goti
                goti={player.getGotiArray()[0]}
                isSelectable={true}
                isAnimating={isGotiSelectionActive}
                onSelect={handleGotiSelect}
                size={16}
              />
            ) : (
              <View />
            )}
          </View>
          <View
            style={[
              styles.smallSquare,
              { width: smallSquareSize, height: smallSquareSize },
            ]}
          >
            {player.isHome(1) ? (
              <Goti
                goti={player.getGotiArray()[0]}
                isSelectable={true}
                isAnimating={isGotiSelectionActive}
                onSelect={handleGotiSelect}
                size={16}
              />
            ) : (
              <View />
            )}
          </View>
        </View>
        <View style={styles.bottomRow}>
          <View
            style={[
              styles.smallSquare,
              { width: smallSquareSize, height: smallSquareSize },
            ]}
          >
            {player.isHome(2) ? (
              <Goti
                goti={player.getGotiArray()[0]}
                isSelectable={true}
                isAnimating={isGotiSelectionActive}
                onSelect={handleGotiSelect}
                size={16}
              />
            ) : (
              <View />
            )}
          </View>
          <View
            style={[
              styles.smallSquare,
              { width: smallSquareSize, height: smallSquareSize },
            ]}
          >
            {player.isHome(3) ? (
              <Goti
                goti={player.getGotiArray()[0]}
                isSelectable={true}
                isAnimating={isGotiSelectionActive}
                onSelect={handleGotiSelect}
                size={16}
              />
            ) : (
              <View />
            )}
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
