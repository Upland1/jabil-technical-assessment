import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director, Movie } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:5235/api';

  constructor(private http: HttpClient) {}

  // directors
  getDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(`${this.baseUrl}/Directors`);
  }

  createDirector(data: Partial<Director>): Observable<Director> {
    return this.http.post<Director>(`${this.baseUrl}/Directors`, data);
  }

  updateDirector(id: number, data: Director): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Directors/${id}`, data);
  }

  deleteDirector(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Directors/${id}`);
  }

  // movies
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/Movies`);
  }

  createMovie(data: Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/Movies`, data);
  }

  updateMovie(id: number, data: Movie): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Movies/${id}`, data);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Movies/${id}`);
  }
}