export interface Movie {
  poster_path: any;
  id: number;
  title: string;
  genre_ids: number[];
  vote_count: number;
  vote_average: number;
}

export interface Category {
  id: number;
  name: string;
}
