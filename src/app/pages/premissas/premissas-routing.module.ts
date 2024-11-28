import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PremissasPageComponent } from './premissas-page/premissas-page.component';

const routes: Routes = [
  {
    path: '',
    component: PremissasPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremissasRoutingModule {}
