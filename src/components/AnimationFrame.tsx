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

  console.log('AnimationFrame.tsx: isPlaying:', isPlaying);
  console.log('AnimationFrame.tsx: animationFrame:', animationFrame);

  // prettier-ignore
  useEffect(() => {
    let animation: number;

    if (isPlaying) {
      animation = requestAnimationFrame(() => {
        let nextValue = animationFrame + animationSpeed;
        console.log("nextValue", nextValue)
        if (nextValue > animationFrameMax) {
          nextValue = min;
        }
        setAnimationFrame(nextValue);
      });
    }

    return () => animation && cancelAnimationFrame(animation);
  });

  // useEffect(() => {
  //   let animation: number;

  //   if (isPlaying) {
  //     animation = requestAnimationFrame(() => {
  //       let nextValue = animationFrame + animationSpeed;
  //       if (nextValue > animationFrameMax) {
  //         nextValue = min;
  //       }
  //       setAnimationFrame(nextValue);
  //   }

  //   return () => animation && cancelAnimationFrame(animation);
  // });

  // useEffect(() => {
  //   // 2秒後にアニメーションを開始
  //   setTimeout(() => setPlaying(true), 2000);
  // }, []);

  return <div>{animationFrame}</div>;
};
