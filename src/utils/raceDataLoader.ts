/**
 * レースデータを読み込むためのユーティリティ関数
 */
import { RaceData } from '../types/race';

/**
 * 指定されたJSONファイルからレースデータを読み込む
 * @param path JSONファイルのパス
 * @returns レースデータのPromise
 */
export async function loadRaceData(path: string): Promise<RaceData> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as RaceData;
    return data;
  } catch (error) {
    console.error('レースデータの読み込み中にエラーが発生しました:', error);
    throw error;
  }
}

/**
 * 特定のレースカテゴリーのデータを取得する
 * @param data レースデータ
 * @param categoryName カテゴリー名
 * @returns 指定されたカテゴリーのデータ（見つからない場合はundefined）
 */
export function getCategoryData(data: RaceData, categoryName: string) {
  return data.find(category => category.category === categoryName);
}

/**
 * ヘッダー行を除いた参加者データのみを取得する
 * @param data レースデータ
 * @param categoryName カテゴリー名
 * @returns 参加者データの配列
 */
export function getParticipantsData(data: RaceData, categoryName: string) {
  const categoryData = data.find(
    category => category.category === categoryName
  );
  if (!categoryData) return [];

  // ヘッダー行のスキップが不要になったため、そのまま返す
  return categoryData.results;
}
