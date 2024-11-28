import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatRippleModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { DateFormats } from 'src/app/shared/config/am-date-formats';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultarFormulariosComponent } from './consultar-formularios/consultar-formularios.component';
import { ResultadoConsultaComponent } from './consultar-formularios/resultado-consulta/resultado-consulta.component';
import { FiltroDeResultadoComponent } from './consultar-formularios/tabela-formularios/filtro-de-resultado/filtro-de-resultado.component';
import { TabelaFormulariosComponent } from './consultar-formularios/tabela-formularios/tabela-formularios.component';
import { UltimosFormulariosComponent } from './consultar-formularios/ultimos-formularios/ultimos-formularios.component';
import { FormulariosRoutingModule } from './formularios-routing.module';

@NgModule({
  declarations: [
    TabelaFormulariosComponent,
    ConsultarFormulariosComponent,
    UltimosFormulariosComponent,
    ResultadoConsultaComponent,
    FiltroDeResultadoComponent,
  ],
  imports: [
    CommonModule,
    FormulariosRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats },
  ],
})
export class FormulariosModule {}
