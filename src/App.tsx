import { useEffect } from 'react';
import './App.css';
import { RaceDataViewer } from './components/RaceDataViewer';
import { fetchAndStoreRaceData } from './utils/raceDataLoader';

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

      <h2 className="text-3xl font-bold dark:text-white">レースデータ</h2>

      <div className="mt-16">
        <RaceDataViewer />
      </div>
    </div>
  );
}

export default App;
