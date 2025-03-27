import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { useStore } from '../store/store';
import { Button } from 'antd';

export const AnimationControls = () => {
  const { playingStart, playingStop, setAnimationFrame, raceInfo } = useStore();
  const { isPlaying } = useAnimationFrame({
    min: 0,
    autoStart: true,
  });

  return (
    <>
      <div style={{ margin: '10px 0' }}>
        <Button
          color={isPlaying ? 'purple' : 'primary'}
          variant="solid"
          onClick={() => (isPlaying ? playingStop() : playingStart())}
          style={{
            marginRight: '10px',
          }}
        >
          {isPlaying ? 'ストップ' : 'スタート'}
        </Button>
        <Button
          color="danger"
          variant="solid"
          onClick={() => setAnimationFrame(raceInfo?.start_unixtime_jst || 0)}
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
