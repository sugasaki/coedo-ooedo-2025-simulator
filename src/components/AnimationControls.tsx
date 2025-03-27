import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { useStore } from '../store/store';

export const AnimationControls = () => {
  const { playingStart, playingStop } = useStore();
  const { isPlaying } = useAnimationFrame({
    min: 0,
    autoStart: true,
  });

  return (
    <>
      <div style={{ margin: '10px 0' }}>
        <button
          onClick={() => playingStart()}
          disabled={isPlaying}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            backgroundColor: isPlaying ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPlaying ? 'default' : 'pointer',
            fontSize: '11px',
          }}
        >
          スタート
        </button>
        <button
          onClick={() => playingStop()}
          disabled={!isPlaying}
          style={{
            padding: '8px 16px',
            backgroundColor: !isPlaying ? '#ccc' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: !isPlaying ? 'default' : 'pointer',
            fontSize: '11px',
          }}
        >
          ストップ
        </button>
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
