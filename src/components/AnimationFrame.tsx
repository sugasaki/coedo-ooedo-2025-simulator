import { useAnimationStore } from '../store/animation/animationStore';

export const AnimationFrame = () => {
  const { animationFrameValue } = useAnimationStore();

  return (
    <div>
      <div style={{ margin: '0' }} className="text-1x text-gray-500">
        現在のフレーム: {animationFrameValue}
      </div>
    </div>
  );
};
