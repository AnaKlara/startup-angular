import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  constructor(private router: Router) {}
  redirectTo(pagename: string): void {
    void this.router.navigateByUrl(pagename);
  }
}
