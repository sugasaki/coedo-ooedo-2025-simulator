import { Drawer, Space, Button, Switch, Divider, Slider } from 'antd';
import { CategoryFilter } from './CategoryFilter';
import { useAppStore } from '../store';
import { useMapStore } from '../store';
import { useAnimationStore } from '../store';
import { FocusNumberInput } from './FocusNumberInput';

export const DrawerBottomMenu = () => {
  const { isDrawerMenuOpen, setIsDrawerMenuOpen } = useAppStore();
  const {
    isTextLayerVisible,
    toggleTextLayerVisibility,
    pointSize,
    setPointSize,
    fontSize,
    setFontSize,
  } = useMapStore();

  const { animationSpeed, setAnimationSpeed } = useAnimationStore();

  const onClose = () => {
    setIsDrawerMenuOpen(false);
  };

  return (
    <>
      <Drawer
        title="Action Menu"
        placement="bottom"
        onClose={onClose}
        open={isDrawerMenuOpen}
        height={300}
        extra={
          <Space>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <>
          <Divider orientation="center">検索</Divider>

          <FocusNumberInput />

          <Divider orientation="center">カテゴリー</Divider>

          <CategoryFilter />

          <Divider orientation="center">名前表示</Divider>

          <div className="mb-4">
            <div className="flex items-center gap-4 mb-2">
              <span>名前表示</span>
              <Switch
                checked={isTextLayerVisible}
                onChange={toggleTextLayerVisibility}
                checkedChildren="ON"
                unCheckedChildren="OFF"
              />
            </div>

            <Divider orientation="center">ボールサイズ</Divider>

            <div className="mb-4">
              <Slider
                min={5}
                max={400}
                value={pointSize}
                onChange={setPointSize}
                // marks={{
                //   50: '特小',
                //   100: '小',
                //   200: '中',
                //   350: '大',
                //   500: '特大',
                // }}
              />
            </div>

            <Divider orientation="center">フォントサイズ</Divider>

            <div className="mb-4">
              <Slider
                min={8}
                max={24}
                value={fontSize}
                onChange={setFontSize}
                // marks={{
                //   8: '小',
                //   12: '中',
                //   16: '大',
                //   20: '特大',
                //   24: '極大',
                // }}
              />
            </div>

            <Divider orientation="center">アニメーション速度</Divider>

            <div className="mb-4">
              <Slider
                min={1}
                max={50}
                value={animationSpeed}
                onChange={setAnimationSpeed}
                marks={{
                  1: '遅い',
                  10: '普通',
                  30: '速い',
                  50: '最速',
                }}
              />
            </div>
          </div>
        </>
      </Drawer>
    </>
  );
};
