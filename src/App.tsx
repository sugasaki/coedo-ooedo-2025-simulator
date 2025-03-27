import { useEffect } from 'react';
import {
  fetchAndStoreRaceData,
  fetchAndStoreRaceInfo,
} from './utils/raceDataLoader';
import { DeckGLMap } from './components/DeckGLMap';
import { AnimationFrame } from './components/AnimationFrame';
import { AnimationControls } from './components/AnimationControls';
import { RaceTimeline } from './components/RaceTimeline';
import { useStore } from './store/store';
import './App.css';
import { useResultData } from './hooks/useResultData';

const url = './data/results_coedo_ooedo_2025_converted.json';
const race_info_url = './data/race_info.json';

function App() {
  const { animationFrameValue } = useStore();
  const { createResultData } = useResultData();

  useEffect(() => {
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
  }, [animationFrameValue]);

  return (
    <div className="app-container dark:bg-gray-900 dark:text-white">
      {/* Map as background */}
      <div className="map-container">
        <DeckGLMap />
      </div>

      {/* Overlay content */}
      <div className="overlay-container">
        {/* Header */}
        <div className="header">
          <div className="text-1xl font-bold text-gray-500">
            小江戸大江戸2025
          </div>
        </div>

        {/* Controls */}
        <div className="control-panel">
          <AnimationFrame />
        </div>

        <div className="play-container">
          <AnimationControls />
        </div>

        {/* Timeline at the bottom */}
        <div className="timeline-container">
          <RaceTimeline />
        </div>
      </div>
    </div>
  );
}

export default App;
