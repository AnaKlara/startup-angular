import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'descartar-alteracao',
  templateUrl: './descartar-alteracao.component.html',
  styleUrl: './descartar-alteracao.component.scss',
})
export class DescartarAlteracaoComponent {
  @Output() confirmarDescartarEE = new EventEmitter<void>();
  @Output() cancelarDescartarEE = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<DescartarAlteracaoComponent>) {}
  confirmarDescartar() {
    this.confirmarDescartarEE.emit();
    this.dialogRef.close();
  }

  cancelarDescartar() {
    this.cancelarDescartarEE.emit();
    this.dialogRef.close();
  }
  closeModal() {
    this.dialogRef.close();
  }
}
