import courseGeoJson from '../data/2025-小江戸大江戸v1.3.json';
import aidPointsJson from '../data/2025-小江戸大江戸-CP.json';

/**
 * コースのGeoJSONデータ
 */
export const courseData = courseGeoJson;

/**
 * エイドポイントのGeoJSONデータ
 */
export const aidPointsData = aidPointsJson;

/**
 * 皇居の座標 (地図の初期表示位置)
 */
export const IMPERIAL_PALACE_LOCATION = {
  longitude: 139.7528,
  latitude: 35.6852,
  zoom: 13,
};

/**
 * マップスタイルのURL
 * @param apiKey MapTilerのAPIキー
 * @returns マップスタイルのURL
 */
export const getMapStyle = (apiKey: string): string => {
  return `https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json?key=${apiKey}`;
};
