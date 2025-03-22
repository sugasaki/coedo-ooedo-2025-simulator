import {
  ConvertedRaceData,
  ConvertedRaceParticipant,
  RaceTimeResult,
} from '../types/race';
import { RaceData } from '../types/race-json';

function createHeaderMapping(
  header: Record<string, string>
): Record<string, string> {
  return Object.entries(header).reduce((acc, [key, value]) => {
    acc[key] = value.toString();
    return acc;
  }, {} as Record<string, string>);
}

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

function convertParticipant(
  result: Record<string, any>,
  headerMapping: Record<string, string>
): ConvertedRaceParticipant {
  const converted: Partial<ConvertedRaceParticipant> = {};
  const timeResults: RaceTimeResult[] = [];

  Object.entries(result).forEach(([key, value]) => {
    if (key === 'result') {
      return; // "result"は後で処理する
    }
    const headerKey = headerMapping[key] || key;
    if (headerKey === 'ペース(分/㎞)') {
      converted.pace = value;
    } else {
      converted[headerKey as keyof ConvertedRaceParticipant] = value;
    }
  });

  // "result" プロパティが存在する場合、その配列を利用する
  if (Array.isArray(result.result)) {
    result.result.forEach((checkpoint: any) => {
      timeResults.push(checkpoint);
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

export function convertResults(formattedData: RaceData): ConvertedRaceData {
  // 修正: formattedData が配列でない場合、categories プロパティを利用。存在しない場合は空配列でフォールバック
  const dataArray = Array.isArray(formattedData)
    ? formattedData
    : formattedData.categories || [];
  return dataArray.map(race => ({
    category: race.category,
    results: race.results.map(result =>
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
