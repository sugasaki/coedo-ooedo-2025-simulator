/**
 * レースデータを読み込むためのユーティリティ関数
 */
import { useStore } from '../store/store';
import { loadRaceData, loadRaceInfo } from './fetcher';

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

/**
 * レース情報を読み込み、ストアに保存する
 * @param path JSONファイルのパス
 */
export async function fetchAndStoreRaceInfo(path: string): Promise<void> {
  const store = useStore.getState();
  const { setRaceInfo, setRaceInfoLoading, setRaceInfoError } = store;

  try {
    setRaceInfoLoading(true);

    const raceInfo = await loadRaceInfo(path);
    // console.log('loadRaceInfo', raceInfo);

    setRaceInfo(raceInfo);

    setRaceInfoLoading(false);
    setRaceInfoError(null);
  } catch (err) {
    setRaceInfoError('レース情報の読み込みに失敗しました');
    console.error(err);
  } finally {
    setRaceInfoLoading(false);
  }
}
