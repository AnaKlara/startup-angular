import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Injectable, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf } from 'rxjs';
import { TooltipDirective } from './tooltip.directive';
import { Router } from '@angular/router';

@Injectable()
class MockElementRef {
  nativeElement = {};
}

@Injectable()
class MockDocument {
  querySelector() {}
}

@Injectable()
class MockRouter {
  events = observableOf({});
  navigate() {}
}

@Component({
  template: ` <div tooltip [tooltipText]="tooltipText"></div> `,
})
class DirectiveTestComponent {
  tooltipText: string;
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<DirectiveTestComponent>;
  let component: DirectiveTestComponent;
  let directiveEl;
  let directive: TooltipDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipDirective, DirectiveTestComponent],
      providers: [
        { provide: ElementRef, useClass: MockElementRef },
        { provide: Document, useClass: MockDocument },
        { provide: Router, useClass: MockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectiveTestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(TooltipDirective));
    directive = directiveEl.injector.get(TooltipDirective);
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should call onMouseEnter and setTooltipComponentProperties', () => {
    jest.spyOn(directive, 'setTooltipComponentProperties');
    directive.onMouseEnter();
    expect(directive.setTooltipComponentProperties).toHaveBeenCalled();
  });

  it('should call onMouseLeave and destroy tooltips', () => {
    directiveEl.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(directive.tooltipComponent).toBeUndefined();
  });
});
