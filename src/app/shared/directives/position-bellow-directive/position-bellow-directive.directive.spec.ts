import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PositionBelowDirective } from './position-bellow-directive.directive';

describe('PositionBelowDirective', () => {
  let directive: PositionBelowDirective;
  let element: HTMLElement;
  let compiledComponent: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionBelowDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    directive = new PositionBelowDirective(new ElementRef(document.createElement('div')));
    element = document.createElement('div');
    compiledComponent = document.createElement('div');
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
