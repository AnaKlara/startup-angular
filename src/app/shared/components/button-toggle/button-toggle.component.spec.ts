import { forwardRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { ButtonToggleComponent } from './button-toggle.component';

describe('ButtonToggleComponent', () => {
  let component: ButtonToggleComponent;
  let fixture: ComponentFixture<ButtonToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonToggleComponent],
      imports: [MatIconModule],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => ButtonToggleComponent),
          multi: true,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonToggleComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isActive when toggle() is called', () => {
    component.toggle();
    expect(component.isActive).toBe(true);

    component.toggle();
    expect(component.isActive).toBe(false);
  });

  it('should call onChange and onTouched on toggle()', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const onTouchedSpy = jest.spyOn(component, 'onTouched');

    component.toggle();

    expect(onChangeSpy).toHaveBeenCalledWith(true);
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should write value using writeValue()', () => {
    component.writeValue(true);
    expect(component.isActive).toBe(true);

    component.writeValue(false);
    expect(component.isActive).toBe(false);
  });

  it('should render the label inside the button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent).toContain('Test Label');
  });

  it('should render the mat-icon when isActive is true', () => {
    let iconElement = fixture.debugElement.query(By.css('mat-icon'));
    expect(iconElement).toBeNull();

    component.toggle();
    fixture.detectChanges();

    iconElement = fixture.debugElement.query(By.css('mat-icon'));
    expect(iconElement).not.toBeNull();
    expect(iconElement.nativeElement.textContent).toContain('close');
  });
});
