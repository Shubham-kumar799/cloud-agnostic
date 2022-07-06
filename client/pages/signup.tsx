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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAppSelector, selectUser } from '@store';
import { FirebaseError } from 'firebase/app';
import { useApi } from '@api';

const SignUp: NextPage = () => {
  const { API } = useApi({ method: 'post', url: '/auth/create-user' });
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useAppSelector(selectUser);
  const [loading, setLoading] = useState(false);

  const signUpUser = async () => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      showNotification({
        title: `Registration Successful`,
        message: `Welcome ${userCredential.user.email}`,
        autoClose: true,
        color: 'green',
      });
      await API({
        email,
      });
      setEmail('');
      setPassword('');
    } catch (err) {
      const error = err as FirebaseError;
      showNotification({
        title: `Registration Not Successful`,
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
        Sign up here
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor<'a'>
          href="#"
          size="sm"
          onClick={event => {
            event.preventDefault();
            router.push('/signin');
          }}
        >
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          onChange={e => setEmail(e.target.value)}
          label="Email"
          placeholder="you@mantine.dev"
          required
        />
        <PasswordInput
          onChange={e => setPassword(e.target.value)}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Button loading={loading} onClick={signUpUser} fullWidth mt="xl">
          Create account
        </Button>
      </Paper>
    </Container>
  );
};

export default SignUp;
