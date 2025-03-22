import {
  ConvertedRaceData,
  ConvertedRaceParticipant,
  RaceTimeResult,
} from '../types/race';
import {
  RaceData,
  RaceCategory,
  RaceParticipantBase,
  CheckpointRecord,
} from '../types/race-json';

/**
 * ヘッダーマッピングを作成する
 */
function createHeaderMapping(
  header: Record<string, string>
): Record<string, string> {
  return Object.entries(header).reduce((acc, [key, value]) => {
    acc[key] = value.toString();
    return acc;
  }, {} as Record<string, string>);
}

/**
 * 速度を計算する
 */
function calculateSpeed(
  currentDistance: number,
  prevDistance: number,
  currentTimeSeconds: number,
  prevTimeSeconds: number
): number {
  if (currentTimeSeconds === prevTimeSeconds) return 0;
  const distanceDiff = currentDistance - prevDistance; // km
  const timeDiffHours = (currentTimeSeconds - prevTimeSeconds) / 3600; // 秒を時間に変換
  return timeDiffHours === 0
    ? 0
    : Number((distanceDiff / timeDiffHours).toFixed(2));
}

/**
 * チェックポイントデータを作成する
 */
function createCheckpoint(
  distance: number,
  checkpointData: CheckpointRecord
): RaceTimeResult {
  return {
    leng: distance,
    length_prev: 0, // 後で計算
    time: checkpointData.time || '',
    time_second:
      typeof checkpointData.time_second === 'string'
        ? parseInt(checkpointData.time_second, 10)
        : checkpointData.time_second || 0,
    time_second_prev: 0, // 後で計算
    comment: checkpointData.comment || '',
    speed: 0, // 後で計算
  };
}

/**
 * 参加者データを変換する
 */
function convertParticipant(
  result: RaceParticipantBase,
  headerMapping: Record<string, string>
): ConvertedRaceParticipant {
  const converted: Partial<ConvertedRaceParticipant> = {};
  const timeResults: RaceTimeResult[] = [];

  // スタート地点を追加（時間0、距離0）
  timeResults.push({
    leng: 0,
    length_prev: 0,
    time: '00:00:00',
    time_second: 0,
    time_second_prev: 0,
    comment: 'スタート',
    speed: 0,
  });

  Object.entries(result).forEach(([key, value]) => {
    if (key === 'result') {
      return; // "result"は後で処理する
    }

    const headerKey = headerMapping[key] || key;

    // チェックポイントデータの処理
    if (
      key.startsWith('column_') &&
      typeof value === 'object' &&
      value !== null &&
      'time_second' in value
    ) {
      // ヘッダーからチェックポイントの距離を抽出（例: "5km" -> 5）
      const distanceMatch = headerKey.match(/(\d+(\.\d+)?)km/);
      const distance = distanceMatch ? parseFloat(distanceMatch[1]) : 0;

      // チェックポイントデータを作成
      const checkpoint = createCheckpoint(distance, value as CheckpointRecord);
      timeResults.push(checkpoint);
    } else if (headerKey === 'ペース(分/㎞)') {
      converted.pace = value as string;
    } else {
      // 基本プロパティの処理
      if (
        headerKey === '順位' ||
        headerKey === 'ゼッケン' ||
        headerKey === '氏名' ||
        headerKey === '所属' ||
        headerKey === '部門順位'
      ) {
        // 型安全な方法で代入
        (converted as Record<string, string>)[headerKey] = value as string;
      }
    }
  });

  // "result" プロパティが存在する場合、その配列を利用する
  if ('result' in result && Array.isArray(result.result)) {
    (result.result as RaceTimeResult[]).forEach(checkpoint => {
      timeResults.push({ ...checkpoint });
    });
  }

  // 距離順にソートし、前回の値と速度を設定
  timeResults.sort((a, b) => a.leng - b.leng);
  timeResults.forEach((checkpoint, index) => {
    checkpoint.length_prev = index === 0 ? 0 : timeResults[index - 1].leng;
    checkpoint.time_second_prev =
      index === 0 ? 0 : timeResults[index - 1].time_second;
    checkpoint.speed = calculateSpeed(
      checkpoint.leng,
      checkpoint.length_prev,
      checkpoint.time_second,
      checkpoint.time_second_prev
    );
  });

  converted.result = timeResults;
  return converted as ConvertedRaceParticipant;
}

/**
 * レースデータを変換する
 */
export function convertResults(formattedData: RaceData): ConvertedRaceData {
  // RaceDataは常に配列なので、そのまま使用
  return formattedData.map((race: RaceCategory) => ({
    category: race.category,
    results: race.results.map((result: RaceParticipantBase) =>
      convertParticipant(result, createHeaderMapping(race.header || {}))
    ),
  }));
}

/**
 * 特定のレースカテゴリーのデータを取得する
 * @param data レースデータ
 * @param categoryName カテゴリー名
 * @returns 指定されたカテゴリーのデータ（見つからない場合はundefined）
 */
export function getCategoryData(data: RaceData, categoryName: string) {
  return data.find(
    (data: { category: string }) => data.category === categoryName
  );
}
