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

interface Props {
  width?: string | number;
  height?: string | number;
}

const mapStyle = getMapStyle(import.meta.env.VITE_MAPTILER_KEY);

export const DeckGLMap = ({ width = '100%', height = '500px' }: Props) => {
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
