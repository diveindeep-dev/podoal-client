import axios, { AxiosResponse } from 'axios';
import { headersToken } from '../auth/api';

export const addPodoApi = (newPodo: PodoForm): Promise<AxiosResponse> =>
  axios.post(`/api/podo/new`, newPodo, headersToken());
