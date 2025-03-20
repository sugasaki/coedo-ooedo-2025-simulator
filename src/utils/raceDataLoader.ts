/**
 * レースデータを読み込むためのユーティリティ関数
 */
import { useStore } from '../store/store';
import { RaceData } from '../types/race-json';
import { convertResults } from './convertResults';
import { loadRaceData } from './fetcher';

/**
 * レースデータを読み込み、ストアに保存する
 * @param path JSONファイルのパス
 */
export async function fetchAndStoreRaceData(path: string): Promise<void> {
  const store = useStore.getState();
  const { setRaceData, setRaceDataLoading, setRaceDataError } = store;

  try {
    setRaceDataLoading(true);

    console.log('fetchAndStoreRaceData');

    const raceData = await loadRaceData(path);

    console.log('loadRaceData', raceData);

    const formattedData = formatRaceData(raceData);
    console.log('formattedData', formattedData);

    const resultData = convertResults(formattedData);

    console.log('resultData', resultData);

    setRaceData(resultData);

    // // カテゴリーの初期設定
    // if (!formattedData[category] && Object.keys(formattedData).length > 0) {
    //   setCategory(raceData[0].category);
    // }

    setRaceDataError(null);
  } catch (err) {
    setRaceDataError('レースデータの読み込みに失敗しました');
    console.error(err);
  } finally {
    setRaceDataLoading(false);
  }
}

/**
 * レースデータをカテゴリーごとにフォーマットする
 * @param raceData 元のレースデータ
 * @returns カテゴリーごとにフォーマットされたデータ
 */
export function formatRaceData(raceData: RaceData): RaceData {
  return raceData;
}
