import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.scss',
})
export class UserProfileCardComponent implements OnInit, OnDestroy {
  eventsSubscription: Subscription;

  @Input() toggleCallListener: Observable<void>;

  @Input({ required: true }) usuario;

  isVisible: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.eventsSubscription = this.toggleCallListener.subscribe(() => {
      this.toggleFloatingDiv();
    });
  }

  toggleFloatingDiv() {
    this.isVisible = !this.isVisible;
  }

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isVisible = false;
    }
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
