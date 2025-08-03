import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GameOverModalProps {
  onPlayAgain: () => void;
  onGoToHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  onPlayAgain,
  onGoToHome,
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>GAME OVER</Text>
        <Text style={styles.description}>
          The game has ended. Would you like to play again or return to the home screen?
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
            <Text style={styles.buttonTitle}>Play Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={onGoToHome}>
            <Text style={styles.buttonTitle}>Go To Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#808080',
    borderRadius: 12,
    padding: 30,
    width: 300,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    color: '#808080',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#808080',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 