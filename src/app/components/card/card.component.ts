import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() movieName: string = ''
  @Input() movieImg: string = ''
  @Input() altTxt: string = ''
  @Input() rating: number = 0;
  @Input() genres: string[] = [];

  getRatingClass(rating: number): string {
    if (rating >= 75) {
      return 'green';
    } else if (rating >= 50) {
      return 'yellow';
    } else if (rating >= 25) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
