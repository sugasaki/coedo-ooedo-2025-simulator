import { ConvertedRaceData } from '../types/race';

/**
 * 指定されたJSONファイルからレースデータを読み込む
 * @param path JSONファイルのパス
 * @returns レースデータのPromise
 */
export async function loadRaceData(path: string): Promise<ConvertedRaceData> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as ConvertedRaceData;
    return data;
  } catch (error) {
    console.error('レースデータの読み込み中にエラーが発生しました:', error);
    throw error;
  }
}
