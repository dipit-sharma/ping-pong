import { LudoGame } from '@/components/game/LudoGame';
import LudoGrid from '@/components/LudoGrid';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function LudoScreen() {
  useEffect(() => {
    // Initialize grids when component mounts
    LudoGrid.createGrids();
  }, []);

  return (
    <View style={styles.container}>
      <LudoGame />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 