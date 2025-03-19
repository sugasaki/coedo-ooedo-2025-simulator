import { create } from 'zustand';
import { RaceData } from '../types/race';

type State = {
  runnerIds: string[];
  category: string;
  raceData: Record<string, RaceData>;
  isRaceDataLoading: boolean;
  raceDataError: string | null;
  animationFrame: number;
  animationFrameMax: number;
  animationSpeed: number;
  isPlaying: boolean;
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
  }
>(set => ({
  runnerIds: [],
  category: '',
  raceData: {},
  isRaceDataLoading: true,
  raceDataError: null,
  animationFrame: 0,
  animationFrameMax: 100,
  isPlaying: true,
  animationSpeed: 10,
  setRunnerIds: ids => set({ runnerIds: ids }),
  setCategory: category => set({ category }),
  setRaceData: data => set({ raceData: data }),
  setRaceDataLoading: isLoading => set({ isRaceDataLoading: isLoading }),
  setRaceDataError: error => set({ raceDataError: error }),
  setAnimationFrame: frame => set({ animationFrame: frame }),
  setAnimationFrameMax: max => set({ animationFrameMax: max }),
  setPlaying: isPlaying => set({ isPlaying: isPlaying }),
  setAnimationSpeed: speed => set({ animationSpeed: speed }),
}));
