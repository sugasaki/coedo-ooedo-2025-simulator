import { create } from 'zustand';
import { ConvertedRaceData, RaceInfo } from '../../types/race';

type RaceState = {
  runnerIds: string[];
  categoryNo: number;
  raceData: ConvertedRaceData;
  raceInfo: RaceInfo | null;
  isRaceDataLoading: boolean;
  isRaceInfoLoading: boolean;
  raceDataError: string | null;
  raceInfoError: string | null;
  focusNumberArray: string[];
};

export const useRaceStore = create<
  RaceState & {
    setRunnerIds: (ids: string[]) => void;
    setCategoryNo: (category: number) => void;
    setRaceData: (data: ConvertedRaceData) => void;
    setRaceInfo: (data: RaceInfo) => void;
    setRaceDataLoading: (isLoading: boolean) => void;
    setRaceInfoLoading: (isLoading: boolean) => void;
    setRaceDataError: (error: string | null) => void;
    setRaceInfoError: (error: string | null) => void;
    setFocusNumberArray: (numbers: string[]) => void;
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
  focusNumberArray: [
    '2151', // 200 1位
    '2262', // 竹内 竜也
    '2114', // 200 最後尾 なおっぺ
    '2221', // 200 杉 登紀子
    '2292', // 寺田 泰宏
    '2276', // 田村 篤史
    '156', // 230 1位 竹村 直太
    '門脇', // 230 122 門脇
    '186', // 三谷 享
    '144', // 庄司 光国
    '176', // スラ
    '179', // 230 一杉 岳春
    '181', // 230 平野 智彦
    '167', // 230	成田 玲司
    '運天', // 230 運天 均 114
    '5', // 260 1位 市川 智一
    '33', // 260 吉田 幸徳
    '13', // 260 川上 真也
    '1025', // 115 1位 岡本 敏明
    '1008', // 女将
    '1003', // 朝生 文子
    '1088', // 谷川 幸乃
    '1048', // 小淵 康子
  ],
  setRunnerIds: ids => set({ runnerIds: ids }),
  setCategoryNo: categoryNo => set({ categoryNo }),
  setRaceData: data => set({ raceData: data }),
  setRaceInfo: data => set({ raceInfo: data }),
  setRaceDataLoading: isLoading => set({ isRaceDataLoading: isLoading }),
  setRaceInfoLoading: isLoading => set({ isRaceInfoLoading: isLoading }),
  setRaceDataError: error => set({ raceDataError: error }),
  setRaceInfoError: error => set({ raceInfoError: error }),
  setFocusNumberArray: (numbers: string[]) =>
    set({ focusNumberArray: numbers }),
}));
