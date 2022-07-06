//components
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';

//types
import type { NextPage } from 'next';

//utils
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAppSelector, selectUser } from '@store';
import { FirebaseError } from 'firebase/app';
import { useApi } from '@api';

const SignIn: NextPage = () => {
  const { API } = useApi({ method: 'get', url: '/auth/get' });
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInUser = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      showNotification({
        title: `Login Successful`,
        message: `Welcome back ${userCredential.user.email}`,
        autoClose: true,
        color: 'green',
      });
      setEmail('');
      setPassword('');
    } catch (err) {
      const error = err as FirebaseError;
      showNotification({
        title: `Login Not Successful`,
        message: error.code,
        autoClose: true,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  if (user.email) {
    router.push('/');
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={theme => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'>
          href="#"
          size="sm"
          onClick={event => {
            event.preventDefault();
            router.push('/signup');
          }}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          onChange={e => setEmail(e.target.value)}
          placeholder="you@mantine.dev"
          required
        />
        <PasswordInput
          label="Password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Your password"
          required
          mt="md"
        />
        <Button onClick={signInUser} loading={loading} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default SignIn;
