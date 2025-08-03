# Sound Files for Ping Pong Game

This directory is for custom sound files that will be played during the game.

## Supported Sound Events

The game currently supports sound effects for:
- **Wall collisions**: When the ball hits the left or right walls
- **Paddle collisions**: When the ball hits either paddle

## Adding Custom Sound Files

To add your own sound files:

1. **File Format**: Use `.mp3` files for best compatibility
2. **File Names**: 
   - `collision.mp3` - for paddle collisions
   - `wall.mp3` - for wall collisions
   - `paddle.mp3` - for paddle hits

3. **File Size**: Keep files small (under 100KB) for fast loading
4. **Duration**: Keep sounds short (0.1-0.5 seconds) for responsive gameplay

## Implementation

To use custom sound files, uncomment the relevant lines in `hooks/useSound.ts`:

```typescript
const { sound: collisionSound } = await Audio.Sound.createAsync(
  require('../assets/sounds/collision.mp3')
);
collisionSoundRef.current = collisionSound;
```

## Free Sound Resources

You can find free sound effects at:
- [Freesound.org](https://freesound.org/)
- [Zapsplat](https://www.zapsplat.com/)
- [OpenGameArt](https://opengameart.org/)

## Current Implementation

The game currently uses a simple beep sound generated programmatically. This ensures the game works immediately without requiring external sound files. 