import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() class: string = ''
  @Input() btnText: string = ''
  @Input() btnImg: string | null = null
  @Input() svgContent: SafeHtml | null = null
  @Input() label: string = ''
  @Input() disabled:any 
}
