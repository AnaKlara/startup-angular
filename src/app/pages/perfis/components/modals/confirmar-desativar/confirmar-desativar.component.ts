import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirmar-desativar',
  templateUrl: './confirmar-desativar.component.html',
  styleUrl: './confirmar-desativar.component.scss',
})
export class ConfirmarDesativarComponent {
  @Output() confirmarDesativarEE = new EventEmitter<void>();
  @Output() cancelarDesativarEE = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<ConfirmarDesativarComponent>) {}
  confirmarDesativar() {
    this.confirmarDesativarEE.emit();
    this.dialogRef.close();
  }

  cancelarDesativar() {
    this.cancelarDesativarEE.emit();
    this.dialogRef.close();
  }
  closeModal() {
    this.dialogRef.close();
  }
}
