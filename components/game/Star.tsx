import React from "react";
import { StyleSheet, View } from "react-native";

interface StarProps {
  size?: number;
  color?: string;
}

export const Star: React.FC<StarProps> = ({ size = 20, color = '#FFFFFF' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View 
        style={[
          styles.star, 
          { 
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: size * 0.3 // 30% of size for rounded corners
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
  star: {
    // For now, using a rounded square as a placeholder for star
    // In a real implementation, you might want to use SVG or a more complex shape
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 