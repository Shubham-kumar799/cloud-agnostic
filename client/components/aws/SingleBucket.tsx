//components
import { Group, Paper, Text, ActionIcon } from '@mantine/core';

//icons
import { SiAmazons3 } from 'react-icons/si';
import { MdDelete } from 'react-icons/md';

//types
import { FC, Dispatch, SetStateAction } from 'react';
import { AwsBucket } from '@appTypes/aws';

//utils
import { createStyles } from '@mantine/core';
import { useApi } from '@api';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

const useStyles = createStyles(theme => ({
  container: {
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  dateAndDeleteContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

interface Props {
  bucket: AwsBucket;
  setBuckets: Dispatch<SetStateAction<AwsBucket[]>>;
}

const SingleBucket: FC<Props> = ({ bucket, setBuckets }) => {
  const { classes } = useStyles();
  const { API } = useApi({
    method: 'delete',
    url: `/aws/delete-bucket/${bucket._id}`,
  });
  const createdAt = new Date(bucket.createdAt);
  const router = useRouter();

  const deleteBucket = async () => {
    try {
      await API({ bucketId: bucket._id });
      setBuckets(prevState => prevState.filter(b => b._id != bucket._id));
    } catch (err) {
      const error = err as { msg: string; success: boolean };
      console.log('error', error);
      showNotification({
        message: error.msg,
        color: 'red',
        title: 'Error deleting bucket',
        autoClose: true,
      });
    }
  };

  return (
    <Paper
      className={classes.container}
      withBorder
      p="md"
      radius="md"
      key={bucket._id}
    >
      <Group position="apart">
        <Text size="xs" color="dimmed" className={classes.title}>
          {bucket.Aws_Region}
        </Text>
        <SiAmazons3 className={classes.icon} size={22} />
      </Group>

      <Group align="flex-end" spacing="xs" mt={25}>
        <Text
          onClick={() => router.push(`/aws/${bucket._id}`)}
          className={classes.value}
        >
          {bucket.Aws_Target_Bucket_Name}
        </Text>
      </Group>
      <div className={classes.dateAndDeleteContainer}>
        <Text size="xs" color="dimmed" mt={7}>
          {createdAt.toDateString()}
        </Text>
        <ActionIcon onClick={deleteBucket} color={'red'} variant="hover">
          <MdDelete />
        </ActionIcon>
      </div>
    </Paper>
  );
};

export default SingleBucket;
