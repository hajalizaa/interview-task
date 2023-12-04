import axios, { AxiosError } from 'axios';

const axiosHandler = axios.create({
  baseURL: `https://www.omdbapi.com/`
});

axiosHandler.interceptors.response.use(undefined, (error: AxiosError<any>) => {
  return Promise.reject<any>(error);
});

export default axiosHandler;
