import { GeoJsonLayer } from 'deck.gl';

export const useGeoJsonLayer = (geojson: any) => {
  //
  const getGeojsonLayer = () => {
    const id = Math.random().toString(32).substring(2);

    const geojsonLayer = new GeoJsonLayer({
      id: 'geojson-layer' + id,
      data: geojson,
      pickable: false,
      stroked: false,
      filled: true,
      extruded: true,
      lineWidthScale: 4,
      lineWidthMinPixels: 2,
      autoHighlight: true,
      getLineColor: [255, 255, 0, 150],
      highlightColor: [255, 200, 0],
      getPointRadius: 100,
      getLineWidth: 20,
      // getElevation: 0,
      opacity: 0.5,
      lineCapRounded: true,
      extensions: [],
    });
    return geojsonLayer;
  };
  return { getGeojsonLayer };
};
