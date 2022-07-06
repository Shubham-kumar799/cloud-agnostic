//components
import SingleBucket from './SingleBucket';
import { SimpleGrid } from '@mantine/core';

// types
import { FC } from 'react';
import { AwsBucket } from '@appTypes/aws';

//utils
import { createStyles } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

const useStyles = createStyles(theme => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },
}));

interface Props {
  bucketList: AwsBucket[];
  setBuckets: Dispatch<SetStateAction<AwsBucket[]>>;
}

const BucketList: FC<Props> = ({ bucketList, setBuckets }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {bucketList.map(bucket => (
          <SingleBucket
            bucket={bucket}
            key={bucket._id}
            setBuckets={setBuckets}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default BucketList;
