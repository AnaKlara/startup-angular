import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'solicitar-alteracao',
  templateUrl: './solicitar-alteracao.component.html',
  styleUrl: './solicitar-alteracao.component.scss',
})
export class SolicitarAlteracaoComponent {
  @Output() confirmarEE = new EventEmitter<void>();
  @Output() cancelarEE = new EventEmitter<void>();

  solicitacao = new FormGroup({
    comentario: new FormControl('', Validators.maxLength(500)),
    anexos: new FormControl([
      'Arquivo_email_anexo_2024.pdf',
      'Arquivo_documento_novo_area.word',
      'documento_planilha_controle_fiscal_mar_2024.xls',
    ]), // TODO: remover valores. Foram colocados para fins de teste -> new FormControl([]),
  });

  constructor(public dialogRef: MatDialogRef<SolicitarAlteracaoComponent>) {}

  get comentarioLenth() {
    return this.solicitacao.get('comentario')?.value?.length;
  }

  get anexosFormValue() {
    return this.solicitacao.get('anexos')?.value;
  }

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
  removerAnexo(index: number): void {
    const currentValues = this.anexosFormValue || [];
    currentValues.splice(index, 1);
    this.solicitacao.get('anexos')?.setValue(currentValues);
  }
}
