import { useAppStore } from '../store';
import { MenuOutlined } from '@ant-design/icons';

export const DrawerOpenLeftButton = () => {
  const { setIsLeftDrawerMenuOpen } = useAppStore();

  return (
    <div className="fixed top-2 left-2 z-10">
      <MenuOutlined
        style={{ fontSize: '18px', color: '#fff' }}
        onClick={() => setIsLeftDrawerMenuOpen(true)}
      />
    </div>
  );
};
