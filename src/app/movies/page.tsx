import React from 'react';
import { dehydrate } from '@tanstack/react-query';

import Hydrate from 'components/providers/RqHydrate';
import MoviesList from 'modules/movies/sections/MoviesList';

import { PageProps } from 'types';
import { queryKeys } from 'constant';
import { getMovies } from 'services';
import getQueryClient from 'utils/getQueryClient';

const Movies = async ({ searchParams }: PageProps) => {
  const searchParam = searchParams.searchText?.toString();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.MOVIES.LIST, searchParam || 'all'],
    queryFn: () => getMovies()
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <MoviesList />
    </Hydrate>
  );
};

export default Movies;
