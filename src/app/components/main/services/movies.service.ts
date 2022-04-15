import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Movie } from "../models/movie.model";


@Injectable({
    providedIn: 'root'
  })

  export class MoviesService {

    private url = `${environment.baseUrl}`;
  
    constructor(private http: HttpClient) {
    }
  
    getMovies$(): Observable<Movie[]> {
      return this.http.get<Movie[]>(`${this.url}/movies`);
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
  