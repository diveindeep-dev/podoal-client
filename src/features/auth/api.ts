import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = SERVER_URL;

export const checkDuplicateIdApi = (
  checkedId: string,
): Promise<AxiosResponse> => axios.get(`/api/auth/signup/check/${checkedId}`);

export const signUpApi = (newUser: AuthForm): Promise<AxiosResponse> =>
  axios.post('/api/auth/signup', newUser);

export const loginApi = (loginUser: LoginForm): Promise<AxiosResponse> =>
  axios.post('/api/auth/login', loginUser);

interface Token {
  headers: {
    authorization: string;
  };
}

export const headersToken = (): Token => {
  const token = localStorage.getItem('token');
  return { headers: { authorization: `Bearer ${token}` } };
};

export const getUserByToken = (): Promise<AxiosResponse> =>
  axios.get('/api/auth', headersToken());
