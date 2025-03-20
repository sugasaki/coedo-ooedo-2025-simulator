import { ScatterplotLayer } from 'deck.gl';
import { useStore } from '../store/store';

const ballSize = 10;

export const useScatterplotLayer = () => {
  const { personLocation } = useStore();

  const getScatterplotLayer = () => {
    //
    const id = Math.random().toString(32).substring(2);
    //
    const scatterplotLayer = new ScatterplotLayer({
      id: 'icon-layer',
      data: personLocation,
      // data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',

      // getPosition: d => {
      //   console.log(d, 'getPosition');
      //   return [d.coordinates[0], d.coordinates[1], ballSize];
      // }, //他のレイヤーに隠れるのでZ軸を上に移動
      getPosition: d => [d.coordinates[0], d.coordinates[1], ballSize], //他のレイヤーに隠れるのでZ軸を上に移動

      radiusUnits: 'meters',
      antialiasing: true,
      getRadius: 10,
      radiusScale: 1, //すべてのポイントのグローバル半径乗数。
      billboard: true,
      filled: true, // 点の塗りつぶされた領域を描画します。

      // radiusMinPixels: 3, //ピクセル単位の最小半径。この小道具を使用すると、ズームアウトしたときに円が小さくなりすぎるのを防ぐことができます。
      radiusMaxPixels: 100, //ピクセル単位の最大半径。この小道具を使用すると、ズームインしたときに円が大きくなりすぎるのを防ぐことができます。

      // lineWidthMinPixels: 1, //ピクセル単位の最小線幅。このプロップを使用すると、ズームアウトしたときにストロークが細くなりすぎるのを防ぐことができます。
      // lineWidthMaxPixels: 30, //ピクセル単位の最大線幅。この小道具を使用すると、ズームインしたときにパスが太くなりすぎるのを防ぐことができます。

      getFillColor: [255, 0, 0],
      // getLineWidth: 0,
      // opacity: 0.8,
      // pickable: true,
    });
    return scatterplotLayer;
  };

  return { getScatterplotLayer };
};
