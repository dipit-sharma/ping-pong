import { Goti as GotiInterface } from '@/interface/utils';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

interface GotiProps {
  goti: GotiInterface;
  isSelectable?: boolean;
  isAnimating?: boolean;
  onSelect?: (goti: GotiInterface) => void;
  color?: string;
  size?: number;
}

export const Goti: React.FC<GotiProps> = ({
  goti,
  isSelectable = false,
  isAnimating = false,
  onSelect,
  color = '#FFFFFF',
  size = 20,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for selection phase
  useEffect(() => {
    if (isAnimating && isSelectable) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      
      pulseAnimation.start();
      
      return () => {
        pulseAnimation.stop();
        pulseAnim.setValue(1);
      };
    } else {
      pulseAnim.setValue(1);
    }
  }, [isAnimating, isSelectable, pulseAnim]);

  // Scale animation for selection feedback
  const handlePress = () => {
    if (!isSelectable || !onSelect) return;

    // Scale down animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onSelect(goti);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!isSelectable}
      activeOpacity={isSelectable ? 0.7 : 1}
    >
      <Animated.View
        style={[
          {
            transform: [
              { scale: Animated.multiply(scaleAnim, pulseAnim) },
            ],
          },
        ]}
      >
        {goti.shape(false)}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goti: {
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Goti;
