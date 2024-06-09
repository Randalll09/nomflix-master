const API_KEY = '7f3a50b0057f22c8d178f30b42627235';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieInfo {
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  overview: string;
  popularity: number;
  production_companies: { name: string; id: number; logo_path: string }[];
  title: string;
  name: string;
  poster_path: string;
  runtime: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
}
export const getMovieInfo = (id: string) => {
  return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
};

export const getSearch = (search: string | null) => {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${search}`
  ).then((res) => res.json());
};
