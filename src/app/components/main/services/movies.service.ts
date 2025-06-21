import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Movie } from "../models/movie.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })

export class MoviesService {
  private instanceId = Math.random().toString(36).substring(7);
  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private router: Router) {
    console.log(`[Instance ${this.instanceId}] MoviesService initialized with URL:`, this.url);
  }

  getMovies$(): Observable<Movie[]> {
    console.log(`[Instance ${this.instanceId}] Fetching movies from:`, `${this.url}/movies`);
    return this.http.get<Movie[]>(`${this.url}/movies`).pipe(
      tap(movies => console.log(`[Instance ${this.instanceId}] Received movies:`, movies))
    );
  }

  getMovie$(id: number): Observable<Movie> {
    const url = `${this.url}/movies/${id}`;
    return this.http.get<Movie>(url);
  }

  postMovie$(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.url}/movies`, movie);
  }

  putMovie$(movie: Movie): Observable<Movie> {
    const url = `${this.url}/movies/${movie.id}`;
    return this.http.put<Movie>(url, movie);
  }

  deleteMovie$(id: number): Observable<void> {
    const url = `${this.url}/movies/${id}`;
    return this.http.delete<void>(url);
  }
}
  