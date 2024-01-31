import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = SERVER_URL;

export const signUpApi = (newUser: AuthForm): Promise<AxiosResponse> =>
  axios.post('/api/auth/signup', newUser);

export const loginApi = (loginUser: LoginForm): Promise<AxiosResponse> =>
  axios.post('/api/auth/login', loginUser);
