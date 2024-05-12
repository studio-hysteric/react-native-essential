import ky from 'ky';
import { API_URL, TIME_OUT } from '@/config';

const prefixUrl = `${API_URL ? API_URL : ''}/`;

export const instance = ky.create({
  prefixUrl,
  timeout: TIME_OUT,
  headers: {
    Accept: 'application/json',
  },
});
