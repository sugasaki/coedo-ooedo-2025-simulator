/**
 * レースデータを読み込むためのユーティリティ関数
 */
import { useRaceStore } from '../store/race/raceStore';
import { useAnimationStore } from '../store/animation/animationStore';
import { loadRaceData, loadRaceInfo } from './fetcher';

/**
 * レースデータを読み込み、ストアに保存する
 * @param path JSONファイルのパス
 */
export async function fetchAndStoreRaceData(path: string): Promise<void> {
  const { setRaceData, setRaceDataLoading, setRaceDataError } =
    useRaceStore.getState();

  try {
    setRaceDataLoading(true);

    const raceData = await loadRaceData(path);
    // console.log('loadRaceData', raceData);

    setRaceData(raceData);

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
  const { setRaceInfo, setRaceInfoLoading, setRaceInfoError } =
    useRaceStore.getState();
  const { setAnimationFrame, setAnimationFrameMin, setAnimationFrameMax } =
    useAnimationStore.getState();

  try {
    setRaceInfoLoading(true);

    const raceInfo = await loadRaceInfo(path);
    // console.log('loadRaceInfo', raceInfo);

    setRaceInfo(raceInfo);

    // タイムラインの範囲を設定
    const yohaku = 1800;
    setAnimationFrame(raceInfo.start_unixtime_jst - 0);
    setAnimationFrameMin(raceInfo.start_unixtime_jst - yohaku);
    setAnimationFrameMax(raceInfo.end_unixtime_jst + yohaku);

    setRaceInfoError(null);
  } catch (err) {
    setRaceInfoError('レース情報の読み込みに失敗しました');
    console.error(err);
  } finally {
    setRaceInfoLoading(false);
  }
}
