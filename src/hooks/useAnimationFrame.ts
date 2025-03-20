import { useEffect, useRef } from 'react';
import { useStore } from '../store/store';

interface UseAnimationFrameOptions {
  min?: number;
  autoStart?: boolean;
  autoStartDelay?: number;
}

export const useAnimationFrame = (options: UseAnimationFrameOptions = {}) => {
  const { min = 0, autoStart = false, autoStartDelay = 0 } = options;
  const animationRef = useRef<number | undefined>(undefined);

  const isPlaying = useStore(state => state.isPlaying);
  const setAnimationFrame = useStore(state => state.setAnimationFrame);
  const setPlaying = useStore(state => state.setPlaying);

  const updateAnimationFrame = () => {
    const store = useStore.getState();
    const {
      isPlaying: currentIsPlaying,
      animationFrameValue,
      animationSpeed,
      animationFrameMax,
    } = store;

    let nextValue = animationFrameValue + animationSpeed;
    if (nextValue > animationFrameMax) nextValue = min;

    setAnimationFrame(nextValue);

    if (currentIsPlaying) {
      animationRef.current = requestAnimationFrame(updateAnimationFrame);
    }
  };

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
  }, [isPlaying]);

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
