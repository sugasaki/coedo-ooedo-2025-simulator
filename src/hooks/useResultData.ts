import { useStore } from '../store/store';
import { createData } from '../utils/raceData';

export const useResultData = () => {
  const { raceData, setPersonLocationData, raceInfo } = useStore();

  const createResultData = (time: number): any => {
    if (!raceData || raceData == null) return null;
    if (!raceInfo || raceInfo == null) return null;

    const result = createData(raceData, time, raceInfo);
    setPersonLocationData(result);
  };

  return { createResultData };
};
