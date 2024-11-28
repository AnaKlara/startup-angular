import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedPageComponent } from './unauthorized-page.component';

describe('UnauthorizedPageComponent', () => {
  let component: UnauthorizedPageComponent;
  let fixture: ComponentFixture<UnauthorizedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnauthorizedPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Usuário não autorizado.');
  });
});
