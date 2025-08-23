import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useLudoGame } from "./LudoGame";

interface DiceProps {
  size?: number;
  onRollComplete?: (value: number) => void;
  isAnimating?: boolean;
  rollDice: (params: {
    scaleAnim: Animated.Value;
    setDiceValue: (value: number) => void;
    setIsRolling: (isRolling: boolean) => void;
    onRollComplete?: (value: number) => void;
    pulseAnimation: Animated.CompositeAnimation;
  }) => void;
}

export const Dice: React.FC<DiceProps> = ({
  size = 60,
  onRollComplete,
  isAnimating = true,
  rollDice: rollDiceFunction,
}) => {
  const { setDiceValue, diceValue } = useLudoGame();
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
    rollDiceFunction({
      scaleAnim,
      setDiceValue,
      setIsRolling,
      onRollComplete,
      pulseAnimation,
    });
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
          {diceValue}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dice: {
    backgroundColor: "#808080",
    borderWidth: 2,
    borderColor: "#808080",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  diceText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Dice;
