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
import { PersonInfoType } from '../types/personInfo';
import { useAnimationStore, useMapStore } from '../store';
import { containsStringAndNumber } from '../utils/containsNumber';
import { Tooltip } from './Tooltip';

interface Props {
  width?: string | number;
  height?: string | number;
}

const mapStyle = getMapStyle(import.meta.env.VITE_MAPTILER_KEY);

const focusNumberArray = ['2151', '2114', '5', '1008'];

export const DeckGLMap = ({ width = '100%', height = '100%' }: Props) => {
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);
  const [tooltipData, setTooltipData] = useState<PersonInfoType[]>([]);
  const { animationFrameValue } = useAnimationStore();
  const { personLocation } = useMapStore();

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

  useEffect(() => {
    if (!personLocation) return;

    const tooltipData = personLocation
      .map(d => {
        return containsStringAndNumber(focusNumberArray, categoryName, d.no)
          ? d
          : null;
      })
      .filter((d): d => d !== null && d !== undefined);
    setTooltipData(tooltipData);
  }, [animationFrameValue]);

  // マップコンテナのスタイル
  const mapViewStyle = {
    width,
    height,
    position: 'relative' as const,
  };

  //ツールチップを生成する
  const tooltipHandler = (item: any): string | null => {
    // console.log('item', item);
    if (!item || !item.layer || !item.layer.id) return null;

    // if (object.layer.id != 'aid-layer' && object.layer.id != 'icon-layer') return;

    if (item.layer.id.startsWith('aid-layer')) {
      if (!item.object || !item.object.properties) return null;
      //geojsonレイヤーの場合はpropertiesの値をobjに入れる
      // console.log('item', item);
      const properties = item.object.properties ? item.object.properties : null;
      return properties ? `${properties.name}` : null;
    }

    if (item.layer.id.startsWith('scatterplot-layer')) {
      if (!item.object) return null;
      console.log('object.object', item.object);
      return `${item.object.no}: ${item.object.name}`;
    }

    return null;
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
        <DeckGLOverlay layers={layers} getTooltip={tooltipHandler} />
      </Map>

      {tooltipData
        ? tooltipData.map((data, index) => (
            <Tooltip key={index} personInfo={data} />
          ))
        : null}
    </>
  );
};
