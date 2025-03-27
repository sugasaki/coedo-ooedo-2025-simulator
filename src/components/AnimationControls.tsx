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
          type="primary"
          onClick={() => playingStart()}
          disabled={isPlaying}
          style={{
            marginRight: '10px',
            backgroundColor: isPlaying ? undefined : '#4CAF50',
            borderColor: isPlaying ? undefined : '#4CAF50',
            fontSize: '11px',
          }}
          size="small"
        >
          スタート
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => playingStop()}
          disabled={!isPlaying}
          style={{
            marginRight: '10px',
            fontSize: '11px',
          }}
          size="small"
        >
          ストップ
        </Button>
        <Button
          type="primary"
          onClick={() => setAnimationFrame(raceInfo?.start_unixtime_jst || 0)}
          style={{
            backgroundColor: '#00aeff',
            borderColor: '#00aeff',
            fontSize: '11px',
          }}
          size="small"
        >
          リセット
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
