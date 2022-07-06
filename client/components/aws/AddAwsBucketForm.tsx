//components
import { useApi } from '@api';
import { TextInput, PasswordInput, Button } from '@mantine/core';

//types
import { FC, Dispatch, SetStateAction } from 'react';
import { AwsBucket } from '@appTypes/aws';

//utils
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setBuckets: Dispatch<SetStateAction<AwsBucket[]>>;
}

const AddAwsBucketForm: FC<Props> = ({ setOpenModal, setBuckets }) => {
  const { API } = useApi({ method: 'post', url: '/aws/create-bucket' });
  const [Aws_Region, setAws_Region] = useState('');
  const [Aws_Secret_Access_Key, setAws_Secret_Access_Key] = useState('');
  const [Aws_Access_Key_Id, setAws_Access_Key_Id] = useState('');
  const [Aws_Target_Bucket_Name, setAws_Target_Bucket_Name] = useState('');
  const [loading, setLoading] = useState(false);

  const createBucket = async () => {
    try {
      setLoading(true);
      const response = await API({
        body: {
          Aws_Region,
          Aws_Target_Bucket_Name,
          Aws_Access_Key_Id,
          Aws_Secret_Access_Key,
        },
      });
      setOpenModal(false);
      //@ts-ignore
      setBuckets(prevState => [
        ...prevState,
        {
          //@ts-ignore
          _id: response.payload._id,
          Aws_Region,
          Aws_Target_Bucket_Name,
          //@ts-ignore
          createdAt: response.payload.createdAt,
        },
      ]);
    } catch (err) {
      const error = err as { msg: string };
      showNotification({
        title: `Error creating bucket`,
        message: error.msg,
        autoClose: true,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TextInput
        label="Aws Bucket Region (Aws Region)"
        placeholder="example region"
        required
        onChange={e => setAws_Region(e.target.value)}
      />
      <PasswordInput
        label="Aws Secret Access Key"
        placeholder="***************************"
        required
        mt="md"
        onChange={e => setAws_Secret_Access_Key(e.target.value)}
      />
      <TextInput
        label="Aws Access Key Id"
        placeholder="DTUD7697F67R56F7G999G"
        required
        mt="md"
        onChange={e => setAws_Access_Key_Id(e.target.value)}
      />
      <TextInput
        label="Aws Target Bucket Name"
        placeholder="example bucket"
        required
        mt="md"
        onChange={e => setAws_Target_Bucket_Name(e.target.value)}
      />
      <Button
        onClick={createBucket}
        fullWidth
        mt="xl"
        disabled={
          !Aws_Region ||
          !Aws_Secret_Access_Key ||
          !Aws_Access_Key_Id ||
          !Aws_Target_Bucket_Name
        }
        loading={loading}
      >
        Create S3 Bucket
      </Button>
    </>
  );
};

export default AddAwsBucketForm;
