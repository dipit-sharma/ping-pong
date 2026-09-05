import { PingPongGame } from "@/components/game/PingPongGame";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function MultiplayerScreen() {
  const serverUrl = process.env.EXPO_PUBLIC_API_URL ?? "/";

  return (
    <View style={styles.container}>
      <PingPongGame serverUrl={serverUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
