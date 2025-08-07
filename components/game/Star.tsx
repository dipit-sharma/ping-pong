import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface StarProps {
  size?: number;
  color?: string;
  isAnimating?: boolean;
}

export const Star: React.FC<StarProps> = ({ 
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
          styles.star, 
          { 
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: size * 0.3, // 30% of size for rounded corners
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
  star: {
    // For now, using a rounded square as a placeholder for star
    // In a real implementation, you might want to use SVG or a more complex shape
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 