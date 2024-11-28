import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimations } from '@angular/platform-browser/animations';

import { FiltroDeResultadoComponent } from './filtro-de-resultado.component';

describe('FiltroDeResultadoComponent', () => {
  let component: FiltroDeResultadoComponent;
  let fixture: ComponentFixture<FiltroDeResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroDeResultadoComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule,
      ],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroDeResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
