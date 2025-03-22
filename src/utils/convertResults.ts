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
  const converted: Partial<ConvertedRaceParticipant> = {
    result: [
      // 初期値（スタート地点）を追加
      {
        time: '',
        time_second: 0,
        time_second_prev: 0,
        comment: '',
        leng: 0,
        length_prev: 0,
        speed: 0,
      },
    ],
  };

  const timeResults: RaceTimeResult[] = [];

  // 距離データを収集
  Object.entries(result).forEach(([key, value]) => {
    const headerKey = headerMapping[key];
    if (!headerKey) return;

    const distanceMatch = headerKey.match(/^(\d+\.?\d*)km$/);
    if (distanceMatch) {
      const distance = parseFloat(distanceMatch[1]);
      timeResults.push({
        ...value,
        leng: distance,
        length_prev: 0,
        time_second_prev: 0,
      });
    } else if (headerKey === 'ペース(分/㎞)') {
      converted.pace = value;
    } else {
      converted[headerKey as keyof ConvertedRaceParticipant] = value;
    }
  });

  // 距離順にソート
  timeResults.sort((a, b) => a.leng - b.leng);

  // length_prev、time_second_prev、speedを設定
  timeResults.forEach((result, index) => {
    result.length_prev = index === 0 ? 0 : timeResults[index - 1].leng;
    result.time_second_prev =
      index === 0 ? 0 : timeResults[index - 1].time_second;
    result.speed = calculateSpeed(
      result.leng,
      result.length_prev,
      result.time_second,
      result.time_second_prev
    );
  });

  // 初期値の配列が確実に存在することを確認して結合
  converted.result = (converted.result || []).concat(timeResults);

  return converted as ConvertedRaceParticipant;
}

export function convertResults(formattedData: RaceData): ConvertedRaceData {
  return formattedData.map(race => ({
    category: race.category,
    results: race.results.map(result =>
      convertParticipant(result, createHeaderMapping(race.header))
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
