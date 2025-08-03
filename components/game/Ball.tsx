import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

interface BallProps {
  x: number;
  y: number;
  radius?: number;
}

export const Ball: React.FC<BallProps> = ({ 
  x, 
  y, 
  radius = 10 
}) => {
  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);

  // Update position when props change
  React.useEffect(() => {
    translateX.value = withSpring(x, { damping: 20, stiffness: 200 });
    translateY.value = withSpring(y, { damping: 20, stiffness: 200 });
  }, [x, y]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <Animated.View 
      style={[
        styles.ball, 
        { width: radius * 2, height: radius * 2, borderRadius: radius },
        animatedStyle
      ]}
    />
  );
};

const styles = StyleSheet.create({
  ball: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
}); 