import { Map } from 'react-map-gl/maplibre';
import { DeckGLOverlay } from './DeckGLOverlay';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useScatterplotLayer } from '../hooks/useScatterplotLayer';
import { createGeoJsonLayer, createAidPointLayer } from '../utils/geoJsonUtils';

import geojson from '../data/2025-小江戸大江戸v1.3.json';
import aidJson from '../data/2025-小江戸大江戸-CP.json';
const feature = geojson.features[0];

const mapStyle = `https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json?key=${
  import.meta.env.VITE_MAPTILER_KEY
}`;

interface Props {
  width?: string | number;
  height?: string | number;
}

// 皇居の座標
const IMPERIAL_PALACE_LOCATION = {
  longitude: 139.7528,
  latitude: 35.6852,
  zoom: 13,
};

export const DeckGLMap = ({ width = '100%', height = '500px' }: Props) => {
  const { getScatterplotLayer } = useScatterplotLayer();
  console.log(feature, 'feature');

  const scatterplotLayer = getScatterplotLayer();
  const geojsonLayer = createGeoJsonLayer(geojson);
  const aidIconLayer = createAidPointLayer(aidJson, 'aid1', [0, 255, 127], 200);

  const layers = [
    scatterplotLayer,
    geojsonLayer,
    aidIconLayer, //
    // iconLayer,
  ];

  // マップコンテナのスタイル
  const mapViewStyle = {
    width,
    height,
    position: 'relative' as const,
  };

  return (
    <>
      <Map
        reuseMaps
        id="map"
        initialViewState={IMPERIAL_PALACE_LOCATION}
        mapStyle={mapStyle}
        style={mapViewStyle}
      >
        <DeckGLOverlay layers={layers} />
      </Map>
    </>
  );
};
