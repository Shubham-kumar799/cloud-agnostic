//types
import { FC } from 'react';

//components
import { Loader } from '@mantine/core';

//utils
import { useEffect, useState } from 'react';
import { useAppDispatch, LOGIN, LOGOUT } from '@store';
import { auth } from '../../firebase';
import { createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
  },
}));

interface Props {
  children: React.ReactNode;
}

const SetupApp: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      try {
        setLoading(true);
        if (user) {
          const token = await user.getIdToken();
          dispatch(
            LOGIN({
              email: user.email!,
              token,
            })
          );
        } else {
          dispatch(LOGOUT());
        }
      } catch (error) {
        dispatch(LOGOUT());
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loader />;
  return <div className={classes.card}>{children}</div>;
};

export default SetupApp;
