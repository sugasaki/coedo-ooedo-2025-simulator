import { describe, expect, test } from 'vitest';
import {
  convertTimeStringToSeconds,
  getDistanceAtTime,
  getDistanceAtTimeString,
} from '../timeUtils';
import { ConvertedRaceParticipant, RaceTimeResult } from '../../types/race';

// テスト用のモックデータを作成
const createMockParticipant = (
  results: Partial<RaceTimeResult>[]
): ConvertedRaceParticipant => {
  return {
    順位: '1',
    ゼッケン: '101',
    氏名: 'テスト太郎',
    所属: 'テストチーム',
    部門順位: '1',
    pace: '5:00',
    result: results.map(r => ({
      leng: r.leng || 0,
      length_prev: r.length_prev || 0,
      time: r.time || '00:00:00',
      time_second: r.time_second || 0,
      time_second_prev: r.time_second_prev || 0,
      comment: r.comment || '',
      speed: r.speed || 0,
    })),
  };
};

describe('convertTimeStringToSeconds', () => {
  test('時間文字列 "00:00:00" で0秒を返す', () => {
    expect(convertTimeStringToSeconds('00:00:00')).toBe(0);
  });

  test('時間文字列 "01:30:45" を正しく秒数に変換する', () => {
    expect(convertTimeStringToSeconds('01:30:45')).toBe(5445);
  });

  test('不正な形式の場合は0を返す', () => {
    expect(convertTimeStringToSeconds('')).toBe(0);
    expect(convertTimeStringToSeconds('12:34')).toBe(0);
    expect(convertTimeStringToSeconds('invalid')).toBe(0);
  });
});

describe('getDistanceAtTime', () => {
  test('最初のチェックポイントより前の時間の場合は最初の距離を返す', () => {
    const participant = createMockParticipant([
      { time_second: 0, leng: 0 },
      { time_second: 3600, leng: 10 },
      { time_second: 7200, leng: 20 },
    ]);

    expect(getDistanceAtTime(participant, -100)).toBe(0);
    expect(getDistanceAtTime(participant, 0)).toBe(0);
  });

  test('チェックポイント間で線形補間が正しく行われる', () => {
    const participant = createMockParticipant([
      { time_second: 0, leng: 0 },
      { time_second: 3600, leng: 10 },
      { time_second: 7200, leng: 20 },
    ]);

    expect(getDistanceAtTime(participant, 1800)).toBe(5);
    expect(getDistanceAtTime(participant, 5400)).toBe(15);
  });

  test('最後のチェックポイント以降の場合は0を返す', () => {
    const participant = createMockParticipant([
      { time_second: 0, leng: 0 },
      { time_second: 3600, leng: 10 },
      { time_second: 7200, leng: 20 },
    ]);

    expect(getDistanceAtTime(participant, 7500)).toBe(0);
    expect(getDistanceAtTime(participant, 8000)).toBe(0);
  });

  test('結果が不足している場合は null を返す', () => {
    expect(getDistanceAtTime(createMockParticipant([]), 1000)).toBeNull();
    expect(
      getDistanceAtTime(
        createMockParticipant([{ time_second: 0, leng: 0 }]),
        1000
      )
    ).toBeNull();
  });
});

describe('getDistanceAtTimeString', () => {
  test('正しい時間文字列で線形補間を行い距離を計算する', () => {
    const participant = createMockParticipant([
      { time_second: 0, leng: 0 },
      { time_second: 3600, leng: 10 },
    ]);

    expect(getDistanceAtTimeString(participant, '00:30:00')).toBe(5);
    expect(getDistanceAtTimeString(participant, '01:00:00')).toBe(0);
  });

  test('不正な時間文字列の場合、convertTimeStringToSecondsが0を返すため最初の距離が返る', () => {
    const participant = createMockParticipant([
      { time_second: 0, leng: 0 },
      { time_second: 3600, leng: 10 },
    ]);

    expect(getDistanceAtTimeString(participant, 'invalid')).toBe(0);
  });
});
