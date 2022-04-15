import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import {Movie} from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 movies!:  Movie[];
 favoriteMovie!: Movie;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
 this.getContent();
  }
  onMarkAsFavorite(movie: Movie): void {
    this.favoriteMovie = movie;
  }

  private getContent(): void {
    this.moviesService.getMovies$().pipe(
      map((response: Movie[]) => {
        return response;
      }),
      take(1)
    ).subscribe({
      next: (response: Movie[]) => {
        this.movies = response;
      }
    });
  }

}
