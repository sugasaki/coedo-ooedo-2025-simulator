import { create } from 'zustand';
import { RaceData } from '../types/race';

type State = {
  runnerIds: string[];
  category: string;
  raceData: Record<string, RaceData>;
  isRaceDataLoading: boolean;
  raceDataError: string | null;
  animationFrameValue: number; // アニメーションの現在のフレーム
  animationFrameMax: number; // アニメーションの最大フレーム数
  animationSpeed: number; // アニメーションの速度
  isPlaying: boolean; // animetionの再生状態
};

export const useStore = create<
  State & {
    setRunnerIds: (ids: string[]) => void;
    setCategory: (category: string) => void;
    setRaceData: (data: Record<string, RaceData>) => void;
    setRaceDataLoading: (isLoading: boolean) => void;
    setRaceDataError: (error: string | null) => void;
    setAnimationFrame: (frame: number) => void;
    setAnimationFrameMax: (max: number) => void;
    setPlaying: (isPlaying: boolean) => void;
    setAnimationSpeed: (speed: number) => void;
    playingStart: () => void;
    playingStop: () => void;
  }
>(set => ({
  runnerIds: [],
  category: '',
  raceData: {},
  isRaceDataLoading: true,
  raceDataError: null,
  animationFrameValue: 0,
  animationFrameMax: 10000,
  isPlaying: false,
  animationSpeed: 10,
  setRunnerIds: ids => set({ runnerIds: ids }),
  setCategory: category => set({ category }),
  setRaceData: data => set({ raceData: data }),
  setRaceDataLoading: isLoading => set({ isRaceDataLoading: isLoading }),
  setRaceDataError: error => set({ raceDataError: error }),
  setAnimationFrame: frame => set({ animationFrameValue: frame }),
  setAnimationFrameMax: max => set({ animationFrameMax: max }),
  setPlaying: isPlaying => set({ isPlaying: isPlaying }),
  setAnimationSpeed: speed => set({ animationSpeed: speed }),
  playingStart: () => set({ isPlaying: true }),
  playingStop: () => set({ isPlaying: false }),
}));
