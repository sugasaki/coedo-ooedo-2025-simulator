/**
 * 時間に関するユーティリティ関数
 * 時間からレース参加者の距離を計算する機能を提供
 */
import { ConvertedRaceParticipant } from '../types/race';

/**
 * 指定した時間（秒）における距離を線形補間で計算する
 * バイナリサーチを使用して高速に適切なチェックポイントのペアを見つける
 * @param participant レース参加者データ
 * @param timeSeconds 計算したい時間（秒）
 * @returns 計算された距離（km）、または未定義の場合は null
 */
export function getDistanceAtTime(
  participant: ConvertedRaceParticipant,
  timeSeconds: number
): number | null {
  const results = participant.result;

  // 結果がない、または1つしかない場合はnullを返す
  if (!results || results.length <= 1) {
    return null;
  }

  // 時間が最初のチェックポイント以前の場合
  if (timeSeconds <= results[0].time_second) {
    return results[0].leng;
  }

  // 時間が最後のチェックポイント以降の場合
  const lastResult = results[results.length - 1];
  if (timeSeconds >= lastResult.time_second) {
    return lastResult.leng;
  }

  // バイナリサーチで適切なチェックポイントのインデックスを見つける
  let left = 0;
  let right = results.length - 2; // 最後のペアのインデックスまで

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const current = results[mid];
    const next = results[mid + 1];

    if (current.time_second <= timeSeconds && timeSeconds < next.time_second) {
      // 適切なペアが見つかった場合、線形補間を行う
      const timeRange = next.time_second - current.time_second;
      const timeRatio = (timeSeconds - current.time_second) / timeRange;
      const distanceRange = next.leng - current.leng;
      return current.leng + distanceRange * timeRatio;
    }

    if (timeSeconds < current.time_second) {
      // 探索範囲を左半分に絞る
      right = mid - 1;
    } else if (timeSeconds >= next.time_second) {
      // 探索範囲を右半分に絞る
      left = mid + 1;
    }
  }

  // 何らかの理由で見つからなかった場合（通常はここに到達しない）
  console.warn(
    '指定された時間に対応するチェックポイントが見つかりませんでした'
  );
  return null;
}

/**
 * 指定した時間（時:分:秒形式）における距離を線形補間で計算する
 * @param participant レース参加者データ
 * @param timeString 計算したい時間（HH:MM:SS形式）
 * @returns 計算された距離（km）、または未定義の場合は null
 */
export function getDistanceAtTimeString(
  participant: ConvertedRaceParticipant,
  timeString: string
): number | null {
  // 時:分:秒形式から秒に変換
  const timeSeconds = convertTimeStringToSeconds(timeString);
  return getDistanceAtTime(participant, timeSeconds);
}

/**
 * 時:分:秒形式の文字列を秒数に変換する
 * @param timeString 時間文字列（HH:MM:SS形式）
 * @returns 秒数
 */
export function convertTimeStringToSeconds(timeString: string): number {
  if (!timeString) return 0;

  const parts = timeString.split(':');
  if (parts.length !== 3) {
    console.warn('不正な時間形式です:', timeString);
    return 0;
  }

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);

  return hours * 3600 + minutes * 60 + seconds;
}
