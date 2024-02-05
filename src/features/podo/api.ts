import axios, { AxiosResponse } from 'axios';
import { headersToken } from '../auth/api';

export const addPodoApi = (newPodo: PodoForm): Promise<AxiosResponse> =>
  axios.post(`/api/podo/new`, newPodo, headersToken());

export const getPodoListByPageApi = async (
  page: number,
): Promise<AxiosResponse> => axios.get(`/api/podo/list/${page}`);
