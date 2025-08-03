import React from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

interface DraggablePaddleProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  stageWidth: number;
  onPositionChange: (x: number) => void;
}

export const DraggablePaddle: React.FC<DraggablePaddleProps> = ({
  x,
  y,
  width = 100,
  height = 20,
  stageWidth,
  onPositionChange
}) => {
  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);
  const context = useSharedValue<{ startX: number }>({ startX: 0 });

  // Update position when props change (for server updates)
  React.useEffect(() => {
    translateX.value = withSpring(x, { damping: 15, stiffness: 150 });
    translateY.value = withSpring(y, { damping: 15, stiffness: 150 });
  }, [x, y]);

  const gestureHandler = Gesture.Pan().onBegin((event) => {
    context.value.startX = translateX.value;
  }).onUpdate(event => {
    const newX = context.value.startX + event.translationX;
    const clampedX = Math.max(0, Math.min(stageWidth - width, newX));
    translateX.value = clampedX;
    runOnJS(onPositionChange)(translateX.value);
  }).onEnd(() => {
    const finalX = translateX.value;
    runOnJS(onPositionChange)(finalX);
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={gestureHandler}>
      <Animated.View
        style={[
          styles.paddle,
          { width, height },
          animatedStyle
        ]}
      />
    </GestureDetector>
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