//compnents
import { Modal } from '@mantine/core';

//types
import { FC, Dispatch, SetStateAction, ReactNode } from 'react';

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
  size?: string;
}

const AppDrawer: FC<Props> = ({
  opened,
  setOpened,
  children,
  title,
  size = 'md',
}) => {
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      title={title}
      padding="xl"
      size={size}
    >
      {children}
    </Modal>
  );
};

export default AppDrawer;
