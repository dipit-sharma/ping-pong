import React from 'react';
import { StyleSheet, View } from 'react-native';

interface StageProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

export const Stage: React.FC<StageProps> = ({ 
  children, 
  width = 400, 
  height = 600 
}) => {
  return (
    <View style={[styles.stage, { width, height }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#808080',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
}); 