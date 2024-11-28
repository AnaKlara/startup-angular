import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarClonarComponent } from './confirmar-clonar.component';

describe('ConfirmarClonarComponent', () => {
  let component: ConfirmarClonarComponent;
  let fixture: ComponentFixture<ConfirmarClonarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarClonarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarClonarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
