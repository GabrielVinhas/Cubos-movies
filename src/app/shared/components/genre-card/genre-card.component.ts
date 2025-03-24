import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent {
  @Input() genre: string = ''
  @Input() genreId: number = 0;
  @Input() filter: boolean = false
  @Input() isSelected: boolean = false

  @Output() toggleGenre = new EventEmitter<number>(); 

  selectGenre(): void {
    this.isSelected = !this.isSelected;
    this.toggleGenre.emit(this.genreId); 
  }
}
