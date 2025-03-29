import { Drawer, Space } from 'antd';
import { useAppStore } from '../store';
import { DrawerMenu } from './DrawerMenu';

export const DrawerLeftMenu = () => {
  const { isLeftDrawerMenuOpen, setIsLeftDrawerMenuOpen } = useAppStore();

  const onClose = () => {
    setIsLeftDrawerMenuOpen(false);
  };

  return (
    <>
      <Drawer
        title="Action Menu"
        placement="left"
        onClose={onClose}
        open={isLeftDrawerMenuOpen}
        width={250}
        extra={<Space></Space>}
      >
        <DrawerMenu />
      </Drawer>
    </>
  );
};
