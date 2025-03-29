import {
  BorderOuterOutlined,
  CaretRightOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons';
import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { useAnimationStore } from '../store/animation/animationStore';
import { useRaceStore } from '../store/race/raceStore';
import { Button } from 'antd';

export const AnimationControls = () => {
  const { playingStart, playingStop, setAnimationFrame } = useAnimationStore();
  const { raceInfo } = useRaceStore();
  const { isPlaying } = useAnimationFrame({
    min: 0,
    autoStart: true,
  });

  return (
    <>
      <div style={{ margin: '10px 0' }}>
        <Button
          ghost
          type="primary"
          // shape="circle"
          // color="primary"
          onClick={() => (isPlaying ? playingStop() : playingStart())}
          icon={isPlaying ? <BorderOuterOutlined /> : <CaretRightOutlined />}
          size="small" // large | middle | small
        >
          {isPlaying ? 'Stop' : 'Start'}
        </Button>
        <Button
          ghost
          type="primary"
          onClick={() => setAnimationFrame(raceInfo?.start_unixtime_jst || 0)}
          icon={<DoubleLeftOutlined />}
          size="small" // large | middle | small
        >
          先頭
        </Button>
      </div>
      {/* <div
        style={{
          margin: '0',
          color: isPlaying ? 'green' : 'red',
        }}
      >
        状態: {isPlaying ? '再生中' : '停止中'}
      </div> */}
    </>
  );
};
