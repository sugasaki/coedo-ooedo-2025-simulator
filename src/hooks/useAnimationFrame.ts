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

  // 状態を直接購読するように変更
  const isPlaying = useStore(state => state.isPlaying);
  const setAnimationFrame = useStore(state => state.setAnimationFrame);
  const setPlaying = useStore(state => state.setPlaying);

  // デバッグ用のログ
  console.log('useAnimationFrame: isPlaying =', isPlaying);

  const updateAnimationFrame = () => {
    // 最新の状態を取得
    const store = useStore.getState();
    const {
      isPlaying: currentIsPlaying,
      animationFrameValue,
      animationSpeed,
      animationFrameMax,
    } = store;

    // デバッグ用のログ
    console.log('updateAnimationFrame:', {
      currentIsPlaying,
      animationFrameValue,
      animationSpeed,
      animationFrameMax,
    });

    let nextValue = animationFrameValue + animationSpeed;
    if (nextValue > animationFrameMax) nextValue = min;

    setAnimationFrame(nextValue);

    if (currentIsPlaying) {
      animationRef.current = requestAnimationFrame(updateAnimationFrame);
    }
  };

  useEffect(() => {
    console.log('isPlaying changed to:', isPlaying);

    if (isPlaying) {
      console.log('Starting animation');
      animationRef.current = requestAnimationFrame(updateAnimationFrame);
    } else if (animationRef.current) {
      console.log('Stopping animation');
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }

    return () => {
      if (animationRef.current) {
        console.log('Cleaning up animation');
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (autoStart) {
      console.log(`Auto-starting animation in ${autoStartDelay}ms`);
      const timer = setTimeout(() => {
        console.log('Auto-start timeout triggered');
        setPlaying(true);
      }, autoStartDelay);

      return () => {
        console.log('Clearing auto-start timer');
        clearTimeout(timer);
      };
    }
  }, [autoStart, autoStartDelay, setPlaying]);

  return {
    startAnimation: () => {
      console.log('startAnimation called');
      setPlaying(true);
    },
    stopAnimation: () => {
      console.log('stopAnimation called');
      setPlaying(false);
    },
    resetAnimation: () => {
      console.log('resetAnimation called');
      setAnimationFrame(min);
    },
    isPlaying,
  };
};
