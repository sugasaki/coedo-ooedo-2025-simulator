/**
 * レースデータを読み込むためのユーティリティ関数
 */
import { RaceData } from '../types/race';
import { useStore } from '../store/store';

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
 * レースデータを読み込み、ストアに保存する
 * @param path JSONファイルのパス
 */
export async function fetchAndStoreRaceData(path: string): Promise<void> {
  const store = useStore.getState();
  const {
    setRaceData,
    setRaceDataLoading,
    setRaceDataError,
    setCategory,
    category,
  } = store;

  try {
    setRaceDataLoading(true);
    const raceData = await loadRaceData(path);
    const formattedData = formatRaceData(raceData);

    setRaceData(formattedData);

    // カテゴリーの初期設定
    if (!formattedData[category] && Object.keys(formattedData).length > 0) {
      setCategory(raceData[0].category);
    }

    setRaceDataError(null);
  } catch (err) {
    setRaceDataError('レースデータの読み込みに失敗しました');
    console.error(err);
  } finally {
    setRaceDataLoading(false);
  }
}

/**
 * レースデータをカテゴリーごとにフォーマットする
 * @param raceData 元のレースデータ
 * @returns カテゴリーごとにフォーマットされたデータ
 */
export function formatRaceData(raceData: RaceData): Record<string, RaceData> {
  return raceData.reduce((acc, race) => {
    acc[race.category] = [race];
    return acc;
  }, {} as Record<string, RaceData>);
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
