import { useAppStore } from '../store';
import { MenuOutlined } from '@ant-design/icons';

export const DrawerOpenLeftButton = () => {
  const { setIsLeftDrawerMenuOpen } = useAppStore();

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    // クリックイベントの伝播を止めてズームを防止
    e.preventDefault();
    e.stopPropagation();
    setIsLeftDrawerMenuOpen(true);
  };

  return (
    <div className="fixed top-2 left-2 z-10">
      <MenuOutlined
        style={{ fontSize: '18px', color: '#fff' }}
        onClick={handleClick}
        onTouchEnd={handleClick}
      />
    </div>
  );
};
