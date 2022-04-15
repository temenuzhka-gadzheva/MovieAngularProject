import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Movie} from '../models/movie.model';
@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent{

  @Input() movie!: Movie;
  @Output() movieClicked: EventEmitter<Movie> = new EventEmitter<Movie>();

  onClick(): void {
    this.movieClicked.emit(this.movie);
  }
}
