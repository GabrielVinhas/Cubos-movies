import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = "https://api.themoviedb.org/3";
  private apiKey = '27c5a52fa4380e7dce7cfd6c505d8c65'
  private imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/trending/movie/day?api_key=${this.apiKey}&language=pt-BR&page=${page}`);
  }
  
  searchMovies(query: string, page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=pt-BR&query=${query}&page=${page}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`);
  }

  getMoviesByGenres(genres: number[], page: number = 1): Observable<any> {
    const genreString = genres.join(',');
    return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&language=pt-BR&with_genres=${genreString}&page=${page}`);
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&language=pt-BR`);   
  }

  getMovieTrailer(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}/videos?api_key=${this.apiKey}&language=pt-BR`);
  }
}