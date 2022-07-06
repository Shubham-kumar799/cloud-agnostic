import { getAxios } from './axios';
import { useState } from 'react';

interface ApiState {
  loading: boolean;
  data: any;
  error: any;
}

interface UseApiProps {
  url: string;
  method: string;
}

export const useApi = ({ url, method }: UseApiProps) => {
  const { axiosInstance } = getAxios();

  const [responseState, setResponseState] = useState<ApiState>({
    data: null,
    loading: false,
    error: null,
  });

  const controller = new AbortController();
  const API = async ({ body }: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        setResponseState(prevState => ({
          ...prevState,
          error: null,
          loading: true,
        }));
        const response = await axiosInstance({
          url,
          method,
          signal: controller.signal,
          data: body,
        });
        setResponseState(prevState => ({
          ...prevState,
          error: null,
          data: response.data,
          loading: false,
        }));
        resolve(response.data);
      } catch (error) {
        setResponseState(prevState => ({
          ...prevState,
          data: null,
          loading: false,
          error,
        }));
        console.log(`error with ${method} at endpoint ${url}`, error);
        reject(error);
      }
    });
  };
  return {
    responseState,
    API,
    controller,
  };
};
