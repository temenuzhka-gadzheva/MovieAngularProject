import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  formGroup!: FormGroup;

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
      year: 1400,
      duration: 15,
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
    const myMovie: Movie = {
      id: this.formGroup.value.id,
      title: this.formGroup.value.title,
      summary: this.formGroup.value.summary,
      image: this.formGroup.value.image,
      director: this.formGroup.value.director,
      country: this.formGroup.value.country,
      year: this.formGroup.value.year,
      duration: this.formGroup.value.duration,
      genre: this.formGroup.value.genre
    };


    let request$ = this.moviesService.postMovie$(myMovie);
 

    request$.subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      id: this.movie.id,
      title: [this.movie.title,Validators.required],
      summary: [this.movie.summary,Validators.required],
      image: this.movie.image,
      director: [this.movie.director, Validators.required],
      country: [this.movie.country, Validators.required],
      year: [this.movie.year, Validators.required],
      duration: [this.movie.duration, Validators.required],
      genre: [this.movie.genre, Validators.required]
    });
  }
}