import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';

export const useSound = () => {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    loadSound();
    return () => {
      unloadSound();
    };
  }, []);

  const loadSound = async () => {
    try {
      // For web, we can use a simple approach
      if (typeof window !== 'undefined' && window.AudioContext) {
        // Web Audio API approach
        return;
      }

      // For mobile, try a different approach
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' }
      );
      soundRef.current = sound;
      
      // Set volume to a reasonable level
      await sound.setVolumeAsync(0.3);
      
    } catch (error) {
      console.log('Error loading sound:', error);
    }
  };

  const unloadSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
    } catch (error) {
      console.log('Error unloading sound:', error);
    }
  };

  const playSound = async () => {
    try {
      console.log('playSound called');
      
      // For web, create a simple beep
      if (typeof window !== 'undefined' && window.AudioContext) {
        console.log('Using Web Audio API');
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        console.log('Web beep sound played');
        return;
      }

      // For mobile, use the loaded sound
      if (soundRef.current) {
        console.log('Using mobile sound');
        await soundRef.current.replayAsync();
        console.log('Mobile sound played');
      } else {
        console.log('No sound loaded');
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  return {
    playSound,
  };
}; 