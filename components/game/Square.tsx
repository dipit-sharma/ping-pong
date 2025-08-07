import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

interface SquareProps {
  size?: number;
  color?: string;
  isAnimating?: boolean;
}

export const Square: React.FC<SquareProps> = ({ 
  size = 20, 
  color = '#FFFFFF',
  isAnimating = false 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation
  const pulseAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 800,
        useNativeDriver: true,
      }),
    ])
  );

  useEffect(() => {
    if (isAnimating) {
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    } else {
      // Reset to normal size when animation is disabled
      scaleAnim.setValue(1);
    }
  }, [isAnimating, pulseAnimation, scaleAnim]);

  return (
    <Animated.View 
      style={[
        styles.square, 
        { 
          width: size, 
          height: size, 
          backgroundColor: color,
          borderRadius: size * 0.2, // 20% of size for rounded corners
          transform: [{ scale: scaleAnim }]
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