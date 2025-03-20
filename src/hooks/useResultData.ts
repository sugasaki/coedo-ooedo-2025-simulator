import { useStore } from '../store/store';
// import { createData } from '../utils/raceData';

export const useResultData = () => {
  const { raceData, setPersonLocationData } = useStore();

  const createResultData = (time: number): any => {
    // const result = createData(raceData, time);

    // サンプルデータ
    const data = [
      { position: [139.7528, 35.6852], size: 100 },
      { position: [139.7628, 35.6952], size: 100 },
      { position: [139.7428, 35.6752], size: 100 },
    ];

    console.log(data, 'data');

    setPersonLocationData(data);
  };

  return { createResultData };
};
