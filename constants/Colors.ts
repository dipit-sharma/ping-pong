/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const defaultGameState = {
  ball: {
    x: 200,
    y: 300,
    velocityX: 3,
    velocityY: 3,
    radius: 10
  },
  paddles: {
    top: { x: 150, y: 50, width: 100, height: 20 },
    bottom: { x: 150, y: 550, width: 100, height: 20 }
  },
  players: {
    top: null,
    bottom: null
  },
  stage: {
    width: 400,
    height: 600
  }
};