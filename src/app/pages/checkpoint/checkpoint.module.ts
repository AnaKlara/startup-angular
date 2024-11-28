import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CheckpointService } from 'src/app/core/services/checkpoint/checkpoint.service';

import { CheckpointPageComponent } from './checkpoint-page/checkpoint-page.component';
import { CheckpointRoutingModule } from './checkpoint-routing.module';

@NgModule({
  declarations: [CheckpointPageComponent],
  imports: [
    CommonModule,
    CheckpointRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
  ],
  providers: [CheckpointService],
})
export class CheckpointModule {}
