import { useEffect } from 'react';
import { fetchAndStoreRaceData } from './utils/raceDataLoader';
import { DeckGLMap } from './components/DeckGLMap';
import { AnimationFrame } from './components/AnimationFrame';
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
    <div className="p-8 dark:bg-gray-900 dark:text-white">
      <div className="text-3xl font-bold dark:text-white">
        小江戸大江戸2025シミュレーター
      </div>

      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <AnimationFrame min={0} />
      </div>

      {/* 地図コンポーネント */}
      <div className="mt-0">
        <DeckGLMap />
      </div>

      <div className="mt-0 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <TimelineControl min={0} max={69660} />
      </div>
    </div>
  );
}

export default App;
