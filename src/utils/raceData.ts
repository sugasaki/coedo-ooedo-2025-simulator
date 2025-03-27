import { getPositionAtDistance } from '../utils/pathUtils';
import { getDistanceAtTime } from '../utils/timeUtils';
import { Scatterplot2D } from '../types/scatterplot';
import { ConvertedRaceParticipant, ConvertedRaceData } from '../types/race';
import { getFeatureData } from '../utils/mapDataLoader';
import { categoryToColor } from './colorTable';
import { Coordinate } from '../types/geo';
import { RaceInfo } from '../types/race';
import { GeoJSONFeature } from '../types/geojson';

export const createData = (
  raceData: ConvertedRaceData,
  time: number,
  raceInfo: RaceInfo
): Scatterplot2D[] => {
  // 利用可能なコースを確認（デバッグ用）
  // console.log('利用可能なコース:', getAvailableCourses());

  try {
    return raceData.flatMap(category => {
      const categoryStartTime = raceInfo.category.find(
        c => c.category === category.category
      )?.start_unixtime_jst;

      // フレームのタイム（実時間）からカテゴリー開始時間（実時間）を引いて、カテゴリー内の経過時間を計算
      // 例えば、スタート時は０になるようにする
      const thisTime = time - (categoryStartTime || 0);

      // カテゴリーの色を取得
      const color = categoryToColor(category.category);
      const featureData = getFeatureData(category.category);

      if (!featureData) {
        console.error(
          `Feature data not found for category: ${category.category}`
        );
        return [];
      }

      return category.results
        .map((participant: ConvertedRaceParticipant) =>
          getPosition(featureData, participant, thisTime, color)
        )
        .filter(
          (position: Scatterplot2D | null): position is Scatterplot2D =>
            position !== null
        );
    });
  } catch (error) {
    console.error('Error creating race data:', error);
    return [];
  }
};

function getPosition(
  feature: GeoJSONFeature,
  participant: ConvertedRaceParticipant,
  time: number,
  color: number[]
): Scatterplot2D | null {
  try {
    const distanceKm = getDistanceAtTime(participant, time);
    if (distanceKm === null) return null;

    const distanceMeters = distanceKm * 1000;
    const position3D = getPositionAtDistance(feature, distanceMeters);
    if (position3D === null) return null;

    // Convert Coordinate3D to Coordinate by taking only longitude and latitude
    const position: Coordinate = [position3D[0], position3D[1]];

    return {
      position,
      size: 300,
      color,
      no: participant.ゼッケン,
      name: participant.氏名,
      category: participant.順位,
    };
  } catch (error) {
    console.error('Error calculating position:', error);
    return null;
  }
}
