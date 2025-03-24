import { SafeResourceUrl } from "@angular/platform-browser";

export interface MovieDetails {
  title: string;
  original_title: string;
  tagline: string;
  overview: string;
  poster: string;
  backdrop: string;
  genres: string[];
  popularity: string;
  vote_count: string;
  rating: number;
  release_date: string;
  runtime: string;
  status: string;
  original_language: string;
  budget: string;
  revenue: string;
  gain: string;
  hasTrailer?: boolean;
  trailer?: SafeResourceUrl;
}