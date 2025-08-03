const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Game state
const gameState = {
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

// Game loop
let gameInterval;

function startGameLoop() {
  if (gameInterval) return;
  
  gameInterval = setInterval(() => {
    updateBall();
    io.emit('gameState', gameState);
  }, 16); // ~60 FPS
}

function updateBall() {
  // Update ball position
  gameState.ball.x += gameState.ball.velocityX;
  gameState.ball.y += gameState.ball.velocityY;
  
  // Ball collision with walls
  if (gameState.ball.x <= gameState.ball.radius || gameState.ball.x >= gameState.stage.width - gameState.ball.radius) {
    gameState.ball.velocityX *= -1;
  }
  
  // Ball collision with paddles
  const topPaddle = gameState.paddles.top;
  const bottomPaddle = gameState.paddles.bottom;
  
  // Top paddle collision
  if (gameState.ball.y <= topPaddle.y + topPaddle.height + gameState.ball.radius &&
      gameState.ball.y >= topPaddle.y - gameState.ball.radius &&
      gameState.ball.x >= topPaddle.x &&
      gameState.ball.x <= topPaddle.x + topPaddle.width) {
    gameState.ball.velocityY *= -1;
    // Add some randomness to make it more interesting
    gameState.ball.velocityX += (Math.random() - 0.5) * 2;
  }
  
  // Bottom paddle collision
  if (gameState.ball.y >= bottomPaddle.y - gameState.ball.radius &&
      gameState.ball.y <= bottomPaddle.y + bottomPaddle.height + gameState.ball.radius &&
      gameState.ball.x >= bottomPaddle.x &&
      gameState.ball.x <= bottomPaddle.x + bottomPaddle.width) {
    gameState.ball.velocityY *= -1;
    // Add some randomness to make it more interesting
    gameState.ball.velocityX += (Math.random() - 0.5) * 2;
  }
  
  // Ball out of bounds - reset
  if (gameState.ball.y < 0 || gameState.ball.y > gameState.stage.height) {
    resetBall();
  }
  
  // Keep ball within stage bounds
  gameState.ball.x = Math.max(gameState.ball.radius, Math.min(gameState.stage.width - gameState.ball.radius, gameState.ball.x));
  gameState.ball.y = Math.max(gameState.ball.radius, Math.min(gameState.stage.height - gameState.ball.radius, gameState.ball.y));
}

function resetBall() {
  gameState.ball.x = gameState.stage.width / 2;
  gameState.ball.y = gameState.stage.height / 2;
  gameState.ball.velocityX = (Math.random() > 0.5 ? 1 : -1) * 1;
  gameState.ball.velocityY = (Math.random() > 0.5 ? 1 : -1) * 1;
}

function resetGame() {
  resetBall();
  gameState.paddles.top.x = (gameState.stage.width - gameState.paddles.top.width) / 2;
  gameState.paddles.bottom.x = (gameState.stage.width - gameState.paddles.bottom.width) / 2;
}

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  
  // Assign player to available position
  if (!gameState.players.top) {
    gameState.players.top = socket.id;
    socket.emit('playerAssigned', { position: 'top' });
    console.log('Player assigned to top position');
  } else if (!gameState.players.bottom) {
    gameState.players.bottom = socket.id;
    socket.emit('playerAssigned', { position: 'bottom' });
    console.log('Player assigned to bottom position');
  } else {
    socket.emit('gameFull');
    return;
  }
  
  // Start game if both players are connected
  if (gameState.players.top && gameState.players.bottom) {
    resetGame();
    startGameLoop();
    io.emit('gameStart');
  }
  
  // Send current game state to new player
  socket.emit('gameState', gameState);
  
  // Handle paddle movement
  socket.on('movePaddle', (data) => {
    const { position, x } = data;
    
    if (position === 'top' && gameState.players.top === socket.id) {
      gameState.paddles.top.x = Math.max(0, Math.min(gameState.stage.width - gameState.paddles.top.width, x));
    } else if (position === 'bottom' && gameState.players.bottom === socket.id) {
      gameState.paddles.bottom.x = Math.max(0, Math.min(gameState.stage.width - gameState.paddles.bottom.width, x));
    }
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    
    if (gameState.players.top === socket.id) {
      gameState.players.top = null;
    } else if (gameState.players.bottom === socket.id) {
      gameState.players.bottom = null;
    }
    
    // Stop game if not enough players
    if (!gameState.players.top || !gameState.players.bottom) {
      if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
      }
      io.emit('gameStopped');
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 