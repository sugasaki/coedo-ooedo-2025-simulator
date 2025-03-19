import { Map } from 'react-map-gl/maplibre';
import { DeckGLOverlay } from './DeckGLOverlay';
import { useScatterplotLayer } from '../hooks/useScatterplotLayer';

const mapStyle = `https://api.maptiler.com/maps/streets/style.json?key=${
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
  const scatterplotLayer = getScatterplotLayer();

  const layers = [
    scatterplotLayer,
    // aidIconLayer, //
    // iconLayer,
    // cp,
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
