/**
 * レースデータを読み込むためのユーティリティ関数
 */
import { useStore } from '../store/store';
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

    const raceData = await loadRaceData(path);
    // console.log('loadRaceData', raceData);

    setRaceData(raceData);

    setRaceDataLoading(false);
    setRaceDataError(null);
  } catch (err) {
    setRaceDataError('レースデータの読み込みに失敗しました');
    console.error(err);
  } finally {
    setRaceDataLoading(false);
  }
}
