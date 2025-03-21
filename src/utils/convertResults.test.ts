/**
 * convertResults.ts の単体テスト
 *
 * 注意: このテストを実行するには、以下のパッケージをインストールする必要があります:
 * npm install @std/expect @std/testing
 */

import { expect } from '@std/expect';
import { test } from '@std/testing/bdd';
import { convertResults, getCategoryData } from './convertResults';
import { RaceData } from '../types/race-json';

// テスト用のモックデータ
const mockRaceData: RaceData = [
  {
    category: 'テストカテゴリー',
    header: {
      column_0: '順位',
      column_1: 'ゼッケン',
      column_2: '氏名',
      column_3: '所属',
      column_4: '部門順位',
      column_5: '5km',
      column_6: '10km',
      column_7: 'ペース(分/㎞)',
    },
    results: [
      {
        column_0: '1',
        column_1: '101',
        column_2: 'テスト太郎',
        column_3: 'テストチーム',
        column_4: '1',
        column_5: {
          time: '00:25:00',
          time_second: 1500,
          comment: '1位通過',
        },
        column_6: {
          time: '00:50:00',
          time_second: 3000,
          comment: '1位通過',
        },
        column_7: '5:00',
      },
      {
        column_0: '2',
        column_1: '102',
        column_2: 'テスト次郎',
        column_3: 'テストチーム',
        column_4: '2',
        column_5: {
          time: '00:30:00',
          time_second: 1800,
          comment: '2位通過',
        },
        column_6: {
          time: '01:00:00',
          time_second: 3600,
          comment: '2位通過',
        },
        column_7: '6:00',
      },
    ],
  },
  {
    category: '別カテゴリー',
    header: {
      column_0: '順位',
      column_1: 'ゼッケン',
      column_2: '氏名',
      column_3: '所属',
      column_4: '部門順位',
      column_5: '2.5km',
      column_6: '5km',
    },
    results: [
      {
        column_0: '1',
        column_1: '201',
        column_2: '別太郎',
        column_3: '別チーム',
        column_4: '1',
        column_5: {
          time: '00:12:30',
          time_second: 750,
          comment: '1位通過',
        },
        column_6: {
          time: '00:25:00',
          time_second: 1500,
          comment: '1位通過',
        },
      },
    ],
  },
];

test('convertResults - レースデータを正しく変換する', () => {
  const convertedData = convertResults(mockRaceData);

  // 変換されたデータの基本構造を検証
  expect(convertedData).toBeInstanceOf(Array);
  expect(convertedData.length).toBe(2);

  // 最初のカテゴリーの検証
  const firstCategory = convertedData[0];
  expect(firstCategory.category).toBe('テストカテゴリー');
  expect(firstCategory.results.length).toBe(2);

  // 最初の参加者の検証
  const firstParticipant = firstCategory.results[0];
  expect(firstParticipant.順位).toBe('1');
  expect(firstParticipant.ゼッケン).toBe('101');
  expect(firstParticipant.氏名).toBe('テスト太郎');
  expect(firstParticipant.所属).toBe('テストチーム');
  expect(firstParticipant.部門順位).toBe('1');
  expect(firstParticipant.pace).toBe('5:00');

  // 結果配列の検証
  expect(firstParticipant.result).toBeInstanceOf(Array);
  expect(firstParticipant.result.length).toBe(3); // スタート地点 + 2つのチェックポイント

  // スタート地点の検証
  const startPoint = firstParticipant.result[0];
  expect(startPoint.leng).toBe(0);
  expect(startPoint.length_prev).toBe(0);
  expect(startPoint.time_second).toBe(0);
  expect(startPoint.time_second_prev).toBe(0);
  expect(startPoint.speed).toBe(0);

  // 5kmポイントの検証
  const point5km = firstParticipant.result[1];
  expect(point5km.leng).toBe(5);
  expect(point5km.length_prev).toBe(0);
  expect(point5km.time).toBe('00:25:00');
  expect(point5km.time_second).toBe(1500);
  expect(point5km.time_second_prev).toBe(0);
  expect(point5km.comment).toBe('1位通過');
  expect(point5km.speed).toBe(12); // 5km / 0.416時間 = 12km/h

  // 10kmポイントの検証
  const point10km = firstParticipant.result[2];
  expect(point10km.leng).toBe(10);
  expect(point10km.length_prev).toBe(5);
  expect(point10km.time).toBe('00:50:00');
  expect(point10km.time_second).toBe(3000);
  expect(point10km.time_second_prev).toBe(1500);
  expect(point10km.comment).toBe('1位通過');
  expect(point10km.speed).toBe(12); // 5km / 0.416時間 = 12km/h

  // 2番目の参加者の検証
  const secondParticipant = firstCategory.results[1];
  expect(secondParticipant.順位).toBe('2');
  expect(secondParticipant.ゼッケン).toBe('102');
  expect(secondParticipant.pace).toBe('6:00');

  // 2番目のカテゴリーの検証
  const secondCategory = convertedData[1];
  expect(secondCategory.category).toBe('別カテゴリー');
  expect(secondCategory.results.length).toBe(1);

  // 2番目のカテゴリーの参加者の検証
  const participantInSecondCategory = secondCategory.results[0];
  expect(participantInSecondCategory.順位).toBe('1');
  expect(participantInSecondCategory.ゼッケン).toBe('201');
  expect(participantInSecondCategory.result.length).toBe(3); // スタート地点 + 2つのチェックポイント

  // 2.5kmポイントの検証
  const point2_5km = participantInSecondCategory.result[1];
  expect(point2_5km.leng).toBe(2.5);
  expect(point2_5km.time_second).toBe(750);

  // 5kmポイントの検証
  const point5kmSecondCategory = participantInSecondCategory.result[2];
  expect(point5kmSecondCategory.leng).toBe(5);
  expect(point5kmSecondCategory.time_second).toBe(1500);
});

test('getCategoryData - 指定したカテゴリーのデータを取得する', () => {
  // 存在するカテゴリーの検証
  const category = getCategoryData(mockRaceData, 'テストカテゴリー');
  expect(category).toBeDefined();
  expect(category?.category).toBe('テストカテゴリー');
  expect(category?.results.length).toBe(2);

  // 存在しないカテゴリーの検証
  const nonExistentCategory = getCategoryData(
    mockRaceData,
    '存在しないカテゴリー'
  );
  expect(nonExistentCategory).toBeUndefined();
});

test('calculateSpeed - 速度計算が正しく行われる', () => {
  // convertResultsを通じて間接的にcalculateSpeedをテスト
  const convertedData = convertResults(mockRaceData);
  const firstParticipant = convertedData[0].results[0];

  // 5kmポイントの速度検証（0kmから5kmまで）
  const point5km = firstParticipant.result[1];
  // 5km / 1500秒 = 5km / 0.416時間 = 12km/h
  expect(point5km.speed).toBe(12);

  // 10kmポイントの速度検証（5kmから10kmまで）
  const point10km = firstParticipant.result[2];
  // 5km / 1500秒 = 5km / 0.416時間 = 12km/h
  expect(point10km.speed).toBe(12);

  // 2番目の参加者の速度検証
  const secondParticipant = convertedData[0].results[1];
  const secondPoint5km = secondParticipant.result[1];
  // 5km / 1800秒 = 5km / 0.5時間 = 10km/h
  expect(secondPoint5km.speed).toBe(10);
});

test('エッジケース - 同じ時間のチェックポイントの速度は0になる', () => {
  // 同じ時間のチェックポイントを持つモックデータ
  const mockDataWithSameTime: RaceData = [
    {
      category: '同時間テスト',
      header: {
        column_0: '順位',
        column_1: 'ゼッケン',
        column_2: '氏名',
        column_3: '所属',
        column_4: '部門順位',
        column_5: '5km',
        column_6: '5km再計測',
      },
      results: [
        {
          column_0: '1',
          column_1: '301',
          column_2: '同時太郎',
          column_3: 'テストチーム',
          column_4: '1',
          column_5: {
            time: '00:25:00',
            time_second: 1500,
            comment: '計測',
          },
          column_6: {
            time: '00:25:00',
            time_second: 1500, // 同じ時間
            comment: '再計測',
          },
        },
      ],
    },
  ];

  const convertedData = convertResults(mockDataWithSameTime);
  const participant = convertedData[0].results[0];

  // 2つ目のチェックポイントの速度は0になるはず
  const secondPoint = participant.result[2];
  expect(secondPoint.speed).toBe(0);
});

test('エッジケース - 距離が0の場合の速度は0になる', () => {
  // 距離が同じチェックポイントを持つモックデータ
  const mockDataWithSameDistance: RaceData = [
    {
      category: '同距離テスト',
      header: {
        column_0: '順位',
        column_1: 'ゼッケン',
        column_2: '氏名',
        column_3: '所属',
        column_4: '部門順位',
        column_5: '5km',
        column_6: '5km', // 同じ距離
      },
      results: [
        {
          column_0: '1',
          column_1: '401',
          column_2: '同距離太郎',
          column_3: 'テストチーム',
          column_4: '1',
          column_5: {
            time: '00:25:00',
            time_second: 1500,
            comment: '計測1',
          },
          column_6: {
            time: '00:30:00',
            time_second: 1800,
            comment: '計測2',
          },
        },
      ],
    },
  ];

  const convertedData = convertResults(mockDataWithSameDistance);
  const participant = convertedData[0].results[0];

  // 距離が同じなので、2つ目のチェックポイントの速度は0になるはず
  // （実際の実装では距離の差分が0になるため）
  const secondPoint = participant.result[2];
  expect(secondPoint.speed).toBe(0);
});
