//compnents
import { Drawer } from '@mantine/core';

//types
import { DrawerPosition } from '@mantine/core';
import { FC, Dispatch, SetStateAction, ReactNode } from 'react';

//utils
import { useMantineTheme } from '@mantine/core';

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
  position?: DrawerPosition;
  size?: string;
  onClose?: () => void;
}

const AppDrawer: FC<Props> = ({
  opened,
  setOpened,
  children,
  title,
  position = 'right',
  size = 'xl',
  onClose,
}) => {
  const theme = useMantineTheme();
  return (
    <Drawer
      opened={opened}
      onClose={() => {
        setOpened(false);
        if (onClose) {
          onClose();
        }
      }}
      title={title}
      padding="xl"
      size={size}
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      position={position}
      closeOnClickOutside={false}
    >
      {children}
    </Drawer>
  );
};

export default AppDrawer;
