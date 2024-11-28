import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';

import { InputListaNotificacaoComponent } from '../../input-lista-notificacao/input-lista-notificacao.component';
import { AlterarNotificacoesComponent } from './alterar-notificacoes.component';

describe('AlterarNotificacoesComponent', () => {
  let component: AlterarNotificacoesComponent;
  let fixture: ComponentFixture<AlterarNotificacoesComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<AlterarNotificacoesComponent>>;
  let toastService: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
    } as any;

    toastService = {
      error: jest.fn(),
      success: jest.fn(),
      warning: jest.fn(),
      info: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    await TestBed.configureTestingModule({
      declarations: [AlterarNotificacoesComponent, InputListaNotificacaoComponent],
      imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatFormFieldModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ToastrService, useValue: toastService },
        provideAnimations(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarNotificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmarEE and close the dialog on confirmar()', () => {
    const emitSpy = jest.spyOn(component.confirmarEE, 'emit');

    component.confirmar();

    expect(emitSpy).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should emit cancelarEE and close the dialog on cancelar()', () => {
    const emitSpy = jest.spyOn(component.cancelarEE, 'emit');

    component.cancelar();

    expect(emitSpy).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog on closeModal()', () => {
    component.closeModal();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
