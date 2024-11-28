import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { UnauthorizedPageComponent } from './shared/components/unauthorized-page/unauthorized-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'chart',
    loadChildren: () => import('./pages/charts/chart.module').then(m => m.ChartModule),
  },
  {
    path: 'checkpoint',
    loadChildren: () => import('./pages/checkpoint/checkpoint.module').then(m => m.CheckpointModule),
  },
  {
    path: 'premissas',
    loadChildren: () => import('./pages/premissas/premissas.module').then(m => m.PremissasModule),
  },
  {
    path: 'formularios',
    loadChildren: () => import('./pages/formularios/formularios.module').then(m => m.FormulariosModule),
  },
  {
    path: 'perfis',
    loadChildren: () => import('./pages/perfis/perfis.module').then(m => m.PerfisModule),
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
