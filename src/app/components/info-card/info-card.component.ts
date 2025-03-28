import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent {
  @Input() label?: string;
  @Input() text?: string;
  @Input() span?: string;
  @Input() genres: string[] = [];
}
