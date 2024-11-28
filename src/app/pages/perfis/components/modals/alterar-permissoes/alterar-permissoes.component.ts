import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'alterar-permissoes',
  templateUrl: './alterar-permissoes.component.html',
  styleUrl: './alterar-permissoes.component.scss',
})
export class AlterarPermissoesComponent {
  @Output() confirmarEE = new EventEmitter<void>();
  @Output() cancelarEE = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<AlterarPermissoesComponent>) {}

  perfilForm = new FormGroup({
    chave: new FormControl(''),
    ativo: new FormControl(false),
    tipoPerfil: new FormControl(''),
    perfilSede: new FormControl(false),
    permissoes: new FormGroup({
      orgaos: new FormArray([]),
      blocos: new FormArray([]),
      ativos: new FormArray([]),
    }),
    notificacoes: new FormArray([]),
  });

  confirmar() {
    this.confirmarEE.emit();
    this.dialogRef.close();
  }

  cancelar() {
    this.cancelarEE.emit();
    this.dialogRef.close();
  }
  closeModal() {
    this.dialogRef.close();
  }
}
