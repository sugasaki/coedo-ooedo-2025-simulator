import { useEffect, useState } from 'react';
import { Map } from 'react-map-gl/maplibre';
import { DeckGLOverlay } from './DeckGLOverlay';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useScatterplotLayer } from '../hooks/useScatterplotLayer';
import { createGeoJsonLayer, createAidPointLayer } from '../utils/geoJsonUtils';
import {
  courseData,
  aidPointsData,
  IMPERIAL_PALACE_LOCATION,
  getMapStyle,
} from '../utils/mapDataLoader';
import { adjustMapBounds } from '../utils/mapHelpers';

interface Props {
  width?: string | number;
  height?: string | number;
}

const mapStyle = getMapStyle(import.meta.env.VITE_MAPTILER_KEY);

export const DeckGLMap = ({ width = '100%', height = '500px' }: Props) => {
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  const { getScatterplotLayer } = useScatterplotLayer();

  const scatterplotLayer = getScatterplotLayer();
  const geojsonLayer = createGeoJsonLayer(courseData);
  const aidIconLayer = createAidPointLayer(
    aidPointsData,
    'aid1',
    [0, 255, 127],
    200
  );

  const layers = [scatterplotLayer, geojsonLayer, aidIconLayer];

  // マップ読み込み完了時
  const handleLoad = (event: any) => {
    const map = event.target;
    setMapInstance(map);

    // new maplibregl.Marker().setLngLat([139.767, 35.681]).addTo(map);
  };

  useEffect(() => {
    if (mapInstance) {
      // 非同期処理で UI の更新を許可
      setTimeout(() => {
        adjustMapBounds(mapInstance, courseData);
      }, 100);
    }
  }, [courseData, mapInstance]);

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
        onLoad={handleLoad}
      >
        <DeckGLOverlay layers={layers} />
      </Map>
    </>
  );
};
