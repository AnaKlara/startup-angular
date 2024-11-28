import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NameAbreviationPipe } from 'src/app/shared/pipes/name-abreviation/name-abreviation.pipe';
import { UserProfileCardComponent } from './user-profile-card.component';

class MockElementRef implements ElementRef {
  nativeElement = {};
}
const mockActivatedRoute = {
  params: {
    subscribe: jest.fn(),
  },
};

describe('UserProfileCardComponent', () => {
  let component: UserProfileCardComponent;
  let fixture: ComponentFixture<UserProfileCardComponent>;
  let toggleCallListener: Observable<void>;

  beforeEach(async () => {
    toggleCallListener = of();

    await TestBed.configureTestingModule({
      declarations: [UserProfileCardComponent, NameAbreviationPipe],
      imports: [RouterModule],
      providers: [
        { provide: ElementRef, useClass: MockElementRef },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileCardComponent);
    component = fixture.componentInstance;
    component.toggleCallListener = toggleCallListener;
    component.usuario = {
      nome: 'Ana Clara',
      email: 'teste@mail.com',
      chave: 'FHF1',
      perfil: 'A',
      token: 'asd@#@$sdgqWE#$@fkjhegdvfnjyhagevdkfjnhsfs',
      version: '1.0.0',
      expiracao: '10/06/12',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isVisible when toggleFloatingDiv is called', () => {
    component.isVisible = false;
    component.toggleFloatingDiv();
    expect(component.isVisible).toBe(true);

    component.toggleFloatingDiv();
    expect(component.isVisible).toBe(false);
  });

  it('should hide the floating div when document is clicked outside', () => {
    component.isVisible = true;
    document.dispatchEvent(
      new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(component.isVisible).toBe(false);
  });

  it('should subscribe to toggleCallListener on init', () => {
    const subscriptionSpy = jest.spyOn(toggleCallListener, 'subscribe');
    component.ngOnInit();
    expect(subscriptionSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from toggleCallListener on destroy', () => {
    component.ngOnInit();
    const unsubscribeSpy = jest.spyOn(component.eventsSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
