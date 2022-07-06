//components
import { Title, Text, Button, Container } from '@mantine/core';

//types
import { FC, Dispatch, SetStateAction } from 'react';

//utils
import { createStyles, useMantineTheme } from '@mantine/core';

const useStyles = createStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,
    flex: 1,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

interface Props {
  service: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const SetupStorageHero: FC<Props> = ({ service, setModal }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Set up your{' '}
          <Text component="span" color={theme.primaryColor} inherit>
            {service}
          </Text>{' '}
          storage bucket
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            You do not have any{' '}
            <Text component="span" color={theme.primaryColor} inherit>
              {service}
            </Text>{' '}
            storage buckets at the moment.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            onClick={() => setModal(true)}
            className={classes.control}
            size="lg"
          >
            Setup Storage Bucket
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SetupStorageHero;
