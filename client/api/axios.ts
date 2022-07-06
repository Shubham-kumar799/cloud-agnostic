import axios from 'axios';
import { useAppSelector, selectUser } from '@store';

export const getAxios = () => {
  const user = useAppSelector(selectUser);

  const axiosHeaders = {
    ...(user && user.token && { auth_token: user.token }),
  };
  const myAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { ...axiosHeaders },
  });

  return { axiosInstance: myAxios };
};
