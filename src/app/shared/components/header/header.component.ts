import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  isDarktheme: boolean = true
  sunIcon: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(`
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" fill="currentColor"/>
    <path d="M12 5V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 21V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M16.9498 7.04996L18.364 5.63574" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M5.63608 18.3644L7.05029 16.9502" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M19 12L21 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M3 12L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M16.9498 16.95L18.364 18.3643" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M5.63608 5.63559L7.05029 7.0498" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
`);

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  toggleTheme() {
    const body = document.body;
  
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    }
  }
}
