import React from "react";
import { StyleSheet, View } from "react-native";

interface CircleProps {
  size?: number;
  color?: string;
}

export const Circle: React.FC<CircleProps> = ({ size = 20, color = '#FFFFFF' }) => {
  return (
    <View 
      style={[
        styles.circle, 
        { 
          width: size, 
          height: size, 
          backgroundColor: color,
          borderRadius: size / 2 
        }
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 