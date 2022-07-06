//compoents
import { Divider, Button, Title } from '@mantine/core';

//icons
import { AiOutlinePlus } from 'react-icons/ai';

//types
import { Dispatch, FC, SetStateAction } from 'react';

//utils
import { createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 24,
    lineHeight: 1.2,
    fontWeight: 700,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 18,
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][1],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  service: string;
}

const BucketsPageHeader: FC<Props> = ({ setOpenModal, service }) => {
  const { classes } = useStyles();
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title className={classes.title}>
          Your <span className={classes.highlight}>{service}</span> Buckets
        </Title>
        <Button leftIcon={<AiOutlinePlus />} onClick={() => setOpenModal(true)}>
          Add Bucket
        </Button>
      </div>
      <Divider mt={8} mb={8} />
    </>
  );
};

export default BucketsPageHeader;
