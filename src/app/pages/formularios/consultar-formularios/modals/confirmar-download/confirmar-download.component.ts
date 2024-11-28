import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirmar-download',
  templateUrl: './confirmar-download.component.html',
  styleUrl: './confirmar-download.component.scss',
})
export class ConfirmarDownloadComponent {
  @Output() confirmarDownloadEE = new EventEmitter<void>();
  @Output() cancelarDownloadEE = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<ConfirmarDownloadComponent>) {}

  confirmarDownload() {
    this.confirmarDownloadEE.emit();
    this.dialogRef.close();
  }

  cancelarDownload() {
    this.cancelarDownloadEE.emit();
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
