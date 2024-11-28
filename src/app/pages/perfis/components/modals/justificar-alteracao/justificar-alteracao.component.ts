import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'justificar-alteracao',
  templateUrl: './justificar-alteracao.component.html',
  styleUrl: './justificar-alteracao.component.scss',
})
export class JustificarAlteracaoComponent {
  @Output() confirmarEE = new EventEmitter<void>();
  @Output() cancelarEE = new EventEmitter<void>();

  justificativa = new FormGroup({
    comentario: new FormControl('', Validators.maxLength(500)),
    anexos: new FormControl([
      'Arquivo_email_anexo_2024.pdf',
      'Arquivo_documento_novo_area.word',
      'documento_planilha_controle_fiscal_mar_2024.xls',
    ]), // TODO: remover valores. Foram colocados para fins de teste -> new FormControl([]),
  });

  constructor(public dialogRef: MatDialogRef<JustificarAlteracaoComponent>) {}

  get comentarioLenth() {
    return this.justificativa.get('comentario')?.value?.length;
  }

  get anexosFormValue() {
    return this.justificativa.get('anexos')?.value;
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
    this.justificativa.get('anexos')?.setValue(currentValues);
  }
}