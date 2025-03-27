import { create } from 'zustand';

type AnimationState = {
  animationFrameValue: number; // アニメーションの現在のフレーム
  animationFrameMax: number; // アニメーションの最大フレーム数
  animationSpeed: number; // アニメーションの速度
  isPlaying: boolean; // animationの再生状態
};

export const useAnimationStore = create<
  AnimationState & {
    setAnimationFrame: (frame: number) => void;
    setAnimationFrameMax: (max: number) => void;
    setPlaying: (isPlaying: boolean) => void;
    setAnimationSpeed: (speed: number) => void;
    playingStart: () => void;
    playingStop: () => void;
  }
>(set => ({
  animationFrameValue: 0,
  animationFrameMax: 10000,
  isPlaying: false,
  animationSpeed: 10,
  setAnimationFrame: frame => set({ animationFrameValue: frame }),
  setAnimationFrameMax: max => set({ animationFrameMax: max }),
  setPlaying: isPlaying => set({ isPlaying }),
  setAnimationSpeed: speed => set({ animationSpeed: speed }),
  playingStart: () => set({ isPlaying: true }),
  playingStop: () => set({ isPlaying: false }),
}));
