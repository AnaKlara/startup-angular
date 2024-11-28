import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { SuportCardComponent } from './suport-card.component';

describe('SuportCardComponent', () => {
  let component: SuportCardComponent;
  let fixture: ComponentFixture<SuportCardComponent>;
  let toggleSubject: Subject<void>;

  beforeEach(async () => {
    toggleSubject = new Subject<void>();

    await TestBed.configureTestingModule({
      declarations: [SuportCardComponent],
      providers: [{ provide: ElementRef, useValue: { nativeElement: document.createElement('div') } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuportCardComponent);
    component = fixture.componentInstance;
    component.toggleCallListener = toggleSubject.asObservable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle visibility when toggleCallListener emits', () => {
    expect(component.isVisible).toBe(false);
    toggleSubject.next();
    expect(component.isVisible).toBe(true);
    toggleSubject.next();
    expect(component.isVisible).toBe(false);
  });

  it('should hide when clicking outside the component', () => {
    component.isVisible = true;
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(component.isVisible).toBe(false);
  });

  it('should not hide when clicking inside the component', () => {
    component.isVisible = true;
    const divElement = fixture.debugElement.query(By.css('div')).nativeElement;
    divElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(component.isVisible).toBe(true);
  });

  it('should unsubscribe from the observable on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.eventsSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
