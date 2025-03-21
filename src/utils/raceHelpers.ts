/**
 * レースデータ処理のためのヘルパー関数
 */
import {
  RaceParticipantBase,
  CheckpointRecord,
  PaceRecord,
} from '../types/race-json';

/**
 * ゴールタイムを取得するヘルパー関数
 * @param participant 参加者データ
 * @param category レースカテゴリー
 * @returns ゴールタイム
 */
export function getFinishTime(
  participant: RaceParticipantBase,
  categoryNo: number
): string {
  // const raceType = getRaceType(categoryNo);

  switch (categoryNo) {
    case 0:
      return getTimeValue(participant.column_16);
    case 1:
      return getTimeValue(participant.column_19);
    case 2:
      return getTimeValue(participant.column_21);
    case 3:
      return getTimeValue(participant.column_9);
    case 4:
      return getTimeValue(participant.column_10);
    default:
      return '';
  }
}

/**
 * チェックポイントデータまたは文字列から時間値を取得するヘルパー関数
 * @param value チェックポイントデータまたは文字列
 * @returns 時間値
 */
function getTimeValue(
  value: string | CheckpointRecord | PaceRecord | undefined
): string {
  if (!value) return '';

  if (typeof value === 'object' && 'time' in value) {
    return value.time;
  }

  if (typeof value === 'string') {
    // 文字列の場合、括弧内の順位情報を削除
    const match = value.match(/^([^(]+)/);
    return match ? match[1].trim() : value;
  }

  return String(value);
}
