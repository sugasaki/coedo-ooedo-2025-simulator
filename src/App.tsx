import { useEffect } from 'react';
import { RaceDataViewer } from './components/RaceDataViewer';
import { fetchAndStoreRaceData } from './utils/raceDataLoader';
import { DeckGLMap } from './components/DeckGLMap';
import './App.css';
import { AnimationFrame } from './components/AnimationFrame';

const url = './data/results_coedo_ooedo_2025_short.json';

function App() {
  useEffect(() => {
    fetchAndStoreRaceData(url);
  }, []);

  return (
    <div className="p-8 space-y-12 dark:bg-gray-900 dark:text-white">
      <div className="text-3xl font-bold dark:text-white">
        小江戸大江戸2025シミュレーター
      </div>

      <h2 className="text-3xl font-bold dark:text-white">アニメーション制御</h2>
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <AnimationFrame min={0} />
      </div>

      {/* 地図コンポーネント */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold dark:text-white mb-4">コース地図</h2>
        {/* <MapComponent height="500px" /> */}
        <DeckGLMap />
      </div>

      <h2 className="text-3xl font-bold dark:text-white">レースデータ</h2>

      <div className="mt-8">
        <RaceDataViewer />
      </div>
    </div>
  );
}

export default App;
