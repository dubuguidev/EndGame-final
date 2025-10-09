import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lgpd-dialog',
  standalone: true,
  imports: [
    MatDialogModule, // Essencial para os componentes de dialog
    MatButtonModule
  ],
  templateUrl: './lgpd.html',
  styleUrls: ['./lgpd.scss']
})
export class LgpdDialogComponent {
  // Injetamos uma referência ao próprio dialog para podermos fechá-lo
  constructor(public dialogRef: MatDialogRef<LgpdDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}