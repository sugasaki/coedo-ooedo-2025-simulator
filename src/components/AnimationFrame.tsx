import { useStore } from '../store/store';
import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { AnimationControls } from './AnimationControls';

interface Props {
  min: number;
}

export const AnimationFrame = ({ min = 0 }: Props) => {
  const { isPlaying } = useAnimationFrame({
    min,
    autoStart: false,
  });

  const animationFrameValue = useStore(state => state.animationFrameValue);

  return (
    <div>
      <div style={{ fontSize: '24px', margin: '20px 0' }}>
        現在のフレーム: {animationFrameValue}
      </div>
      <div
        style={{
          fontSize: '16px',
          margin: '10px 0',
          color: isPlaying ? 'green' : 'red',
        }}
      >
        状態: {isPlaying ? '再生中' : '停止中'}
      </div>
      <AnimationControls />
    </div>
  );
};
