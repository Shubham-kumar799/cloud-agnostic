//components
import BucketInfo from './BucketInfo';
import { Button, Paper } from '@mantine/core';

//icons
import { IoIosCloudUpload } from 'react-icons/io';

//types
import { FC, Dispatch, SetStateAction } from 'react';
import { AwsBucket } from '@appTypes/aws';

//utils
import { createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
  container: {
    padding: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
}));

interface Props {
  bucket: AwsBucket;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

const BucketHeader: FC<Props> = ({ bucket, setOpenDrawer }) => {
  const { classes } = useStyles();
  return (
    <Paper className={classes.container}>
      <BucketInfo bucket={bucket} />
      <Button
        onClick={() => setOpenDrawer(true)}
        leftIcon={<IoIosCloudUpload />}
      >
        Upload
      </Button>
    </Paper>
  );
};

export default BucketHeader;
