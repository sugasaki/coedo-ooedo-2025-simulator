import { createAidPointLayer } from '../utils/geoJsonUtils';

/**
 * @deprecated createAidPointLayerユーティリティを直接使用してください
 */
export const useAidIconLayer = (
  geojson,
  id,
  color = [255, 0, 0, 200],
  radius = 300
) => {
  const aidIconLayer = createAidPointLayer(geojson, id, color, radius);
  return { aidIconLayer };
};
