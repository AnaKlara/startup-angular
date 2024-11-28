import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartPageComponent } from './chart-page/chart-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChartPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartRoutingModule {}
