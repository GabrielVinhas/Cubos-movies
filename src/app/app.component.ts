import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-header />
  <main>
    <router-outlet></router-outlet>
  </main>
  <app-footer />`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
}
