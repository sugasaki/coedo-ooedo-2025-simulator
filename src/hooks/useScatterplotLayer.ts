import { ScatterplotLayer } from 'deck.gl';
import { useMapStore } from '../store/map/mapStore';

export const useScatterplotLayer = () => {
  const { personLocation } = useMapStore();

  const getScatterplotLayer = () => {
    //
    // const id = Math.random().toString(32).substring(2);
    //
    const scatterplotLayer = new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: personLocation,
      pickable: true,
      opacity: 0.8,
      stroked: false,
      filled: true,
      radiusScale: 1,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 0,
      getPosition: d => d.position,
      getRadius: d => d.size,
      getFillColor: d => d.color,
      // getLineColor: [0, 0, 0],
    });
    return scatterplotLayer;
  };

  return { getScatterplotLayer };
};
