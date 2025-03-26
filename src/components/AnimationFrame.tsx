import { useStore } from '../store/store';

interface Props {
  // min: number;
}

export const AnimationFrame = ({ }: Props) => {
  // const { isPlaying } = useAnimationFrame({
  //   min,
  //   autoStart: false,
  // });

  const animationFrameValue = useStore(state => state.animationFrameValue);

  return (
    <div>
      <div style={{ margin: '0' }} className="text-1x text-gray-500">
        現在のフレーム: {animationFrameValue}
      </div>
      {/* <div
        style={{
          margin: '0',
          color: isPlaying ? 'green' : 'red',
        }}
      >
        状態: {isPlaying ? '再生中' : '停止中'}
      </div> */}
    </div>
  );
};
