import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

interface CircleProps {
  size?: number;
  color?: string;
  isAnimating?: boolean;
}

export const Circle: React.FC<CircleProps> = ({ 
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
        styles.circle, 
        { 
          width: size, 
          height: size, 
          backgroundColor: color,
          borderRadius: size / 2,
          transform: [{ scale: scaleAnim }]
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