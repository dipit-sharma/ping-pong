import { GameState } from "@/components/game/PingPongGame";
import { defaultGameState } from "@/constants/Colors";
import { useEffect, useRef, useState } from "react";

export const useGameEngine = (url: string | null, onGameOver: Function) => {
    if (url) return { gameState: null };

    const id = useRef<NodeJS.Timeout | null>(null);
    const bottomPaddleX = useRef<number | undefined>(null);
    const [gameState, setGameState] = useState<GameState>(defaultGameState);

    const updateBottomPaddle = (x: number) => {
        bottomPaddleX.current = x;
    }

    useEffect(() => {
        if (id.current) return;
        id.current = setInterval(() => {
            setGameState(currentState => {
                let newState: GameState = {
                    ...currentState,
                    paddles: {
                        ...currentState.paddles,
                        bottom: {
                            ...currentState.paddles.bottom,
                            x: bottomPaddleX.current ?? defaultGameState.paddles.bottom.x,
                        }
                    }
                }
                newState = { ...updateBall(newState, onGameOver) };
                return newState;
            });
        }, 16);

        return () => {
            if (id.current) clearInterval(id.current);
        };
    }, [bottomPaddleX]);

    return { gameState, updateBottomPaddle };
}

function updateBall(gameState: GameState, onGameOver: Function) {
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
    if (gameState.ball.y < 0 || gameState.ball.y > gameState.stage.height - gameState.ball.radius) {
        onGameOver();
        gameState = resetBall(gameState);
    }

    // Keep ball within stage bounds
    gameState.ball.x = Math.max(gameState.ball.radius, Math.min(gameState.stage.width - gameState.ball.radius, gameState.ball.x));
    gameState.ball.y = Math.max(gameState.ball.radius, Math.min(gameState.stage.height - gameState.ball.radius, gameState.ball.y));

    gameState.paddles.top.x = gameState.ball.x-gameState.ball.radius;




    return gameState;
}

function resetBall(gameState: GameState) {
    gameState.ball.x = gameState.stage.width / 2;
    gameState.ball.y = gameState.stage.height / 2;
    gameState.ball.velocityX = (Math.random() > 0.5 ? 1 : -1) * 1;
    gameState.ball.velocityY = (Math.random() > 0.5 ? 1 : -1) * 1;
    return gameState
}