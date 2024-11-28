import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FloatContainerComponent } from './float-container.component';

describe('FloatContainerComponent', () => {
  let component: FloatContainerComponent;
  let fixture: ComponentFixture<FloatContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FloatContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatContainerComponent);
    component = fixture.componentInstance;
    component.toggleFloatContainerParentEvent = of();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleFloatContainer works', () => {
    component.toggleFloatContainer();
    expect(component.isOpen).toBeFalsy();
  });

  it('closeButtonClick works', () => {
    component.closeButtonClick();
    expect(component.isOpen).toBeFalsy();
  });
});
