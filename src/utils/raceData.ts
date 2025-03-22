import { getPositionAtDistance } from '../utils/pathUtils';
import { getDistanceAtTime } from '../utils/timeUtils';
import { courseData } from '../utils/mapDataLoader';
import { Scatterplot2D } from '../types/scatterplot';

export const createData = (raceData: any, time: number): Scatterplot2D[] => {
  // console.log(time, 'time');
  // console.log(raceData, 'raceData');
  // console.log(time, 'time');
  //   if (!sp) return [];

  try {
    // console.log(raceData, 'raceData');
    const resultA = raceData[0].results[0];
    // console.log(resultA, 'resultA');
    const thisTime = time * 2;

    const length = getDistanceAtTime(resultA, thisTime);
    // console.log(length, 'length');
    if (length === null) {
      console.error('Calculated length is null');
      return [];
    }

    const LengthMeter = length * 1000;

    // courseDataをGeoJSON型にキャストして渡す
    const position = getPositionAtDistance(courseData.features[0], LengthMeter);
    // console.log(position, 'position');
    if (position === null) {
      console.error('Calculated position is null');
      return [];
    }

    // サンプルデータ
    const data1: Scatterplot2D = {
      position: [position[0], position[1]],
      size: 500,
      color: [255, 0, 0],
    };

    const data = [data1];
    return data;
  } catch {
    console.error('raceData is null');
    return [];
  }

  //   // 座標を計算
  //   const returndata = iconPersonData
  //     .map((person: PersonResultParent) => {
  //       return calcResult(person, time);
  //     })
  //     .filter((d): d is PersonInfoType => d !== null && d !== undefined);

  //   // console.log(returndata, 'returndata');
  //   setPersonLocationData(returndata);
  //   console.log(time);
};
