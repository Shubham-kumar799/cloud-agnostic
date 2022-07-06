//componpents
import { Navbar, Group, ScrollArea, createStyles, Button } from '@mantine/core';
import UserButton from './UserButton';
import LinksGroup from './LinksGroup';
import ColorSchemeToggle from './ColorSchemeToggle';
import Image from 'next/image';

//icons
import { SiAmazonaws, SiMicrosoftazure, SiGooglecloud } from 'react-icons/si';

//types
import { FC } from 'react';

//utils
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { showNotification } from '@mantine/notifications';

const mockdata = [
  { label: 'Microsoft Azure Blob', icon: SiMicrosoftazure, link: 'microsoft' },
  { label: 'Google Cloud', icon: SiGooglecloud, link: 'google' },
  { label: 'Aws S3', icon: SiAmazonaws, link: 'aws' },
];

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    height: '100vh',
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const Sidebar: FC = () => {
  const { classes } = useStyles();
  const links = mockdata.map(item => <LinksGroup {...item} key={item.label} />);

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      showNotification({
        title: `Logout Unsuccessful`,
        message: 'Some unknown error occured. Please try again',
        autoClose: true,
        color: 'red',
      });
    }
  };

  return (
    <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Image width={50} height={50} src="/images/logo.png" alt="logo" />
          <ColorSchemeToggle />
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Button onClick={signOutUser} m={10} variant="gradient">
        Logout
      </Button>

      <Navbar.Section className={classes.footer}>
        <UserButton />
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
