import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

interface PaddleProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  isDraggable?: boolean;
  onPositionChange?: (x: number) => void;
}

export const Paddle: React.FC<PaddleProps> = ({ 
  x, 
  y, 
  width = 100, 
  height = 20,
  isDraggable = false,
  onPositionChange
}) => {
  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);

  // Update position when props change
  React.useEffect(() => {
    translateX.value = withSpring(x, { damping: 15, stiffness: 150 });
    translateY.value = withSpring(y, { damping: 15, stiffness: 150 });
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
        styles.paddle, 
        { width, height },
        animatedStyle
      ]}
    />
  );
};

const styles = StyleSheet.create({
  paddle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    position: 'absolute',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
}); 