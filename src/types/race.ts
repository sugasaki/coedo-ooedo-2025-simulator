/**
 * レース結果データの型定義
 */

// チェックポイントでの記録データ
export interface CheckpointRecord {
  time: string; // 通過時間（HH:MM:SS形式）
  time_second: number | string; // 通過時間（秒）または文字列形式
  comment: string; // コメント（順位など）
}

// ペースデータ
export interface PaceRecord {
  time: string; // ペース（MM:SS.mm形式）
  time_second: string; // 同じペース値（文字列形式）
}

// レース参加者の基本データ（すべてのレースに共通）
export interface RaceParticipantBase {
  column_0: string; // 順位
  column_1: string; // ゼッケン
  column_2: string; // 氏名
  column_3: string; // 所属
  column_4: string; // 部門順位
  [key: string]: string | CheckpointRecord | PaceRecord | undefined; // その他のカラム（動的に追加）
}

// レースカテゴリーのヘッダー
export interface RaceHeader {
  [key: string]: string; // 動的なヘッダーカラム
}

// レースカテゴリーのデータ
export interface RaceCategory {
  category: string; // カテゴリー名
  header: RaceHeader; // ヘッダー情報
  results: RaceParticipantBase[]; // 参加者の結果リスト
}

// レースデータ全体
export type RaceData = RaceCategory[];
