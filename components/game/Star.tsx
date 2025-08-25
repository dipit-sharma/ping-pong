import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface StarProps {
  size?: number;
  color?: string;
  isAnimating?: boolean;
}

export const Star: React.FC<StarProps> = ({
  size = 20,
  color = "#FFFFFF",
  isAnimating = false,
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
            // backgroundColor: color,
            borderRadius: size * 0.3, // 30% of size for rounded corners
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 576 512">
          <path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z" />
        </svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    // For now, using a rounded square as a placeholder for star
    // In a real implementation, you might want to use SVG or a more complex shape
    justifyContent: "center",
    alignItems: "center",
  },
});
