'use server';

import axiosHandler from 'config/axios';
import { GetCoinsResponse } from 'types';

export const getCoins = async () => {
  return await axiosHandler
    .get<GetCoinsResponse>(`https://api.coincap.io/v2/assets`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => Promise.reject(err.response?.data));
};
