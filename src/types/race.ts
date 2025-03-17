/**
 * レース結果データの型定義
 */

// チェックポイントでの記録データ
export interface CheckpointRecord {
  time: string; // 通過時間（HH:MM:SS形式）
  time_second: number | string; // 通過時間（秒）または文字列形式のペース
  comment?: string; // コメント（順位など）- オプショナル
}

// ペースデータ（小江戸90kmのcolumn_10など）
export interface PaceRecord {
  time: string; // ペース（MM:SS.mm形式）
  time_second: string; // 同じペース値（文字列形式）
}

// レース参加者の結果データ（部分的な型定義）
export interface RaceParticipantBase {
  column_0: string; // 順位
  column_1: string; // ゼッケン
  column_2: string; // 氏名
  column_3: string; // 所属
  column_4: string; // 部門順位
  column_5: CheckpointRecord | string; // 21.4km
  column_6: CheckpointRecord | string; // 32.7km
  column_7: CheckpointRecord | string; // 52.2km
  column_8: CheckpointRecord | string; // 72.6km
  column_9: CheckpointRecord | string; // 91.7km
}

// 小江戸大江戸200kmの参加者データ
export interface RaceParticipant200km extends RaceParticipantBase {
  column_10: CheckpointRecord | string; // 92.0km
  column_11: CheckpointRecord | string; // 128.6km
  column_12: CheckpointRecord | string; // 146.5km
  column_13: CheckpointRecord | string; // 159.4km
  column_14: CheckpointRecord | string; // 181.3km
  column_15: CheckpointRecord | string; // 193.1km
  column_16: CheckpointRecord | string; // 207.5km
  column_17: string; // ペース(分/㎞)
}

// 小江戸90kmの参加者データ
export interface RaceParticipant90km extends RaceParticipantBase {
  column_10: PaceRecord | string; // ペース(分/㎞)
}

// 大江戸ナイトラン115kmの参加者データ
export interface RaceParticipant115km extends RaceParticipantBase {
  column_10: CheckpointRecord | string; // 115.1km
  column_11: PaceRecord | string; // ペース(分/㎞)
}

// 共用型として定義
export type RaceParticipant =
  | RaceParticipant200km
  | RaceParticipant90km
  | RaceParticipant115km;

// レースカテゴリーのデータ
export interface RaceCategory {
  category: string; // カテゴリー名
  results: RaceParticipant[]; // 参加者の結果リスト
}

// レースデータ全体
export type RaceData = RaceCategory[];

// レースの種類を判別するヘルパー関数
export function is200kmRace(category: string): boolean {
  return category.includes('200km');
}

export function is90kmRace(category: string): boolean {
  return category.includes('90km');
}

export function is115kmRace(category: string): boolean {
  return category.includes('115km');
}
