import './App.css';
import { RaceDataViewer } from './components/RaceDataViewer';

function App() {
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
