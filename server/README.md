# Ping Pong Game Server

This is the Socket.IO server for the multiplayer ping pong game.

## Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

The server will start on port 3001 by default. You can change this by setting the `PORT` environment variable.

## Features

- Real-time multiplayer game state synchronization
- Automatic player assignment (top/bottom positions)
- Ball physics and collision detection
- Paddle movement synchronization
- Game state management

## API Events

### Client to Server
- `movePaddle`: Send paddle position updates
  ```javascript
  {
    position: 'top' | 'bottom',
    x: number
  }
  ```

### Server to Client
- `playerAssigned`: Player position assignment
- `gameState`: Current game state update
- `gameStart`: Game has started
- `gameStopped`: Game has stopped
- `gameFull`: Game is full (no more players allowed)

## Game State Structure

```javascript
{
  ball: {
    x: number,
    y: number,
    velocityX: number,
    velocityY: number,
    radius: number
  },
  paddles: {
    top: { x: number, y: number, width: number, height: number },
    bottom: { x: number, y: number, width: number, height: number }
  },
  players: {
    top: string | null,
    bottom: string | null
  },
  stage: {
    width: number,
    height: number
  }
}
``` 