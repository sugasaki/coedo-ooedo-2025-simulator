import { DeckProps, MapView } from 'deck.gl';
import { useControl } from 'react-map-gl/maplibre';
import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox';

type DeckGLOverlayProps = DeckProps & {
  interleaved?: boolean;
};

export const DeckGLOverlay = (props: DeckGLOverlayProps) => {
  const overlay = useControl<DeckOverlay>(() => {
    const overlay = new DeckOverlay({
      ...props,
      views: [new MapView({ repeat: true })],
    });
    return overlay;
  });

  overlay.setProps({
    ...props,
    views: [new MapView({ repeat: true })],
  });

  return null;
};
