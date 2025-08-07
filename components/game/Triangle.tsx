import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface TriangleProps {
  size?: number;
  color?: string;
  isAnimating?: boolean;
}

export const Triangle: React.FC<TriangleProps> = ({ 
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
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View 
        style={[
          styles.triangle, 
          { 
            borderLeftWidth: size / 2,
            borderRightWidth: size / 2,
            borderBottomWidth: size,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: color,
            transform: [{ scale: scaleAnim }]
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