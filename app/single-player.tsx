import { PingPongGame } from '@/components/game/PingPongGame';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function SinglePlayerScreen() {
  return (
    <View style={styles.container}>
      <PingPongGame/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 