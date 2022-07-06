//components
import { UnstyledButton, Group, Avatar, Text } from '@mantine/core';

//types
import { FC } from 'react';

//utils
import { createStyles } from '@mantine/core';
import { selectUser, useAppSelector } from '@store';

const useStyles = createStyles(theme => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

const UserButton: FC = ({ ...others }) => {
  const { classes } = useStyles();
  const user = useAppSelector(selectUser);

  if (!user.email) return null;

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={'/images/default_user_image.png'} />

        <Text color="dimmed" size="xs">
          {user.email}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

export default UserButton;
