//components
import { ActionIcon, Paper, Text, Button, NumberInput } from '@mantine/core';

//icons
import { BiDownload } from 'react-icons/bi';

//types
import { FC } from 'react';

//utils
import { useState } from 'react';
import { createStyles } from '@mantine/core';
import { useApi } from '@api';
import { showNotification } from '@mantine/notifications';
import { AppDrawer } from '@components/ui';

const useStyles = createStyles(theme => ({
  container: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
  },
}));

interface Props {
  object: any;
  bucketId: string;
}

const BucketObject: FC<Props> = ({ object, bucketId }) => {
  const { classes } = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [duration, setDuration] = useState(1);
  const [downloadUrl, setDownloadUrl] = useState('');
  const { API: getDownloadUrl } = useApi({
    method: 'post',
    url: `/aws/${bucketId}/getDownloadUrl`,
  });

  const { API } = useApi({
    method: 'post',
    url: `/aws/${bucketId}/download`,
  });
  const download = async () => {
    try {
      await API({
        body: {
          key: object.Key,
        },
      });
    } catch (error) {
      console.log('error', error);
      showNotification({
        title: `Some Error Occured`,
        message: '',
        autoClose: true,
        color: 'red',
      });
    }
  };

  const handleGetDownloadUrl = async () => {
    try {
      const response = await getDownloadUrl({
        body: {
          key: object.Key,
          duration,
        },
      });

      //@ts-ignore
      setDownloadUrl(response.payload);
    } catch (error) {
      console.log('error', error);
      showNotification({
        title: `Some Error Occured`,
        message: '',
        autoClose: true,
        color: 'red',
      });
    }
  };

  return (
    <>
      <AppDrawer
        opened={openModal}
        setOpened={setOpenModal}
        size="md"
        onClose={() => setDownloadUrl('')}
        title="Get Download Url"
      >
        <NumberInput
          label={'Link active for (in hours)'}
          value={duration}
          required
          onChange={val => setDuration(val as number)}
        />
        <Button onClick={() => handleGetDownloadUrl()} fullWidth mt={10}>
          Get link
        </Button>

        {downloadUrl && (
          <Paper>
            <a href={downloadUrl}>{downloadUrl}</a>
          </Paper>
        )}
      </AppDrawer>
      <Paper className={classes.container}>
        <Text>{object.Key}</Text>
        <div className={classes.buttonContainer}>
          <Button variant="light" onClick={() => setOpenModal(true)}>
            Get download url{' '}
          </Button>
          {/* <ActionIcon onClick={() => download()} color="blue" variant="light">
            <BiDownload />
          </ActionIcon> */}
        </div>
      </Paper>
    </>
  );
};

export default BucketObject;
