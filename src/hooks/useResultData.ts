import { useStore } from '../store/store';
import { getPositionAtDistance } from '../utils/pathUtils';
// import { createData } from '../utils/raceData';
import { getDistanceAtTime } from '../utils/timeUtils';
import { courseData } from '../utils/mapDataLoader';

export const useResultData = () => {
  const { raceData, setPersonLocationData } = useStore();

  const createResultData = (time: number): any => {
    // const result = createData(raceData, time);
    // console.log(time, 'time');

    // console.log(raceData, 'raceData');
    const resultA = raceData[0].results[0];
    // console.log(resultA, 'resultA');

    const thisTime = time * 2;

    const length = getDistanceAtTime(resultA, thisTime);
    // console.log(length, 'length');

    if (length === null) {
      console.error('Calculated length is null');
      return;
    }

    const LengthMeter = length * 1000;

    const position = getPositionAtDistance(courseData, LengthMeter);
    // console.log(position, 'position');
    if (position === null) {
      console.error('Calculated length is null');
      return;
    }

    // サンプルデータ
    const data = [{ position: [position[0], position[1]], size: 500 }];

    setPersonLocationData(data);

    // setPersonLocationData(data);
  };

  return { createResultData };
};
