import courseGeoJson from '../data/2025/geojson/小江戸大江戸200km.json';
import aidPointsJson from '../data/2025/2025-小江戸大江戸-CP.json';

/**
 * コースのGeoJSONデータ
 */
export const courseData = courseGeoJson;
export const featureData = courseData.features[0];

/**
 * エイドポイントのGeoJSONデータ
 */
export const aidPointsData = aidPointsJson;

/**
 * 皇居の座標 (地図の初期表示位置)
 */
export const IMPERIAL_PALACE_LOCATION = {
  longitude: 139.482339983806,
  latitude: 35.91942991130054,
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
