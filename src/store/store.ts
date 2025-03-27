import { create } from 'zustand';
import { ConvertedRaceData, RaceInfo } from '../types/race';

type State = {
  runnerIds: string[];
  categoryNo: number;
  raceData: ConvertedRaceData;
  raceInfo: RaceInfo | null;
  isRaceDataLoading: boolean;
  isRaceInfoLoading: boolean;
  raceDataError: string | null;
  raceInfoError: string | null;
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
    setRaceInfo: (data: RaceInfo) => void;
    setRaceDataLoading: (isLoading: boolean) => void;
    setRaceInfoLoading: (isLoading: boolean) => void;
    setRaceDataError: (error: string | null) => void;
    setRaceInfoError: (error: string | null) => void;
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
  raceInfo: null,
  isRaceDataLoading: true,
  isRaceInfoLoading: true,
  raceDataError: null,
  raceInfoError: null,
  animationFrameValue: 0,
  animationFrameMax: 10000,
  isPlaying: false,
  animationSpeed: 10,
  personLocation: null,
  setRunnerIds: ids => set({ runnerIds: ids }),
  setCategoryNo: categoryNo => set({ categoryNo }),
  setRaceData: data => set({ raceData: data }),
  setRaceInfo: data => set({ raceInfo: data }),
  setRaceDataLoading: isLoading => set({ isRaceDataLoading: isLoading }),
  setRaceInfoLoading: isLoading => set({ isRaceInfoLoading: isLoading }),
  setRaceDataError: error => set({ raceDataError: error }),
  setRaceInfoError: error => set({ raceInfoError: error }),
  setAnimationFrame: frame => set({ animationFrameValue: frame }),
  setAnimationFrameMax: max => set({ animationFrameMax: max }),
  setPlaying: isPlaying => set({ isPlaying: isPlaying }),
  setAnimationSpeed: speed => set({ animationSpeed: speed }),
  playingStart: () => set({ isPlaying: true }),
  playingStop: () => set({ isPlaying: false }),
  setPersonLocationData: (value: any) => set({ personLocation: value }),
}));
