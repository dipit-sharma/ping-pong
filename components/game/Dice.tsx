import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface DiceProps {
  size?: number;
  onRollComplete?: (value: number) => void;
  isAnimating?: boolean;
}

export const Dice: React.FC<DiceProps> = ({ 
  size = 60, 
  onRollComplete,
  isAnimating = true
}) => {
  const [currentValue, setCurrentValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Initial subtle shrinking and expanding animation
  const pulseAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 1000,
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
  }, [isAnimating, scaleAnim]);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    scaleAnim.stopAnimation();

    // Display 5 random numbers for 2 seconds (400ms each)
    const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
    let currentIndex = 0;

    const rollInterval = setInterval(() => {
      if (currentIndex < numbers.length) {
        setCurrentValue(numbers[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(rollInterval);
        
        // Final random number
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setCurrentValue(finalValue);
        setIsRolling(false);
        
        // Callback with final value
        onRollComplete?.(finalValue);

        pulseAnimation.start();
      }
    }, 400);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={rollDice}
      disabled={isRolling}
    >
      <Animated.View
        style={[
          styles.dice,
          {
            width: size,
            height: size,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <Text style={[styles.diceText, { fontSize: size * 0.4 }]}>
          {currentValue}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dice: {
    backgroundColor: '#808080',
    borderWidth: 2,
    borderColor: '#808080',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  diceText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Dice;
