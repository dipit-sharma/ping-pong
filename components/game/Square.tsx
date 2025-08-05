import React from "react";
import { StyleSheet, View } from "react-native";

interface SquareProps {
  size?: number;
  color?: string;
}

export const Square: React.FC<SquareProps> = ({ size = 20, color = '#FFFFFF' }) => {
  return (
    <View 
      style={[
        styles.square, 
        { 
          width: size, 
          height: size, 
          backgroundColor: color,
          borderRadius: size * 0.2 // 20% of size for rounded corners
        }
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  square: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 