'use client';

import { useDispatch } from 'react-redux';

import Spinner from 'components/UI/Spinner';
import MovieCard from 'modules/movies/components/MovieCard';
import Searchbox from 'modules/movies/components/Searchbox';

import { useMoviesList, useReduxSelector } from 'hooks';
import { addToFavorites, removeFromFavorites } from '@redux/slices';

const MoviesList = () => {
  const dispatch = useDispatch();
  const favoriteMovies = useReduxSelector(
    (store) => store.storage.favoriteMovies
  );

  const { data: movies } = useMoviesList();

  return (
    <div className="container mx-auto px-8">
      <h2 className="mt-5 text-2xl font-bold text-center text-white mb-4">
        MostPopularMovies of IMDB
      </h2>

      <Searchbox className="w-1/2 mx-auto" />

      {!movies && (
        <div className="w-1/2 mx-auto flex justify-center mt-4">
          <Spinner />
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-10 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies?.Search?.map((movie, i) => {
          const isFavorite = favoriteMovies.includes(movie.imdbID);
          return (
            <MovieCard
              movie={movie}
              key={i}
              isFavorite={isFavorite}
              onClickFavorite={() => {
                if (isFavorite) dispatch(removeFromFavorites(movie.imdbID));
                else dispatch(addToFavorites(movie.imdbID));
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MoviesList;
