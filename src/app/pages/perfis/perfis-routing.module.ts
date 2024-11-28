import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChaveDeUsuarioGuard } from 'src/app/shared/guards/chave-usuario/chave-usuario.guard';
import { UsuarioResolver } from 'src/app/shared/resolvers/usuario/usuario.resolver';

import { BuscarPerfilComponent } from './buscar-perfil/buscar-perfil.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ClonarComponent } from './clonar/clonar.component';
import { EditarComponent } from './editar/editar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';

const routes: Routes = [
  {
    path: '',
    component: BuscarPerfilComponent,
  },
  {
    path: 'cadastro',
    component: CadastrarComponent,
  },
  {
    path: ':chave-de-usuario',
    redirectTo: ':chave-de-usuario/visualizar',
  },
  {
    path: ':chave-de-usuario/visualizar',
    component: VisualizarComponent,
    canActivate: [ChaveDeUsuarioGuard],
    resolve: {
      usuario: UsuarioResolver,
    },
  },
  {
    path: ':chave-de-usuario/editar',
    component: EditarComponent,
    canActivate: [ChaveDeUsuarioGuard],
    resolve: {
      usuario: UsuarioResolver,
    },
  },
  {
    path: ':chave-de-usuario/clonar',
    component: ClonarComponent,
    canActivate: [ChaveDeUsuarioGuard],
    resolve: {
      usuario: UsuarioResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfisRoutingModule {}
