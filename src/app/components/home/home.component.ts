import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MoviesService } from 'src/app/core/services/movies.service';
import { ApiMovie } from 'src/app/shared/models/api-movie.model';
import { Movie } from 'src/app/shared/models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private moviesService: MoviesService, private router: Router, private sanitizer: DomSanitizer) {}

  allMovies: any = [];
  apiPage: number = 0;
  firstHalfMovies: any[] = [];
  secondHalfMovies: any[] = [];
  movies: any[] = [];
  genres: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  showFilters: boolean = false;
  pages: number[] = [];
  searchResults: any[] = [];
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    hasNoResults: new FormControl(false),
    noResultMessage: new FormControl('Nenhum filme encontrado!'),
  });
  selectedGenres: number[] = [];
  filtersIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12L5 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M19 20L19 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M5 20L5 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M19 12L19 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 7L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 20L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="5" cy="14" r="2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="9" r="2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="19" cy="15" r="2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
`)

  ngOnInit() {
    this.getGenres();
    this.getMovies(this.currentPage);

    // Mnoitora e executa função de procurar filmes para procurar dinamicamente
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => {
        this.searchMovies(1);
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth(event.target.innerWidth); 
  }

  getMovies(page: number, showSecondHalf: boolean = false) {
    this.moviesService.getPopularMovies(page).subscribe({
      next: (res) => {
        this.setMovies(res, showSecondHalf);
      },
      error: (err) => {
        console.error('Erro ao carregar filmes:', err);
      },
    });
  }

  searchMovies(page: number, showSecondHalf: boolean = false) {
    const query = this.searchForm.get('search')?.value;
  
    if (!query || query.trim() === '') {
      this.movies = [];
      this.totalPages = 0;
      this.getMovies(this.currentPage);
      return;
    }
  
    this.moviesService.searchMovies(query, page).subscribe({
      next: (res) => {
        if (res.total_results === 0) {
          this.searchForm.get('hasNoResults')?.setValue(true);
          this.movies = [];
          this.totalPages = 0;
          return;
        } else {
          this.searchForm.get('hasNoResults')?.setValue(false);
          this.setMovies(res, showSecondHalf);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar filmes:', err);
      },
    });
  }

  setMovies(response: any, showSecondHalf:boolean = false) {
    this.apiPage = response.page;
    this.totalPages = response.total_pages * 2;
    this.updatePageNumbers();

    this.allMovies = response.results;

    this.firstHalfMovies = this.allMovies.slice(0, 10);
    this.secondHalfMovies = this.allMovies.slice(10, 20);

    if (showSecondHalf) {
      this.movies = this.mapMoviesPreview(this.secondHalfMovies);
    } else {
      this.movies = this.mapMoviesPreview(this.firstHalfMovies);
    }
  }

  toggleFiltersContainer() {
    this.showFilters = !this.showFilters;
  }

  mapMoviesPreview(movies: any[]): Movie[] {
    return movies.slice(0, 10).map((movie: ApiMovie) => ({
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      genres: this.getGenreNames(movie.genre_ids),
      rating: Math.round(movie.vote_average * 10),
    }));
  }

  getGenres() {
    this.moviesService.getGenres().subscribe({
      next: (res) => {
        this.genres = res.genres;
      },
      error: (err) => {},
    });
  }

  getGenreNames(genreIds: number[]): string[] {
    return genreIds.map((id) => {
      const genre = this.genres.find((g: any) => g.id === id);
      return genre ? genre.name : 'Desconhecido';
    });
  }

  updateGenreChange(genreId: number) {
    if (this.selectedGenres.includes(genreId)) {
      this.selectedGenres = this.selectedGenres.filter((id) => id !== genreId);
    } else {
      this.selectedGenres.push(genreId);
    }

    console.log(this.selectedGenres);
    this.filterMoviesByGenres(this.selectedGenres);
  }

  filterMoviesByGenres(genres: number[], showSecondHalf: boolean = false) {
    if (this.selectedGenres.length === 0) {
      this.getMovies(this.currentPage);
      return;
    }

    this.moviesService.getMoviesByGenres(this.selectedGenres, this.currentPage).subscribe({
      next: (res) => {
        console.log(res)

        if (res.total_results === 0) {
          this.searchForm.get('hasNoResults')?.setValue(true);
          this.movies = [];
          this.totalPages = 0;
          return;
        } else {
          this.searchForm.get('hasNoResults')?.setValue(false);
          this.setMovies(res, showSecondHalf);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar filmes:', err);
      },
    });
  }

  showMovieDetails(movieId: number) {
    this.router.navigate(['/details', movieId]);
  }

  checkScreenWidth(width: number) {
    if (width <= 435) {
      this.updatePageNumbers(); 
    } else if (width >= 435) {
      this.updatePageNumbers(); 
    }
  }

  updatePageNumbers() {
    let maxPagesToShow = 5;

    if (window.innerWidth <= 435) {
      maxPagesToShow = 3;
    }

    let start = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let end = Math.min(this.totalPages, start + maxPagesToShow - 1);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    this.pages = [];
    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
  
      const apiPage = Math.ceil(this.currentPage / 2);
      const showSecondHalf = this.currentPage % 2 === 0;
  
      if (!this.searchForm.get('search')?.value) {
        this.getMovies(apiPage, showSecondHalf);
      } else {
        this.searchMovies(apiPage, showSecondHalf);
      }
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
  
      const apiPage = Math.ceil(this.currentPage / 2);
      const showSecondHalf = this.currentPage % 2 === 0;
  
      if (!this.searchForm.get('search')?.value) {
        this.getMovies(apiPage, showSecondHalf);
      } else {
        this.searchMovies(apiPage, showSecondHalf);
      }
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
  
      const apiPage = Math.ceil(this.currentPage / 2);
      const showSecondHalf = this.currentPage % 2 === 0;
  
      if (!this.searchForm.get('search')?.value) {
        this.getMovies(apiPage, showSecondHalf);
      } else {
        this.searchMovies(apiPage, showSecondHalf);
      }
    }
  }

  comparePages(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((obj1, index) => {
      const obj2 = arr2[index];
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    });
  }
}
