import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { Director, Movie } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  activeTab: 'movies' | 'directors' = 'movies';

  directors: Director[] = [];
  movies: Movie[] = [];

  // director form
  directorForm: Director = { pkDirector: 0, name: '', age: null, active: true };
  isEditingDirector = false;

  // movie form
  movieForm: Movie = { pkMovies: 0, name: '', gender: '', duration: '02:00:00', fkDirector: null };
  isEditingMovie = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.api.getDirectors().subscribe({
      next: (data) => (this.directors = data),
      error: (err) => console.error('Error loading directors:', err)
    });
    this.api.getMovies().subscribe({
      next: (data) => (this.movies = data),
      error: (err) => console.error('Error loading movies:', err)
    });
  }

  // director CRUD flow
  saveDirector(): void {
    if (!this.directorForm.name.trim()) return;

    if (this.isEditingDirector) {
      this.api.updateDirector(this.directorForm.pkDirector, this.directorForm).subscribe(() => {
        this.resetDirectorForm();
        this.loadAll();
      });
    } else {
      const { pkDirector, ...payload } = this.directorForm;
      this.api.createDirector(payload).subscribe(() => {
        this.resetDirectorForm();
        this.loadAll();
      });
    }
  }

  editDirector(d: Director): void {
    this.directorForm = { ...d };
    this.isEditingDirector = true;
  }

  deleteDirector(id: number): void {
    if (confirm('Delete this director?')) {
      this.api.deleteDirector(id).subscribe(() => this.loadAll());
    }
  }

  resetDirectorForm(): void {
    this.directorForm = { pkDirector: 0, name: '', age: null, active: true };
    this.isEditingDirector = false;
  }

  // movie CRUD flow
  saveMovie(): void {
    if (!this.movieForm.name.trim()) return;

    if (this.isEditingMovie) {
      this.api.updateMovie(this.movieForm.pkMovies, this.movieForm).subscribe(() => {
        this.resetMovieForm();
        this.loadAll();
      });
    } else {
      const { pkMovies, director, ...payload } = this.movieForm;
      this.api.createMovie(payload).subscribe(() => {
        this.resetMovieForm();
        this.loadAll();
      });
    }
  }

  editMovie(m: Movie): void {
    this.movieForm = {
      pkMovies: m.pkMovies,
      name: m.name,
      gender: m.gender,
      duration: m.duration,
      fkDirector: m.fkDirector
    };
    this.isEditingMovie = true;
  }

  deleteMovie(id: number): void {
    if (confirm('Delete this movie?')) {
      this.api.deleteMovie(id).subscribe(() => this.loadAll());
    }
  }

  resetMovieForm(): void {
    this.movieForm = { pkMovies: 0, name: '', gender: '', duration: '02:00:00', fkDirector: null };
    this.isEditingMovie = false;
  }
}
