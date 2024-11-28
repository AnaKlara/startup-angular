import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'alterar-notificacoes',
  templateUrl: './alterar-notificacoes.component.html',
  styleUrl: './alterar-notificacoes.component.scss',
})
export class AlterarNotificacoesComponent {
  @Output() confirmarEE = new EventEmitter<void>();
  @Output() cancelarEE = new EventEmitter<void>();

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

  constructor(public dialogRef: MatDialogRef<AlterarNotificacoesComponent>) {}
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
