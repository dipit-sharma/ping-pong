import { PingPongGame } from '@/components/game/PingPongGame';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <PingPongGame serverUrl="http://localhost:3001" />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
