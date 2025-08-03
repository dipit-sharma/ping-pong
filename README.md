# Ping Pong - Multiplayer Game

A real-time multiplayer ping pong game built with React Native, React Reanimated, and Socket.IO.

## Features

- 🏓 Real-time multiplayer gameplay
- 🎮 Draggable paddle controls
- ⚡ Smooth animations with React Reanimated
- 🌐 WebSocket communication
- 📱 Cross-platform (iOS, Android, Web)

## Game Components

1. **Stage** - A rectangular game area with black background and grey border
2. **Paddle** - White rectangular paddles for hitting the ball
3. **Ball** - White circular ball that bounces off paddles and walls
4. **DraggablePaddle** - User-controlled paddle with touch gestures

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ping-pong
   ```

2. Install client dependencies:
   ```bash
   npm install
   ```

3. Install server dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

### Running the Application

1. Start the Socket.IO server:
   ```bash
   cd server
   npm start
   ```

2. In a new terminal, start the React Native app:
   ```bash
   npm start
   ```

3. Open the app on your device or simulator:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## How to Play

1. Open the app on two different devices/browsers
2. Each player will be automatically assigned to either the top or bottom paddle
3. Drag your paddle horizontally to move it
4. Try to hit the ball and prevent it from passing your side
5. The ball will bounce off paddles and walls
6. If the ball goes past your paddle, it will reset to the center

## Game Mechanics

- **Ball Physics**: The ball bounces off paddles and walls with realistic physics
- **Paddle Movement**: Smooth, responsive paddle controls with gesture recognition
- **Multiplayer Sync**: Real-time synchronization of game state between players
- **Collision Detection**: Accurate collision detection between ball and paddles

## Technical Stack

- **Frontend**: React Native, Expo, React Reanimated
- **Backend**: Node.js, Express, Socket.IO
- **Animations**: React Reanimated for smooth 60fps animations
- **Gestures**: React Native Gesture Handler for touch controls

## Project Structure

```
ping-pong/
├── app/                    # Expo Router app directory
├── components/
│   └── game/              # Game components
│       ├── Stage.tsx      # Game stage component
│       ├── Paddle.tsx     # Static paddle component
│       ├── DraggablePaddle.tsx # User-controlled paddle
│       ├── Ball.tsx       # Ball component
│       └── PingPongGame.tsx # Main game component
├── server/                # Socket.IO server
│   ├── server.js         # Main server file
│   ├── package.json      # Server dependencies
│   └── README.md         # Server documentation
└── package.json          # Client dependencies
```

## Development

### Adding New Features

- Game components are in `components/game/`
- Server logic is in `server/server.js`
- Main game screen is in `app/(tabs)/index.tsx`

### Customization

- Modify game dimensions in `server/server.js` (stage width/height)
- Adjust ball speed and physics in the `updateBall()` function
- Change visual styling in component StyleSheet objects

## Troubleshooting

- **Connection Issues**: Make sure the server is running on port 3001
- **Gesture Problems**: Ensure React Native Gesture Handler is properly configured
- **Animation Lag**: Check that React Reanimated is working correctly

## License

This project is open source and available under the MIT License.
