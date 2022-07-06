//components
import { Group, Box, ThemeIcon, UnstyledButton } from '@mantine/core';

//icons
import { IconType } from 'react-icons';

//types
import { FC } from 'react';

// utils
import { useRouter } from 'next/router';
import { createStyles } from '@mantine/core';

interface LinksGroupProps {
  icon: IconType;
  label: string;
  link: string;
}

const LinksGroup: FC<LinksGroupProps> = ({ icon: Icon, label, link }) => {
  const useStyles = createStyles(theme => ({
    control: {
      fontWeight: 500,
      display: 'block',
      width: '100%',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      fontSize: theme.fontSizes.sm,
      backgroundColor:
        typeof window !== 'undefined' && window.location.pathname.includes(link)
          ? theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0]
          : '',
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    link: {
      fontWeight: 500,
      display: 'block',
      textDecoration: 'none',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      paddingLeft: 31,
      marginLeft: 30,
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.colors.gray[8],
      borderLeft: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[7]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    chevron: {
      transition: 'transform 200ms ease',
    },
  }));
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <>
      <UnstyledButton
        onClick={() => router.push(`/${link}`)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
        </Group>
      </UnstyledButton>
    </>
  );
};

export default LinksGroup;
