import { FC, useState } from 'react';
import {
  Text,
  Group,
  createStyles,
  MantineTheme,
  useMantineTheme,
  Divider,
  Button,
} from '@mantine/core';
import {
  Dropzone as MantineDropzone,
  DropzoneStatus,
  MIME_TYPES,
} from '@mantine/dropzone';
import { IoIosCloudUpload } from 'react-icons/io';
import SingleFilePreview from './SingleFilePreview';
import { showNotification } from '@mantine/notifications';
import { useApi } from '@api';

const useStyles = createStyles(theme => ({
  wrapper: {},

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,

    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
  buttonContainer: {
    position: 'absolute',
    width: '90%',
    bottom: 10,
  },
  fileContainer: {
    overflow: 'auto',
    height: '300px',
    margin: 10,
  },
}));

function getActiveColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.black;
}

interface Props {
  bucketId: string;
}

const Dropzone: FC<Props> = ({ bucketId }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { API } = useApi({ method: 'post', url: `/aws/${bucketId}/upload` });

  const upload = async () => {
    try {
      setLoading(true);
      const fileData = new FormData();
      for (let i = 0; i < acceptedFiles.length; i++) {
        fileData.append('files', acceptedFiles[i], acceptedFiles[i].name);
      }
      await API({ body: fileData });
      showNotification({
        title: `Upload successful`,
        message: '',
        autoClose: true,
        color: 'green',
      });
      setAcceptedFiles([]);
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

  return (
    <div className={classes.wrapper}>
      <MantineDropzone
        onDrop={files => setAcceptedFiles(files)}
        onReject={files => console.log('rejected files', files)}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf, MIME_TYPES.csv, MIME_TYPES.docx]}
        maxSize={30 * 1024 ** 2}
      >
        {status => (
          <div style={{ pointerEvents: 'none' }}>
            <Group position="center">
              <IoIosCloudUpload
                size={50}
                color={getActiveColor(status, theme)}
              />
            </Group>
            <Text
              align="center"
              weight={700}
              size="lg"
              mt="xl"
              sx={{ color: getActiveColor(status, theme) }}
            >
              {status.accepted
                ? 'Drop files here'
                : status.rejected
                ? 'Pdf file less than 30mb'
                : 'Upload files to bucket'}
            </Text>
            {acceptedFiles.length == 0 ? (
              <Text align="center" size="sm" mt="xs" color="dimmed">
                Drag&apos;n&apos;drop files here to upload. We can accept only{' '}
                <i>.pdf .csv and .docx</i> files that are less than 30mb in
                size.
              </Text>
            ) : (
              <Text align="center">{acceptedFiles.length} files selected</Text>
            )}
          </div>
        )}
      </MantineDropzone>
      <Divider mt={10} mb={10} />
      <div className={classes.fileContainer}>
        {acceptedFiles.map(file => (
          <SingleFilePreview setAcceptedFiles={setAcceptedFiles} file={file} />
        ))}
      </div>
      <div className={classes.buttonContainer}>
        <Button
          fullWidth
          loading={loading}
          disabled={acceptedFiles.length == 0}
          leftIcon={<IoIosCloudUpload />}
          onClick={() => upload()}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Dropzone;
