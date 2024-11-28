import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckpointPageComponent } from './checkpoint-page/checkpoint-page.component';

const routes: Routes = [
  {
    path: '',
    component: CheckpointPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckpointRoutingModule {}
