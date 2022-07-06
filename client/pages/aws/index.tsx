//components
import {
  AppModal,
  AddAwsBucketForm,
  NoBucketScreen,
  BucketList,
  BucketsPageHeader,
} from '@components';

//types
import type { NextPage } from 'next';
import { AwsBucket } from '@appTypes/aws';

//utils
import { showNotification } from '@mantine/notifications';
import { selectUser, useAppSelector } from '@store';
import { useEffect, useState } from 'react';
import { useApi } from '@api';
import { Loader, Center } from '@mantine/core';

const Aws: NextPage = () => {
  const { API } = useApi({ method: 'get', url: '/aws/get-buckets' });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buckets, setBuckets] = useState<AwsBucket[]>([]);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        setLoading(true);
        const response = await API({});
        //@ts-ignore
        setBuckets(response.payload);
        //@ts-ignore
      } catch (err) {
        const error = err as { msg: string; success: boolean };
        console.log('email', user.email);
        console.log('Error', err);
        showNotification({
          title: `Error fetching buckets`,
          message: error.msg,
          autoClose: true,
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    if (user.email) {
      fetchBuckets();
    }
  }, [user.email]);

  if (loading) {
    return (
      <Center style={{ height: '90vh' }}>
        <Loader size={'md'} />
      </Center>
    );
  }

  return (
    <>
      <AppModal
        opened={openModal}
        setOpened={setOpenModal}
        title="Set up your Aws S3 bucket"
      >
        <AddAwsBucketForm setBuckets={setBuckets} setOpenModal={setOpenModal} />
      </AppModal>
      {buckets.length > 0 ? (
        <>
          <BucketsPageHeader service="AWS S3" setOpenModal={setOpenModal} />
          <BucketList setBuckets={setBuckets} bucketList={buckets} />
        </>
      ) : (
        <NoBucketScreen setOpenModal={setOpenModal} service="Aws" />
      )}
    </>
  );
};

export default Aws;
