import { useStore } from '../store/store';
import { createData } from '../utils/raceData';

export const useResultData = () => {
  const { raceData, setPersonLocationData } = useStore();

  const createResultData = (time: number): any => {
    if (!raceData || raceData == null) return null;

    const result = createData(raceData, time);
    setPersonLocationData(result);
  };

  return { createResultData };
};
