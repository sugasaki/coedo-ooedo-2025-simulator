import { Drawer, Space, Button, Switch, Divider, Slider } from 'antd';
import { CategoryFilter } from './CategoryFilter';
import { useAppStore } from '../store';
import { useMapStore } from '../store';

export const DrawerBottomMenu = () => {
  const { isDrawerMenuOpen, setIsDrawerMenuOpen } = useAppStore();
  const {
    isTextLayerVisible,
    toggleTextLayerVisibility,
    pointSize,
    setPointSize,
  } = useMapStore();

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
        extra={
          <Space>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <>
          <div className="mb-4">
            <Divider orientation="left">表示設定</Divider>
            <div className="flex items-center gap-4 mb-2">
              <span>名前表示</span>
              <Switch
                checked={isTextLayerVisible}
                onChange={toggleTextLayerVisibility}
                checkedChildren="ON"
                unCheckedChildren="OFF"
              />
            </div>

            <div className="mb-4">
              <div className="mb-1">ポイントサイズ</div>
              <Slider
                min={50}
                max={500}
                value={pointSize}
                onChange={setPointSize}
                marks={{
                  50: '特小',
                  100: '小',
                  200: '中',
                  350: '大',
                  500: '特大',
                }}
              />
            </div>
          </div>

          <Divider orientation="left"></Divider>
          <CategoryFilter />
        </>
      </Drawer>
    </>
  );
};
