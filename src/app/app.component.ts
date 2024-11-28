import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';

import { LoadingOverlayService } from './shared/services/loading-overlay/loading-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading: boolean = true;

  constructor(
    private overlayService: LoadingOverlayService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.overlayService.loading$.subscribe(value => {
      this.loading = value;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Close all open dialogs when the route changes
        this.dialog.closeAll();
      }
    });
  }
  showLoading() {
    this.loading = true;
  }
}
