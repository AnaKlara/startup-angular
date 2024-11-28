import { Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'float-container',
  templateUrl: './float-container.component.html',
  styleUrl: './float-container.component.scss',
})
export class FloatContainerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) title: string = 'Float Container Title Here';

  @Input({ required: true })
  toggleFloatContainerParentEvent: Observable<void>;

  @ContentChild('content') content: TemplateRef<any>;

  private eventsSubscription: Subscription;

  isOpen: boolean = false; // must be false

  ngOnInit() {
    this.eventsSubscription = this.toggleFloatContainerParentEvent.subscribe(() => {
      this.isOpen = true;
    });
  }

  toggleFloatContainer() {
    this.isOpen = this.isOpen!;
  }

  closeButtonClick() {
    this.isOpen = false;
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }
}
