import { PingPongGame } from '@/components/game/PingPongGame';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MultiplayerScreen() {
  return (
    <View style={styles.container}>
      <PingPongGame serverUrl="http://localhost:3001" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 