import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appPositionBelow]',
})
export class PositionBelowDirective implements AfterViewInit, OnDestroy {
  /**
   * This Directive is designed to position an element (child 2) directly below another element (child 2) within the same parent.
   * i.e.:
   * Parent
   *  child 1
   *  child 2
   *
   * The directive also observes changes to the #tag-input-text-container to reposition the element whenever the observed child changes:
   * the parent height can increase as the child 1 height increses but child 2 will be floating and following the botton position of child 2.
   *
   * @param querySelector - Child 1 id selector
   * @returns position coordinates of child 2 based on child 1
   *
   */

  @Input({ required: true }) querySelector!: string;

  private observer: MutationObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observeChild1();
    this.positionElement();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private observeChild1() {
    const parent = this.el.nativeElement.parentElement;
    const child1 = parent.querySelector(this.querySelector);

    if (!child1) {
      console.error(`Element ${this.querySelector}  not found!`);
      return;
    }

    this.observer = new MutationObserver(() => {
      this.positionElement();
    });

    this.observer.observe(child1, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }

  positionElement() {
    const parent = this.el.nativeElement.parentElement;
    const child1 = parent.querySelector(this.querySelector);
    const child1Height = child1.offsetHeight;

    this.el.nativeElement.style.position = 'absolute';
    this.el.nativeElement.style.top = `${child1Height}px`;
    this.el.nativeElement.style.left = '0';
    this.el.nativeElement.style.width = '100%';
  }
}
