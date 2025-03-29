import maplibregl from 'maplibre-gl';

/** GeoJSONのルートに合わせて、マップの表示範囲を調整する */
export function adjustMapBounds(map: maplibregl.Map, geojson: any): void {
  if (geojson.features.length === 0) return;
  const coords = geojson.features[0].geometry.coordinates;
  if (!coords || coords.length === 0) return;

  console.log('adjustMapBounds start');

  // const bounds = coords.reduce(
  //   (b: maplibregl.LngLatBounds, coord: [number, number]) => b.extend(coord),
  //   new maplibregl.LngLatBounds(coords[0], coords[0])
  // );

  // console.log('bounds', bounds);
  console.log('map', map);
  console.log('mapRef', mapRef);

  mapRef.fitBounds(
    [
      [139.1, 36.1],
      [139.9, 35.9],
    ],
    { padding: 40, duration: 1000 }
  );

  // moveTo(
  //   setViewState,
  //   viewState,
  //   139.745,
  //   35.69800947149907,
  //   12.35160289051144
  // );

  // moveTo();
}

// const moveTo = (longitude: number, latitude: number, zoom: number) => {
//   setViewState({
//     ...viewState,
//     longitude,
//     latitude,
//     zoom,
//     transitionDuration: 1500, // アニメーションの時間（ミリ秒）
//     // transitionInterpolator: new deck.FlyToInterpolator(), // アニメーションの種類
//   });
// };

const moveTo2 = (
  setViewState,
  viewState,
  longitude: number,
  latitude: number,
  zoom: number
) => {
  setViewState({
    ...viewState,
    longitude,
    latitude,
    zoom,
    transitionDuration: 1500, // アニメーションの時間（ミリ秒）
    // transitionInterpolator: new deck.FlyToInterpolator(), // アニメーションの種類
  });
};

const moveTo = (
  setViewState,
  viewState,
  longitude: number,
  latitude: number,
  zoom: number
) => {
  setViewState({
    ...viewState,
    longitude,
    latitude,
    zoom,
    transitionDuration: 1500, // アニメーションの時間（ミリ秒）
    // transitionInterpolator: new deck.FlyToInterpolator(), // アニメーションの種類
  });
};
