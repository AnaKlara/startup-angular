import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerEventsSubject: Subject<any>;
  let matDialogMock: jest.Mocked<MatDialog>;

  beforeEach(async () => {
    routerEventsSubject = new Subject<any>();

    const routerMock = {
      events: routerEventsSubject.asObservable(),
    } as jest.Mocked<Router>;

    matDialogMock = {
      closeAll: jest.fn(),
    } as unknown as jest.Mocked<MatDialog>;

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule.forRoot([]), SharedModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: MatDialog, useValue: matDialogMock },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to true when showLoading is called', () => {
    component.showLoading();
    expect(component.loading).toBe(true);
  });
});
