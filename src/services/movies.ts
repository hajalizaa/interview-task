import axiosHandler from 'config/axios';
import { GetMoviesResponse } from 'types';

export const getMovies = async (searchExpression?: string) => {
  return await axiosHandler
    .get<GetMoviesResponse>(
      `?apikey=${process.env.NEXT_PUBLIC_IMDB_API_KEY}&s=${
        searchExpression || 'all'
      }`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => Promise.reject(err.response?.data));
};
