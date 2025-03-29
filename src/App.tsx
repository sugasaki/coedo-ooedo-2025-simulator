import { Map } from './components/Map';
import { DrawerBottomMenu } from './components/DrawerBottomMenu';
import { QueryParamHandler } from './components/QueryParamHandler';
import { DrawerOpenButton } from './components/DrawerOpenButton';
import './App.css';

function App() {
  return (
    <>
      {/* QueryParamHandler to handle URL parameters */}
      <QueryParamHandler />
      <DrawerBottomMenu />

      <DrawerOpenButton />

      <Map />

      {/* Overlay content */}
      <div className="overlay-container">
        {/* Header */}
        <div className="header">
          <div className="text-1xl font-bold text-gray-500">
            小江戸大江戸2025
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
