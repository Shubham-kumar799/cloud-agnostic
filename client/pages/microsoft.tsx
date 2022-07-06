//compnents
import { NoBucketScreen, AppModal } from '@components';

//types
import type { NextPage } from 'next';

//utils
import { useState } from 'react';

const Microsoft: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <AppModal
        opened={openModal}
        setOpened={setOpenModal}
        title="This is title"
      >
        <div>This is body</div>
      </AppModal>
      <NoBucketScreen
        setOpenModal={setOpenModal}
        service={'Microsoft Azure Blob'}
      />
    </>
  );
};

export default Microsoft;
