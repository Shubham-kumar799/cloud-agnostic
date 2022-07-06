//components
import { Paper, ActionIcon, Text } from '@mantine/core';

//icons
import { MdDelete } from 'react-icons/md';

//types
import { FC, Dispatch, SetStateAction } from 'react';

//utils
import { createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
  container: {
    margin: 4,
    padding: 8,
    display: 'flex',
    justifyContent: 'space-between',

    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },
  fileName: {
    textTransform: 'lowercase',
  },
}));

interface Props {
  file: File;
  setAcceptedFiles: Dispatch<SetStateAction<File[]>>;
}

const SingleFilePreview: FC<Props> = ({ file, setAcceptedFiles }) => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.container}>
      <Text className={classes.fileName}>{file.name}</Text>
      <ActionIcon
        onClick={() =>
          setAcceptedFiles(prevState =>
            prevState.filter(f => f.name != file.name)
          )
        }
        color={'red'}
        variant="hover"
      >
        <MdDelete />
      </ActionIcon>
    </Paper>
  );
};

export default SingleFilePreview;
