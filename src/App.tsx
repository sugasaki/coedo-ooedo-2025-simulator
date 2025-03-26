import { useEffect } from 'react';
import { fetchAndStoreRaceData } from './utils/raceDataLoader';
import { DeckGLMap } from './components/DeckGLMap';
import { AnimationFrame } from './components/AnimationFrame';
import { AnimationControls } from './components/AnimationControls';
import { TimelineControl } from './components/TimelineControl';
import { useStore } from './store/store';
import './App.css';
import { useResultData } from './hooks/useResultData';

// const url = './data/results_coedo_ooedo_2025_short.json';
const url = './data/results_coedo_ooedo_2025_converted.json';

function App() {
  const { animationFrameValue, setAnimationFrameMax } = useStore();
  const { createResultData } = useResultData();

  useEffect(() => {
    setAnimationFrameMax(129600);

    (async () => {
      console.log(url, 'url');
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
          <AnimationFrame min={0} />
        </div>

        <div className="play-container">
          <AnimationControls />
        </div>

        {/* Timeline at the bottom */}
        <div className="timeline-container">
          <TimelineControl
            min={0}
            max={69660}
            height="60px"
            customTimeColor="#FF5733"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
