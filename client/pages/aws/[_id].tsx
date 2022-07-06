//components
import { BucketHeader, AppDrawer, BucketObjectList } from '@components';
import { Center, Loader } from '@mantine/core';

//types
import type { NextPage } from 'next';

//utils
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useApi } from '@api';
import { showNotification } from '@mantine/notifications';
import { AwsBucket } from '@appTypes/aws';
import Dropzone from '@components/aws/Dropzone';

const Bucket: NextPage = () => {
  const router = useRouter();
  const { _id } = router.query;
  const { API } = useApi({
    method: 'get',
    url: `/aws/bucket-info-and-contents/${_id}`,
  });
  const [bucketInfo, setBucketInfo] = useState<AwsBucket>({
    createdAt: 'loading...',
    Aws_Region: 'loading...',
    _id: 'loading...',
    Aws_Target_Bucket_Name: 'loading...',
  });
  const [bucketObjects, setBucketObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const fetchBucketInfo = async () => {
      try {
        setLoading(true);
        const response = await API({});
        console.log('reponse', response);
        //@ts-ignore
        setBucketInfo(response.payload.bucket);
        //@ts-ignore
        setBucketObjects(response.payload.bucketObjects);
      } catch (err) {
        const error = err as { msg: string; success: boolean };
        showNotification({
          title: `Error`,
          message: error.msg,
          autoClose: true,
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBucketInfo();
  }, []);

  if (loading) {
    return (
      <Center style={{ height: '90vh' }}>
        <Loader size={'md'} />
      </Center>
    );
  }
  return (
    <>
      <AppDrawer title={'Upload'} opened={openDrawer} setOpened={setOpenDrawer}>
        <Dropzone bucketId={_id as string} />
      </AppDrawer>
      <div>
        <BucketHeader setOpenDrawer={setOpenDrawer} bucket={bucketInfo} />

        <BucketObjectList
          bucketId={bucketInfo._id}
          bucketObjects={bucketObjects}
        />
      </div>
    </>
  );
};

export default Bucket;
