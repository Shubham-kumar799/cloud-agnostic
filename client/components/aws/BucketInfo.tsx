//types
import { AwsBucket } from '@appTypes/aws';
import { Paper, Text, Title } from '@mantine/core';
import { FC } from 'react';

//utils
import { createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
  infoContainer: {
    display: 'flex',
    margin: 4,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  highlight: {
    position: 'relative',
    width: 'fit-content',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][1],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
    fontSize: 24,
  },
  fieldName: {
    fontSize: 20,
    fontWeight: 600,
  },
  fieldValue: {
    fontSize: 20,
    marginLeft: 4,
  },
}));

interface Props {
  bucket: AwsBucket;
}

const BucketInfo: FC<Props> = ({ bucket }) => {
  const { classes } = useStyles();
  const date = new Date(bucket.createdAt).toDateString();
  return (
    <div>
      <Title className={classes.highlight}>Bucket Info</Title>
      <div className={classes.infoContainer}>
        <Text className={classes.fieldName}>Bucket Region : </Text>
        <Text color="dimmed" className={classes.fieldValue}>
          {bucket.Aws_Region}
        </Text>
      </div>
      <div className={classes.infoContainer}>
        <Text className={classes.fieldName}>Bucket Name : </Text>
        <Text color="dimmed" className={classes.fieldValue}>
          {bucket.Aws_Target_Bucket_Name}
        </Text>
      </div>
      <div className={classes.infoContainer}>
        <Text className={classes.fieldName}>Created At : </Text>
        <Text color="dimmed" className={classes.fieldValue}>
          {date}
        </Text>
      </div>
    </div>
  );
};

export default BucketInfo;
