import { useStore } from '../store/store';
import { createData } from '../utils/raceData';

export const useResultData = () => {
  const { raceData, setPersonLocationData } = useStore();

  const createResultData = (time: number): any => {
    // const result = createData(raceData, time);

    const data = [
      [139.27528, 35.97901, 110.0],
      [139.27528, 35.9793, 114.0],
      [139.27528, 35.97961, 119.0],
      [139.27564, 35.97962, 121.0],
      [139.276, 35.97962, 121.0],
    ];

    console.log(data, 'data');

    setPersonLocationData(data);
  };

  return { createResultData };
};
