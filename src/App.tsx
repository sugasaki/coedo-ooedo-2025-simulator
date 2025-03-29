import { Map } from './components/Map';
import { DrawerBottomMenu } from './components/DrawerBottomMenu';
import { QueryParamHandler } from './components/QueryParamHandler';
import { DrawerOpenButton } from './components/DrawerOpenButton';
import './App.css';
import { Title } from './components/Title';

function App() {
  return (
    <>
      {/* QueryParamHandler to handle URL parameters */}
      <QueryParamHandler />

      <DrawerOpenButton />
      <DrawerBottomMenu />

      <Title />

      <Map />
    </>
  );
}

export default App;
