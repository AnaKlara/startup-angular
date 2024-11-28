import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import {
  FormularioAutocompleteModel,
  RequestListaFormularioResumoModel,
  ResponsePageOfListaFormularioResumoModel,
} from '../../models/formulario-resumo.model';
import { SelectOption } from '../../models/selectOption.model';
import { OrgaoMapper } from '../orgaos/mappers/orgao/orgao-mapper';
import { OrgaosMock } from '../orgaos/mocks/orgaos.mock';
import { CampoMapper } from './mappers/campo/campo-mapper';
import { FormularioResumoMapper } from './mappers/formulario-resumo/formulario-resumo.mapper';
import { GerenciaMapper } from './mappers/gerencia/gerencia-mapper';
import { InstalacaoMapper } from './mappers/instalacao/instalacao-mapper';
import { LicencaMapper } from './mappers/licenca/licenca-mapper';
import { PocoMapper } from './mappers/poco/poco-mapper';
import { SituacaoMapper } from './mappers/situacao/situacao-mapper';
import { UsuarioMapper } from './mappers/usuario/usuario-mapper';
import { CamposMock } from './mocks/campos.mock';
import { GerenciasMock } from './mocks/gerencias.mock';
import { InstalacoesMock } from './mocks/instalacoes.mock';
import { LicencasMock } from './mocks/licencas.mock';
import { listaFormulariosResumo } from './mocks/lista-formulario-resumo.mock';
import { listaFormulariosAutocomplete } from './mocks/lista-formularios-autocomplete.mock';
import { PocosMock } from './mocks/pocos.mock';
import { SituacoesMock } from './mocks/situacoes.mock';
import { UsuariosMock } from './mocks/usuarios.mock';

@Injectable({
  providedIn: 'root',
})
export class FormulariosService {
  constructor() {}

  situacaoMapper = new SituacaoMapper();
  orgaoMapper = new OrgaoMapper();
  gerenciaMapper = new GerenciaMapper();
  usuarioMapper = new UsuarioMapper();
  campoMapper = new CampoMapper();
  pocoMapper = new PocoMapper();
  instalacaoMapper = new InstalacaoMapper();
  licencaMapper = new LicencaMapper();
  formularioResumoMapper = new FormularioResumoMapper();

  situacoesConsulta(): Observable<SelectOption[]> {
    // é o único caso que não precisa de parâmetros para consulta

    return of(SituacoesMock).pipe(
      delay(2000),
      map(situacoes => situacoes.map(situacao => this.situacaoMapper.mapFrom(situacao))),
    );
  }

  orgaosConsulta(searchString: string): Observable<SelectOption[]> {
    return of(OrgaosMock).pipe(
      delay(2000),
      map(orgaos => orgaos.map(orgao => this.orgaoMapper.mapFrom(orgao))),
    );
  }

  gerenciasConsulta(searchString: string): Observable<SelectOption[]> {
    return of(GerenciasMock).pipe(
      delay(2000),
      map(gerencias => gerencias.map(gerencia => this.gerenciaMapper.mapFrom(gerencia))),
    );
  }

  usuariosConsulta(searchString: string): Observable<SelectOption[]> {
    return of(UsuariosMock).pipe(
      delay(2000),
      map(usuarios => usuarios.map(usuario => this.usuarioMapper.mapFrom(usuario))),
    );
  }

  camposConsulta(searchString: string): Observable<SelectOption[]> {
    return of(CamposMock).pipe(
      delay(2000),
      map(campos => campos.map(campo => this.campoMapper.mapFrom(campo))),
    );
  }

  pocosConsulta(searchString: string): Observable<SelectOption[]> {
    return of(PocosMock).pipe(
      delay(2000),
      map(pocos => pocos.map(poco => this.pocoMapper.mapFrom(poco))),
    );
  }

  instalacoesConsulta(searchString: string): Observable<SelectOption[]> {
    return of(InstalacoesMock).pipe(
      delay(2000),
      map(instalacoes => instalacoes.map(instalacao => this.instalacaoMapper.mapFrom(instalacao))),
    );
  }

  licencasConsulta(searchString: string): Observable<SelectOption[]> {
    return of(LicencasMock).pipe(
      delay(2000),
      map(licencas => licencas.map(licenca => this.licencaMapper.mapFrom(licenca))),
    );
  }

  getListaFormulariosResumo(
    filtro: RequestListaFormularioResumoModel,
  ): Observable<ResponsePageOfListaFormularioResumoModel> {
    const responsePage: ResponsePageOfListaFormularioResumoModel = {
      listaFormularios: listaFormulariosResumo,
      totalItems: 56,
      totalPages: 6,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      hasPreviousPage: false,
      nextPage: 1,
      previousPage: undefined,
    };

    return of(responsePage)
      .pipe
      //delay(2000),
      // map((formulariosResumo) =>
      //   formulariosResumo.map((formulario) => this.formularioResumoMapper.mapFrom(formulario)),
      // ),
      ();
  }

  gelListaFormulariosAutocomplete(termo: string): Observable<FormularioAutocompleteModel[]> {
    return of(listaFormulariosAutocomplete).pipe(delay(500)); // delay de metade de 1 segundo para testar o loading
  }
}
