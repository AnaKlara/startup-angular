import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  Input,
} from '@angular/core';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { Router } from '@angular/router';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input() tooltipText = '';

  tooltipComponent?: ComponentRef<any>;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltipComponent) {
      return;
    }

    const tooltipComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this.tooltipComponent = tooltipComponentFactory.create(this.injector);
    this.document.body.appendChild(this.tooltipComponent.location.nativeElement);
    this.setTooltipComponentProperties();
    this.tooltipComponent.hostView.detectChanges();
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    public elementRef: ElementRef,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
    router.events.subscribe((event) => {
      this.destroyTooltips();
    });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    // console.log('onMouseLeave');
    if (!this.tooltipComponent) {
      return;
    }
    this.appRef.detachView(this.tooltipComponent.hostView);
    this.tooltipComponent.destroy();
    this.tooltipComponent = undefined;
  }

  setTooltipComponentProperties() {
    if (!this.tooltipComponent) {
      return;
    }
    this.tooltipComponent.instance.text = this.tooltipText;
    const { left, right, bottom } = this.elementRef.nativeElement.getBoundingClientRect();
    this.tooltipComponent.instance.left = (right - left) / 2 + left;
    this.tooltipComponent.instance.top = bottom;
  }

  destroyTooltips(): void {
    const tooltips = document.querySelectorAll('tooltip');
    tooltips.forEach((tooltip) => {
      tooltip.remove();
    });
  }
}
