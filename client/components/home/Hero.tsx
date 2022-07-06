//components
import {
  Image,
  Container,
  Title,
  Button,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core';

//icons
import { AiFillCheckCircle } from 'react-icons/ai';

//types
import { FC } from 'react';

//utils
import { createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
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

const Hero: FC = () => {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>Cloud Agnostic</span>
              <br /> storage platform
            </Title>
            <Text color="dimmed" mt="md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsa,
              laborum ipsum omnis sit facere excepturi magnam non, dolores
              eligendi earum ducimus deserunt pariatur ratione dicta explicabo
              commodi. Tempora, voluptatem?
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <AiFillCheckCircle size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>AWS</b>
              </List.Item>
              <List.Item>
                <b>Mircrosoft Azure</b>
              </List.Item>
              <List.Item>
                <b>Google Cloud</b>
              </List.Item>
            </List>

            <Button mt={30} radius="xl" size="md" className={classes.control}>
              Get started by exploring the tabs on your left
            </Button>
          </div>
          <Image src={'/images/hero_image.png'} className={classes.image} />
        </div>
      </Container>
    </div>
  );
};

export default Hero;
