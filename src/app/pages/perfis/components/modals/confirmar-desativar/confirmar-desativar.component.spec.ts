import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { jest } from '@jest/globals';

import { ConfirmarDesativarComponent } from './confirmar-desativar.component';

describe('ConfirmarDesativarComponent', () => {
  let component: ConfirmarDesativarComponent;
  let fixture: ComponentFixture<ConfirmarDesativarComponent>;
  let dialogRefSpy: jest.Mocked<MatDialogRef<ConfirmarDesativarComponent>>;

  beforeEach(async () => {
    dialogRefSpy = {
      close: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [ConfirmarDesativarComponent],
      imports: [MatIconModule],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarDesativarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmarDesativarEE event and close the dialog when confirmarDesativar is called', () => {
    jest.spyOn(component.confirmarDesativarEE, 'emit');

    component.confirmarDesativar();

    expect(component.confirmarDesativarEE.emit).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should emit cancelarDesativarEE event and close the dialog when cancelarDesativar is called', () => {
    jest.spyOn(component.cancelarDesativarEE, 'emit');

    component.cancelarDesativar();

    expect(component.cancelarDesativarEE.emit).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog when closeModal is called', () => {
    component.closeModal();

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
