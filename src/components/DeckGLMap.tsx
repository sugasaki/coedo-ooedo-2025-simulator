import { Map } from 'react-map-gl/maplibre';
import { DeckGLOverlay } from './DeckGLOverlay';

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
        <DeckGLOverlay />
      </Map>
    </>
  );
};
