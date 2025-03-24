import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/core/services/movies.service';
import { MovieDetails } from 'src/app/shared/models/movie-details.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private sanitizer: DomSanitizer
  ) {}

  isDarkTheme: boolean = document.body.classList.contains('dark-theme');
  movie!: MovieDetails
  mappedGenres: string[] = [];

  ngOnInit() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.moviesService.getMovieDetails(movieId).subscribe((movie) => {
      const movieModel: MovieDetails = {
        title: movie.title,
        original_title: movie.original_title,
        tagline: movie.tagline,
        overview: movie.overview,
        poster: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
        backdrop: 'https://image.tmdb.org/t/p/original' + movie.backdrop_path,
        genres: movie.genres.map((g: { name: string }) => g.name),
        popularity: movie.popularity.toFixed(2),
        vote_count: movie.vote_count,
        rating: Math.round(movie.vote_average * 10),
        release_date: this.formatDate(movie.release_date),
        runtime: `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`,
        status: movie.status,
        original_language: movie.original_language,
        budget: this.formatToMillions(movie.budget),
        revenue: this.formatToMillions(movie.revenue),
        gain: this.formatToMillions(Math.max(0, movie.revenue - movie.budget)),
      }
      
      this.movie = movieModel;
    });

    this.moviesService.getMovieTrailer(movieId).subscribe((res) => {
      const hasTrailer = res.results.length > 0;
      this.movie.hasTrailer = hasTrailer;
      
      if (hasTrailer) {
        const trailerUrl = `https://www.youtube.com/embed/${res.results[0].key}`;
        this.movie.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(trailerUrl);

      }
    });
  }

  formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-'); 
    return `${day}/${month}/${year}`; 
  };

   formatToMillions = (value: number): string => {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  };
}
