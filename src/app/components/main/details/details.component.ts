import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  formGroup!: FormGroup;
  myFavMovie!:Movie;
  movie!:Movie;
 
  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {
    this.movie = {
      title: '',
      summary: '',
      image: '',
      director: '',
      country: '',
      year: 0,
      duration: 0,
      genre: ''
    };
  }

  get titleFormControl(): FormControl {
    
    return this.formGroup?.get('title') as FormControl;
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: any) => {
        if (params.id) {
          return this.moviesService.getMovie$(params.id);
        }

        this.initForm();

        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.movie = response;

          this.initForm();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
     this.formGroup.markAllAsTouched();
      return;
    }
    let request$ = this.moviesService.getMovie$(this.formGroup.value.id);
 
    request$.subscribe({
      next: () => {
        this.router.navigate(['/details/id']);
      }
    });
  }
  onDelete():void{
   let request$ = this.moviesService.deleteMovie$(this.formGroup.value.id);
  request$.subscribe({
    next:() =>{
      this.router.navigate(['/dashboard']);
    }
  });
 }
  private initForm(): void {
    this.formGroup = this.fb.group({
      id: this.movie.id,
      title: [this.movie.title,Validators.required],
      summary: this.movie.summary,
      image: this.movie.image,
      director: this.movie.director,
      country: this.movie.country,
      year: this.movie.year,
      duration: this.movie.duration,
      genre: [this.movie.genre, Validators.required]
    });
  }
}
