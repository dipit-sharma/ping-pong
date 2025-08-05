import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HomePageProps {
  onSinglePlayer: () => void;
  onMultiplayer: () => void;
  onLudo: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSinglePlayer, onMultiplayer, onLudo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSinglePlayer}>
          <Text style={styles.buttonTitle}>Single Player</Text>
          <Text style={styles.buttonDescription}>
            Play against computer. The computer simply follows the x movement of the ball, you literally will play against a wall
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={onMultiplayer}>
          <Text style={styles.buttonTitle}>Multiplayer</Text>
          <Text style={styles.buttonDescription}>
            Play against another human online. Open this app in a second tab, play from both the tabs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onLudo}>
          <Text style={styles.buttonTitle}>Play Ludo</Text>
          <Text style={styles.buttonDescription}>
            Play ludo against my algorithm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  const handleSinglePlayer = () => {
    router.push('/single-player');
  };

  const handleMultiplayer = () => {
    router.push('/multiplayer');
  };

  const handleLudo = () => {
    router.push('/ludo');
  };

  return (
    <HomePage 
      onSinglePlayer={handleSinglePlayer}
      onMultiplayer={handleMultiplayer}
      onLudo={handleLudo}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 20,
  },
  button: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#808080',
    borderRadius: 12,
    padding: 20,
    alignItems: 'flex-start',
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  buttonDescription: {
    color: '#808080',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
});
