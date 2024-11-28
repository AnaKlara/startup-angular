import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestrictSpecialCharsDirective } from './restrict-especial-chars.directive';

@Component({
  template: `<input type="text" appRestrictSpecialChars />`,
})
class TestComponent {}

describe('RestrictSpecialCharsDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, RestrictSpecialCharsDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges(); // Trigger initial data binding

    inputElement = fixture.nativeElement.querySelector('input');
  });

  it('should block special characters from being typed', () => {
    const event = new KeyboardEvent('keydown', { key: '@' });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    inputElement.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should allow alphanumeric characters to be typed', () => {
    const event = new KeyboardEvent('keydown', { key: 'A' });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    inputElement.dispatchEvent(event);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});
