import React from "react";
import { StyleSheet, View } from "react-native";

interface PlayerHomeProps {
  size?: number;
}

export const PlayerHome: React.FC<PlayerHomeProps> = ({ size = 120 }) => {
  const containerSize = size;
  const smallSquareSize = size * 0.3; // 30% of container size

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      <View style={styles.innerContainer}>
        <View style={styles.topRow}>
          <View style={[styles.smallSquare, { width: smallSquareSize, height: smallSquareSize }]} />
          <View style={[styles.smallSquare, { width: smallSquareSize, height: smallSquareSize }]} />
        </View>
        <View style={styles.bottomRow}>
          <View style={[styles.smallSquare, { width: smallSquareSize, height: smallSquareSize }]} />
          <View style={[styles.smallSquare, { width: smallSquareSize, height: smallSquareSize }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a', // Grey background
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
  },
  smallSquare: {
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    margin: 4,
    // borderWidth: 1,
    // //borderColor: '#CCCCCC',
  },
});