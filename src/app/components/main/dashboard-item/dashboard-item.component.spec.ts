import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Movie } from '../models/movie.model';

import { DashboardItemComponent } from './dashboard-item.component';

describe('DashboardItemComponent', () => {
  let component: DashboardItemComponent;
  let fixture: ComponentFixture<DashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardItemComponent);
    component = fixture.componentInstance;
    // Provide a mock movie object to satisfy the template
    component.movie = {
      id: 1,
      title: 'Test Movie',
      genre: 'test',
      year: 2022,
      likes: [],
      imageUrl: '',
      summary: 'Test Summary',
      image: 'test.jpg',
      director: 'Test Director',
      country: 'Test Country',
      duration: 120
    } as Movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
