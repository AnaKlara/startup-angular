import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LoadingOverlayComponent } from './loading-overlay.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoadingOverlayComponent', () => {
  let component: LoadingOverlayComponent;
  let fixture: ComponentFixture<LoadingOverlayComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingOverlayComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(LoadingOverlayComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});
