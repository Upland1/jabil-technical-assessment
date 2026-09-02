export interface Director {
  pkDirector: number;
  name: string;
  age?: number | null;
  active: boolean;
}

export interface Movie {
  pkMovies: number;
  name: string;
  gender?: string | null;
  duration?: string | null;
  fkDirector?: number | null;
  director?: Director | null;
}