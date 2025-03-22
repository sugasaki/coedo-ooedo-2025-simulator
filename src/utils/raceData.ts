import { getPositionAtDistance } from '../utils/pathUtils';
import { getDistanceAtTime } from '../utils/timeUtils';
import { Scatterplot2D } from '../types/scatterplot';
import { ConvertedRaceParticipant } from '../types/race';
import { featureData } from '../utils/mapDataLoader';
import { categoryToColor, getRandomColor } from './colorTable';

export const createData = (raceData: any, time: number): Scatterplot2D[] => {
  try {
    // console.log(raceData, 'raceData');
    const thisTime = time * 2;

    const data = [];

    raceData.forEach((item: any) => {
      const categoryName = item.category;
      // console.log(categoryName, 'categoryName');

      const color = categoryToColor(categoryName);
      // const color = getRandomColor(10);
      item.results.forEach((result: any) => {
        const position = getPosition(
          featureData,
          result,
          thisTime,
          color
        );
        data.push(position);
      });
    });

    // const item = raceData[1];
    // const categoryName = item.category;
    // // console.log(categoryName, 'categoryName');
    // const color = categoryToColor(categoryName);
    // // const color = getRandomColor(10);
    // item.results.forEach((result: any) => {
    //   const position = getPosition(
    //     featureData,
    //     result,
    //     thisTime,
    //     color
    //   );
    //   data.push(position);
    // });


    // const findResult = item.results.find((result) => result.ゼッケン == 114)
    // // console.log(findResult, 'findResult');
    // // console.log(findResult.result, 'findResult.result');

    // const position = getPosition(
    //   featureData,
    //   findResult.result,
    //   thisTime,
    //   color
    // );
    // data.push(position);


    // console.log(data, 'data');
    return data.filter((d): d is Scatterplot2D => d !== null);
  } catch (error) {
    console.error('raceData is null', error);
    return [];
  }
};

function getPosition(
  feature: any,
  resultA: ConvertedRaceParticipant,
  time: number,
  color: number[]
) {
  try {
    // console.log(time, 'time');
    // console.log(resultA, 'resultA');
    const length = getDistanceAtTime(resultA.result, time);
    // console.log(length, 'length');
    if (length === null) {
      // console.error('Calculated length is null');
      // console.log(time, 'time');
      // console.log(resultA, 'resultA');
      return null;
    }

    const LengthMeter = length * 1000;

    // courseDataをGeoJSON型にキャストして渡す
    const position = getPositionAtDistance(feature, LengthMeter);
    // console.log(position, 'position');
    if (position === null) {
      console.error('Calculated position is null');
      return null;
    }

    // データ作成
    const data1: Scatterplot2D = {
      position: position,
      size: 300,
      // color: [255,0,0],
      color: color,
      no: resultA.ゼッケン,
      name: resultA.氏名,
      category: resultA.順位,
    };

    return data1;
  } catch (error) {
    console.error('Error in getPosition', error);
    return null;
  }
}