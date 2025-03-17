/**
 * レースデータ処理のためのヘルパー関数
 */
import {
  RaceParticipantBase,
  CheckpointRecord,
  PaceRecord,
} from '../types/race';

/**
 * レースの種類を判別するヘルパー関数
 */
export function getRaceType(category: string): string {
  if (category.includes('200km')) return '200km';
  if (category.includes('230km')) return '230km';
  if (category.includes('260km')) return '260km';
  if (category.includes('90km')) return '90km';
  if (category.includes('115km')) return '115km';
  return 'unknown';
}

/**
 * ゴールタイムを取得するヘルパー関数
 * @param participant 参加者データ
 * @param category レースカテゴリー
 * @returns ゴールタイム
 */
export function getFinishTime(
  participant: RaceParticipantBase,
  category: string
): string {
  const raceType = getRaceType(category);

  switch (raceType) {
    case '200km':
      return getTimeValue(participant.column_16);
    case '230km':
      return getTimeValue(participant.column_19);
    case '260km':
      return getTimeValue(participant.column_21);
    case '90km':
      return getTimeValue(participant.column_9);
    case '115km':
      return getTimeValue(participant.column_10);
    default:
      return '';
  }
}

/**
 * ペースを取得するヘルパー関数
 * @param participant 参加者データ
 * @param category レースカテゴリー
 * @returns ペース
 */
export function getPace(
  participant: RaceParticipantBase,
  category: string
): string {
  const raceType = getRaceType(category);

  switch (raceType) {
    case '200km':
      return participant.column_17 as string;
    case '230km':
      return participant.column_20 as string;
    case '260km':
      return participant.column_22 as string;
    case '90km':
      return participant.column_10 as string;
    case '115km':
      return getTimeValue(participant.column_11);
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
