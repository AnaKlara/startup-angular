import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarFormulariosComponent } from './consultar-formularios/consultar-formularios.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultarFormulariosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulariosRoutingModule {}
