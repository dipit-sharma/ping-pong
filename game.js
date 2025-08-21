class NumberGame {
  constructor() {
    this.userScore = 0;
    this.computerNumber = 0;
    this.gameOver = false;
    this.maxScore = 3;
  }

  // Generate computer's number (1-5)
  generateComputerNumber() {
    this.computerNumber = Math.floor(Math.random() * 100) + 1;
    return this.computerNumber;
  }

  // Play one round
  playRound(userNumber) {
    if (this.gameOver) {
      return { gameOver: true, message: "Game is already over!" };
    }

    // Validate user input
    if (userNumber < 1 || userNumber > 100) {
      return { valid: false, message: "Please enter a number between 1 and 100!" };
    }

    // Check if numbers match
    if (userNumber === this.computerNumber) {
      this.gameOver = true;
      return {
        gameOver: true,
        userScore: this.userScore,
        computerNumber: this.computerNumber,
        userNumber: userNumber,
        message: `You lost! You chose ${userNumber} and computer chose ${this.computerNumber}. Final score: ${this.userScore}`
      };
    } else {
      this.userScore++;
      return {
        valid: true,
        userScore: this.userScore,
        computerNumber: this.computerNumber,
        userNumber: userNumber,
        message: `You win this round! You chose ${userNumber} and computer chose ${this.computerNumber}. Score: ${this.userScore}/${this.maxScore}`
      };
    }
  }

  // Check if game is won
  isGameWon() {
    return this.userScore >= this.maxScore;
  }

  // Check if game is over
  isGameOver() {
    return this.gameOver || this.isGameWon();
  }

  // Get current game state
  getGameState() {
    return {
      userScore: this.userScore,
      computerNumber: this.computerNumber,
      gameOver: this.gameOver,
      maxScore: this.maxScore
    };
  }

  // Reset game
  resetGame() {
    this.userScore = 0;
    this.computerNumber = 0;
    this.gameOver = false;
  }
}

// Terminal game using readline
const readline = require('readline');

function startGame() {
  const game = new NumberGame();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log("🎮 Welcome to the Number Game!");
  console.log("📋 Rules:");
  console.log("- Computer generates a number from 1-100");
  console.log("- You choose a number from 1-100");
  console.log("- If numbers match: YOU LOSE!");
  console.log("- If numbers don't match: You gain 1 point");
  console.log("- Win 3 points to win the game!");
  console.log("");

  const playRound = () => {
    if (game.isGameOver()) {
      // Game over
      if (game.isGameWon()) {
        console.log("🎉 CONGRATULATIONS! You won the game!");
      } else {
        console.log("💀 GAME OVER! You lost!");
      }
      
      // Ask to play again
      rl.question("Play again? (y/n): ", (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          game.resetGame();
          console.log("\n🔄 Starting new game...\n");
          playRound();
        } else {
          console.log("👋 Thanks for playing!");
          rl.close();
        }
      });
      return;
    }

    // Generate computer's number
    game.generateComputerNumber();
    
    // Get user input
    rl.question("Enter a number (1-100): ", (input) => {
      const userNumber = parseInt(input);
      
      // Validate input
      if (isNaN(userNumber) || userNumber < 1 || userNumber > 100) {
        console.log("❌ Please enter a valid number between 1 and 100!");
        console.log("");
        playRound();
        return;
      }
      
      // Play the round
      const result = game.playRound(userNumber);
      
      console.log(`🎲 Computer chose: ${result.computerNumber}`);
      console.log(`👤 You chose: ${result.userNumber}`);
      console.log(`📢 ${result.message}`);
      console.log("");
      
      // Continue to next round
      if (!result.gameOver) {
        console.log("⏳ Next round starting...");
        console.log("");
      }
      
      // Small delay for better UX
      setTimeout(() => {
        playRound();
      }, 1000);
    });
  };

  // Start the game
  playRound();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NumberGame, startGame };
}

// Auto-start if running in browser
if (typeof window !== 'undefined') {
  // Uncomment the line below to auto-start the game
  // 
}
startGame();