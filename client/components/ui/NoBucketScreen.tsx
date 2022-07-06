//components
import SetupStorageHero from './SetupStorageHero';

//types
import { FC, Dispatch, SetStateAction } from 'react';

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  service: string;
}

const NoBucketScreen: FC<Props> = ({ setOpenModal, service }) => {
  return (
    <div
      style={{
        height: '90vh',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <SetupStorageHero service={service} setModal={setOpenModal} />
    </div>
  );
};

export default NoBucketScreen;
