import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-premissas-dialog',
  templateUrl: './premissas-dialog.component.html',
  styleUrls: ['./premissas-dialog.component.scss'],
})
export class PremissasDialogComponent {
  constructor(public dialogRef: MatDialogRef<PremissasDialogComponent>) {}

  // You can include methods or logic specific to the modal component here

  closeModal(): void {
    // Close the modal when the "Close" button is clicked
    this.dialogRef.close();
  }

  onFileSelected(fileInput: HTMLInputElement): void {
    const file = fileInput.files?.[0];
    if (file) {
      console.log('Selected File:', file);
      // You can perform additional actions with the selected file if needed
    }
  }
}
