import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Input() class: string = '';

  getGradient(rating: number): string {
    const angle = (rating / 100) * 360; 
    const color = this.getRatingColor(rating); 

    return `conic-gradient(${color} ${angle}deg, #333 ${angle}deg)`;
  }

  getRatingColor(rating: number): string {
    if (rating >= 75) {
      return '#4CAF50'; 
    } else if (rating >= 50) {
      return '#FFEB3B'; 
    } else if (rating >= 25) {
      return '#FF9800'; 
    } else {
      return '#F44336'; 
    }
  }
}
