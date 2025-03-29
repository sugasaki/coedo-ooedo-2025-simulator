import { useEffect } from 'react';
import {
  fetchAndStoreRaceData,
  fetchAndStoreRaceInfo,
} from '../utils/raceDataLoader';
import { DeckGLMap } from '../components/DeckGLMap';
import { AnimationFrame } from '../components/AnimationFrame';
import { AnimationControls } from '../components/AnimationControls';
import { RaceTimeline } from '../components/RaceTimeline';
import { useResultData } from '../hooks/useResultData';
import { useAnimationStore } from '../store/animation/animationStore';
import { useRaceStore } from '../store/race/raceStore';

const url = './data/results_coedo_ooedo_2025_converted.json';
const race_info_url = './data/race_info.json';

export const Map = () => {
  const { animationFrameValue } = useAnimationStore();
  // createResultData is memoized with useCallback in the useResultData hook
  // to prevent infinite re-renders
  const { createResultData } = useResultData();
  const { setFocusNumberArray } = useRaceStore();

  useEffect(() => {
    // sample
    setFocusNumberArray(['2151', '2114', '5', '1008']);

    (async () => {
      // レース情報を読み込む
      await fetchAndStoreRaceInfo(race_info_url);

      // レースデータを読み込む
      await fetchAndStoreRaceData(url);
    })();
  }, []);

  useEffect(() => {
    // animationFrameValueに応じた各選手の位置情報を計算
    createResultData(animationFrameValue);
  }, [animationFrameValue, createResultData]);

  return (
    <div className="app-container dark:bg-gray-900 dark:text-white">
      {/* Map as background */}
      <div className="map-container">
        <DeckGLMap />
      </div>

      {/* Overlay content */}
      <div className="overlay-container">
        <div className="play-container">
          <AnimationControls />
        </div>

        {/* Timeline at the bottom */}
        <div className="timeline-container">
          <AnimationFrame />
          <RaceTimeline />
        </div>
      </div>
    </div>
  );
};
