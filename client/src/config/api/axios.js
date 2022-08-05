import axios from 'axios';
import { envConfig } from '../env';

const { NODE_ENV, API_CURRENT_VERSION, API_DEV_URL, API_PROD_URL } = envConfig;

const BASE_URL =
  NODE_ENV === 'development'
    ? `${API_DEV_URL}/${API_CURRENT_VERSION}`
    : `${API_PROD_URL}/${API_CURRENT_VERSION}`;

const ClientAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default ClientAxios;
