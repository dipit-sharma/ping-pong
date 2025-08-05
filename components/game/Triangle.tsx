import React from "react";
import { StyleSheet, View } from "react-native";

interface TriangleProps {
  size?: number;
  color?: string;
}

export const Triangle: React.FC<TriangleProps> = ({ size = 20, color = '#FFFFFF' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View 
        style={[
          styles.triangle, 
          { 
            borderLeftWidth: size / 2,
            borderRightWidth: size / 2,
            borderBottomWidth: size,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: color,
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
  },
}); 