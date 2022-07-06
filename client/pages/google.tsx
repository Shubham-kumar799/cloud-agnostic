//components
import { NoBucketScreen } from '@components';

//types
import type { NextPage } from 'next';

//utils
import { useState } from 'react';

const Google: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <NoBucketScreen setOpenModal={setOpenModal} service={'Google Cloud'} />
  );
};

export default Google;
