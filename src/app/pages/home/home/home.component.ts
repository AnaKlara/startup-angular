import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}

  redirectTo(pagename: string): void {
    const path = 'pages/' + pagename;
    this.router.navigateByUrl(path);
  }
}
