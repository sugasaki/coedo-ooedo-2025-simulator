import { useEffect, useRef, useCallback } from 'react';
import { useAnimationStore } from '../store/animation/animationStore';

interface UseAnimationFrameOptions {
  min?: number;
  autoStart?: boolean;
  autoStartDelay?: number;
}

export const useAnimationFrame = (options: UseAnimationFrameOptions = {}) => {
  const { min = 0, autoStart = false, autoStartDelay = 0 } = options;
  const animationRef = useRef<number | undefined>(undefined);

  const { isPlaying, setAnimationFrame, setPlaying } = useAnimationStore();

  const updateAnimationFrame = useCallback(() => {
    const { isPlaying: currentIsPlaying, animationFrameValue, animationSpeed, animationFrameMax } = useAnimationStore.getState();

    let nextValue = animationFrameValue + animationSpeed;
    if (nextValue > animationFrameMax) nextValue = min;

    setAnimationFrame(nextValue);

    if (currentIsPlaying) {
      animationRef.current = requestAnimationFrame(updateAnimationFrame);
    }
  }, [min, setAnimationFrame]);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateAnimationFrame);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [isPlaying, updateAnimationFrame]);

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => setPlaying(true), autoStartDelay);
      return () => clearTimeout(timer);
    }
  }, [autoStart, autoStartDelay, setPlaying]);

  return {
    startAnimation: () => setPlaying(true),
    stopAnimation: () => setPlaying(false),
    resetAnimation: () => setAnimationFrame(min),
    isPlaying,
  };
};
