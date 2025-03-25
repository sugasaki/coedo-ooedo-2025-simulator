import { getPositionAtDistance } from '../utils/pathUtils';
import { getDistanceAtTime } from '../utils/timeUtils';
import { Scatterplot2D } from '../types/scatterplot';
import { ConvertedRaceParticipant, ConvertedRaceData } from '../types/race';
import { featureData } from '../utils/mapDataLoader';
import { categoryToColor, } from './colorTable';
import { Coordinate } from '../types/geo';

export const createData = (raceData: ConvertedRaceData, time: number): Scatterplot2D[] => {
  try {
    const thisTime = time * 2;

    return raceData.flatMap((category) => {
      const color = categoryToColor(category.category);

      return category.results
        .map((participant: ConvertedRaceParticipant) => getPosition(featureData, participant, thisTime, color))
        .filter((position: Scatterplot2D | null): position is Scatterplot2D => position !== null);
    });
  } catch (error) {
    console.error('Error creating race data:', error);
    return [];
  }
};

function getPosition(
  feature: any,
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