import { GeoJsonLayer } from 'deck.gl';

export const useAidIconLayer = (
  geojson,
  id,
  color = [255, 0, 0, 200],
  radius = 300
) => {
  const aidIconLayer = new GeoJsonLayer({
    id: 'aid-layer' + id,
    data: geojson,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    // lineWidthScale: 20,
    // lineWidthMinPixels: 1,
    pointType: 'circle',
    getPointRadius: radius,
    getFillColor: color,
    // getLineColor: [255, 0, 0, 200],
    // getLineColor: [255, 255, 0, 150],
    // getLineWidth: 1,
    // getElevation: 30,
    opacity: 0.5,
  });

  return { aidIconLayer };
};
