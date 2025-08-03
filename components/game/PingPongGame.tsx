import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { io, Socket } from 'socket.io-client';
import { Ball } from './Ball';
import { DraggablePaddle } from './DraggablePaddle';
import { Paddle } from './Paddle';
import { Stage } from './Stage';

interface GameState {
  ball: {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    radius: number;
  };
  paddles: {
    top: { x: number; y: number; width: number; height: number };
    bottom: { x: number; y: number; width: number; height: number };
  };
  players: {
    top: string | null;
    bottom: string | null;
  };
  stage: {
    width: number;
    height: number;
  };
}

interface PingPongGameProps {
  serverUrl?: string;
}

export const PingPongGame: React.FC<PingPongGameProps> = ({ 
  serverUrl = 'http://localhost:3001' 
}) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerPosition, setPlayerPosition] = useState<'top' | 'bottom' | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [gameStatus, setGameStatus] = useState<'waiting' | 'playing' | 'stopped'>('waiting');
  
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to server
    const socket = io(serverUrl);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
      setGameStatus('stopped');
    });

    socket.on('playerAssigned', (data: { position: 'top' | 'bottom' }) => {
      console.log('Player assigned to:', data.position);
      setPlayerPosition(data.position);
    });

    socket.on('gameFull', () => {
      Alert.alert('Game Full', 'The game is currently full. Please try again later.');
    });

    socket.on('gameStart', () => {
      console.log('Game started!');
      setGameStatus('playing');
    });

    socket.on('gameStopped', () => {
      console.log('Game stopped');
      setGameStatus('stopped');
    });

    socket.on('gameState', (newGameState: GameState) => {
      setGameState(newGameState);
    });

    return () => {
      socket.disconnect();
    };
  }, [serverUrl]);

  const handlePaddleMove = (x: number) => {
    if (socketRef.current && playerPosition) {
      socketRef.current.emit('movePaddle', {
        position: playerPosition,
        x: x
      });
    }
  };

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Connecting to server...</Text>
      </View>
    );
  }

  if (!gameState) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Waiting for game state...</Text>
      </View>
    );
  }

  if (gameStatus === 'waiting') {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>
          Waiting for another player to join...
        </Text>
        <Text style={styles.positionText}>
          Your position: {playerPosition || 'Unknown'}
        </Text>
      </View>
    );
  }

  if (gameStatus === 'stopped') {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Game stopped</Text>
        <Text style={styles.statusText}>Other player disconnected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.gameInfo}>
        <Text style={styles.infoText}>
          Position: {playerPosition === 'top' ? 'Top Paddle' : 'Bottom Paddle'}
        </Text>
        <Text style={styles.infoText}>
          Status: {gameStatus}
        </Text>
      </View>
      
      <Stage width={gameState.stage.width} height={gameState.stage.height}>
        {/* Ball */}
        <Ball 
          x={gameState.ball.x} 
          y={gameState.ball.y} 
          radius={gameState.ball.radius} 
        />
        
        {/* Top Paddle */}
        {playerPosition === 'top' ? (
          <DraggablePaddle
            x={gameState.paddles.top.x}
            y={gameState.paddles.top.y}
            width={gameState.paddles.top.width}
            height={gameState.paddles.top.height}
            stageWidth={gameState.stage.width}
            onPositionChange={handlePaddleMove}
          />
        ) : (
          <Paddle
            x={gameState.paddles.top.x}
            y={gameState.paddles.top.y}
            width={gameState.paddles.top.width}
            height={gameState.paddles.top.height}
          />
        )}
        
        {/* Bottom Paddle */}
        {playerPosition === 'bottom' ? (
          <DraggablePaddle
            x={gameState.paddles.bottom.x}
            y={gameState.paddles.bottom.y}
            width={gameState.paddles.bottom.width}
            height={gameState.paddles.bottom.height}
            stageWidth={gameState.stage.width}
            onPositionChange={handlePaddleMove}
          />
        ) : (
          <Paddle
            x={gameState.paddles.bottom.x}
            y={gameState.paddles.bottom.y}
            width={gameState.paddles.bottom.width}
            height={gameState.paddles.bottom.height}
          />
        )}
      </Stage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  gameInfo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  positionText: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 5,
  },
}); 