import { create } from 'zustand';
import { PersonLocation } from '../../types/map';

// Define a more specific type for person location data
// interface PersonLocation {
//   id: string;
//   latitude: number;
//   longitude: number;
//   timestamp: number;
//   [key: string]: any; // For any additional properties
// }

type MapState = {
  personLocation: PersonLocation[] | null;
};

export const useMapStore = create<
  MapState & {
    setPersonLocationData: (value: PersonLocation[]) => void;
  }
>(set => ({
  personLocation: null,
  setPersonLocationData: (value: PersonLocation[]) => set({ personLocation: value }),
}));
