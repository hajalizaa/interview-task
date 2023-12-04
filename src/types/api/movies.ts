export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type GetMoviesResponse = {
  Search: Movie[];
  totalResults: string;
  Response: string;
};
