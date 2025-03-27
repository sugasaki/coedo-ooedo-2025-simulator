import { useStore } from '../store/store';

export const AnimationFrame = () => {
  const { animationFrameValue } = useStore();

  return (
    <div>
      <div style={{ margin: '0' }} className="text-1x text-gray-500">
        現在のフレーム: {animationFrameValue}
      </div>
    </div>
  );
};
