/* eslint-disable @next/next/no-img-element */
import React, { FC, HTMLProps } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import { Movie } from 'types';

import heartFilled from 'modules/movies/assets/Heart-filled.svg';
import heartEmpty from 'modules/movies/assets/Heart-empty.svg';

export interface MovieCardProps extends HTMLProps<HTMLDivElement> {
  movie: Movie;
  isFavorite: boolean;
  onClickFavorite: () => void;
}

const MovieCard: FC<MovieCardProps> = ({
  movie,
  isFavorite = false,
  onClickFavorite,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        className,
        'flex flex-col w-[300px] shadow-lg hover:shadow-zinc-700 rounded-2xl pb-2 group overflow-hidden transition-all'
      )}
      {...props}>
      <Link href={`/movies/${movie.Title}`}>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="h-[400px] w-full object-cover object-center rounded-s-2xl rounded-e-2xl group-hover:scale-105 transition-all"
          loading="lazy"
        />
      </Link>
      <div className="mt-4 max-w-[300px] h-20 px-3">
        <a href="#" className="line-clamp-3 text-1xl font-bold">
          {movie.Title}
        </a>
        <div className="flex justify-between">
          <p className="mt-1 text-sm text-gray-500">
            <span className="font-bold">{movie.Year}</span>
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClickFavorite();
            }}>
            <Image src={isFavorite ? heartFilled : heartEmpty} alt="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
