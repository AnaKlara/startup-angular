import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'suport-card',
  templateUrl: './suport-card.component.html',
  styleUrl: './suport-card.component.scss',
})
export class SuportCardComponent implements OnInit, OnDestroy {
  eventsSubscription: Subscription;

  @Input() toggleCallListener: Observable<void>;

  isVisible: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.eventsSubscription = this.toggleCallListener.subscribe(() => {
      this.toggleSuportCardDiv();
    });
  }

  toggleSuportCardDiv() {
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
