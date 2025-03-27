import { create } from 'zustand';
import { PersonLocation } from '../../types/map';
import { WebMercatorViewport } from 'deck.gl';

interface MapState {
  personLocation: PersonLocation[] | null;
  visibleCategories: number[];
  setPersonLocationData: (data: PersonLocation[] | null) => void;
  setVisibleCategories: (categories: number[]) => void;
  toggleCategoryVisibility: (category: number) => void;
  viewport: WebMercatorViewport;
  setViewport: (value: WebMercatorViewport) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

export const useMapStore = create<MapState>(set => ({
  personLocation: null,
  visibleCategories: [], // Initially all categories are visible (empty array means all visible)
  viewport: new WebMercatorViewport(),
  fontSize: 12,

  setPersonLocationData: data => set({ personLocation: data }),

  setVisibleCategories: categories => set({ visibleCategories: categories }),

  toggleCategoryVisibility: category =>
    set(state => {
      const isCurrentlyVisible = state.visibleCategories.includes(category);

      if (isCurrentlyVisible) {
        // Remove category from visible list
        return {
          visibleCategories: state.visibleCategories.filter(
            c => c !== category
          ),
        };
      } else {
        // Add category to visible list
        return {
          visibleCategories: [...state.visibleCategories, category],
        };
      }
    }),

  setViewport: (value: WebMercatorViewport) => set({ viewport: value }),

  setFontSize: size => set({ fontSize: size }),
}));
