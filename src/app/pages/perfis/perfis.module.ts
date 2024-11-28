import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';

import { BuscarPerfilComponent } from './buscar-perfil/buscar-perfil.component';
import { FormularioQtdPipe } from './buscar-perfil/pipes/formulario-qtd/formulario-qtd.pipe';
import { OrgaoQtdPipe } from './buscar-perfil/pipes/orgao-qtd/orgao-qtd.pipe';
import { PerfilQtdPipe } from './buscar-perfil/pipes/perfil-qtd/perfil-qtd.pipe';
import { SolicitacaoQtdPipe } from './buscar-perfil/pipes/solicitacao-qtd/solicitacao-qtd.pipe';
import { TabelaPerfilComponent } from './buscar-perfil/tabela-perfil/tabela-perfil.component';
import { TabelaSolicitacoesComponent } from './buscar-perfil/tabela-solicitacoes/tabela-solicitacoes.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ClonarComponent } from './clonar/clonar.component';
import { CardsLogContainerComponent } from './components/cards-log-container/cards-log-container.component';
import { FloatContainerComponent } from './components/float-container/float-container.component';
import { InputChipsListaFormularioComponent } from './components/input-chips-lista-formulario/input-chips-lista-formulario.component';
import { InputListaNotificacaoComponent } from './components/input-lista-notificacao/input-lista-notificacao.component';
import { InputListaPermissaoComponent } from './components/input-lista-permissao/input-lista-permissao.component';
import { InputTipoFormularioComponent } from './components/input-tipo-formulario/input-tipo-formulario.component';
import { AlterarNotificacoesComponent } from './components/modals/alterar-notificacoes/alterar-notificacoes.component';
import { AlterarPermissoesComponent } from './components/modals/alterar-permissoes/alterar-permissoes.component';
import { ConfirmarClonarComponent } from './components/modals/confirmar-clonar/confirmar-clonar.component';
import { ConfirmarDesativarComponent } from './components/modals/confirmar-desativar/confirmar-desativar.component';
import { DescartarAlteracaoComponent } from './components/modals/descartar-alteracao/descartar-alteracao.component';
import { JustificarAlteracaoComponent } from './components/modals/justificar-alteracao/justificar-alteracao.component';
import { SolicitarAlteracaoComponent } from './components/modals/solicitar-alteracao/solicitar-alteracao.component';
import { SelectCriadoPorComponent } from './components/select-criado-por/select-criado-por.component';
import { UploadableAreaComponent } from './components/uploadable-area/uploadable-area.component';
import { EditarComponent } from './editar/editar.component';
import { PerfisRoutingModule } from './perfis-routing.module';
import { VisualizarComponent } from './visualizar/visualizar.component';

@NgModule({
  declarations: [
    BuscarPerfilComponent,
    TabelaPerfilComponent,
    TabelaSolicitacoesComponent,
    VisualizarComponent,
    EditarComponent,
    ClonarComponent,
    CardsLogContainerComponent,
    CadastrarComponent,
    AlterarNotificacoesComponent,
    AlterarPermissoesComponent,
    ConfirmarClonarComponent,
    ConfirmarDesativarComponent,
    DescartarAlteracaoComponent,
    JustificarAlteracaoComponent,
    SolicitarAlteracaoComponent,
    TabelaSolicitacoesComponent,
    FloatContainerComponent,
    FormularioQtdPipe,
    OrgaoQtdPipe,
    PerfilQtdPipe,
    SolicitacaoQtdPipe,
    InputListaNotificacaoComponent,
    InputListaPermissaoComponent,
    InputChipsListaFormularioComponent,
    InputTipoFormularioComponent,
    SelectCriadoPorComponent,
    UploadableAreaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PerfisRoutingModule,
    SharedModule,
    MatTabsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInput,
    MatIconModule,
    MatMenuModule,
    MatCheckbox,
    MatPaginator,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSortModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatRippleModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
  ],
})
export class PerfisModule {}
