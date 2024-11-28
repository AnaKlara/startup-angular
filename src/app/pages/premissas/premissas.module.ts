import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PremissasDialogComponent } from './premissas-dialog/premissas-dialog.component';
import { PremissasPageComponent } from './premissas-page/premissas-page.component';
import { PremissasRoutingModule } from './premissas-routing.module';

@NgModule({
  declarations: [PremissasPageComponent, PremissasDialogComponent],
  imports: [
    CommonModule,
    CommonModule,
    PremissasRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
  ],
})
export class PremissasModule {}
