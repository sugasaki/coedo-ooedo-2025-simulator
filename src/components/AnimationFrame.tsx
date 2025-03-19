import { useEffect } from 'react';
import { useStore } from '../store/store';

interface Props {
  min: number;
}

export const AnimationFrame = ({ min = 0 }: Props) => {
  const store = useStore.getState();
  const {
    isPlaying,
    animationFrame,
    animationSpeed,
    animationFrameMax,
    setAnimationFrame,
    setPlaying,
  } = store;

  // prettier-ignore
  useEffect(() => {
    let animation: number | undefined;

    if (isPlaying) {
      animation = requestAnimationFrame(() => {
        let nextValue = animationFrame + animationSpeed;
        if (nextValue > animationFrameMax) {
          nextValue = min;
        }
        setAnimationFrame(nextValue);
      });
    }

    return () => {
      if (animation !== undefined) {
        cancelAnimationFrame(animation);
      }
    };
  }, []);

  useEffect(() => {
    // 2秒後にアニメーションを開始
    setTimeout(() => setPlaying(true), 2000);
  }, []);

  return <div>AnimationFrame</div>;
};
