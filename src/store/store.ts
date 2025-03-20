import { create } from 'zustand';
import { ConvertedRaceData } from '../types/race';

type State = {
  runnerIds: string[];
  categoryNo: number;
  raceData: ConvertedRaceData;
  isRaceDataLoading: boolean;
  raceDataError: string | null;
  animationFrameValue: number; // アニメーションの現在のフレーム
  animationFrameMax: number; // アニメーションの最大フレーム数
  animationSpeed: number; // アニメーションの速度
  isPlaying: boolean; // animetionの再生状態
  personLocation: any;
};

export const useStore = create<
  State & {
    setRunnerIds: (ids: string[]) => void;
    setCategoryNo: (category: number) => void;
    setRaceData: (data: ConvertedRaceData) => void;
    setRaceDataLoading: (isLoading: boolean) => void;
    setRaceDataError: (error: string | null) => void;
    setAnimationFrame: (frame: number) => void;
    setAnimationFrameMax: (max: number) => void;
    setPlaying: (isPlaying: boolean) => void;
    setAnimationSpeed: (speed: number) => void;
    playingStart: () => void;
    playingStop: () => void;
    setPersonLocationData: (value: any) => void;
  }
>(set => ({
  runnerIds: [],
  categoryNo: 0,
  raceData: [],
  isRaceDataLoading: true,
  raceDataError: null,
  animationFrameValue: 0,
  animationFrameMax: 10000,
  isPlaying: false,
  animationSpeed: 10,
  personLocation: null,
  setRunnerIds: ids => set({ runnerIds: ids }),
  setCategoryNo: categoryNo => set({ categoryNo }),
  setRaceData: data => set({ raceData: data }),
  setRaceDataLoading: isLoading => set({ isRaceDataLoading: isLoading }),
  setRaceDataError: error => set({ raceDataError: error }),
  setAnimationFrame: frame => set({ animationFrameValue: frame }),
  setAnimationFrameMax: max => set({ animationFrameMax: max }),
  setPlaying: isPlaying => set({ isPlaying: isPlaying }),
  setAnimationSpeed: speed => set({ animationSpeed: speed }),
  playingStart: () => set({ isPlaying: true }),
  playingStop: () => set({ isPlaying: false }),
  setPersonLocationData: (value: any) => set({ personLocation: value }),
}));
