'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { queryKeys } from 'constant';
import { getMovies } from 'services';
import { GetMoviesResponse } from 'types';

export const useMoviesList = () => {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('searchText')?.toString();

  return useQuery<GetMoviesResponse>({
    queryKey: [queryKeys.MOVIES.LIST, searchParam || 'all'],
    queryFn: () => getMovies(searchParam)
  });
};
