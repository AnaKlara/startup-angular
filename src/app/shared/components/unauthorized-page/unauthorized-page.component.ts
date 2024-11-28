import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrl: './unauthorized-page.component.scss',
})
export class UnauthorizedPageComponent {
  constructor(private router: Router) {}
  redirectTo(pagename: string): void {
    void this.router.navigateByUrl(pagename);
  }
}
