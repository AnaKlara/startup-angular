import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAbreviationPipe } from '../../pipes/name-abreviation/name-abreviation.pipe';
import { SuportCardComponent } from './components/suport-card/suport-card.component';
import { UserProfileCardComponent } from './components/user-profile-card/user-profile-card.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, UserProfileCardComponent, NameAbreviationPipe, SuportCardComponent],
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('helpButtonClick works', () => {
    component.helpButtonClick();
  });

  it('notificationButtonClick works', () => {
    component.notificationButtonClick();
  });

  it('userButtonClick works', () => {
    component.toggleFloatingDiv();
  });
});
