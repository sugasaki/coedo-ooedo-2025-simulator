import { Drawer, Space, Button } from 'antd';
import { CategoryFilter } from './CategoryFilter';
import { useAppStore } from '../store';

export const DrawerBottomMenu = () => {
  const { isDrawerMenuOpen, setIsDrawerMenuOpen } = useAppStore();

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
          <CategoryFilter />
        </>
      </Drawer>
    </>
  );
};
