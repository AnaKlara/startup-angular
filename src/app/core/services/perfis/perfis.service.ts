import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { LogModel } from '../../models/perfil-log.model';
import {
  RequestPaginaDeListaDePerfisResumoEntity,
  ResponsePaginaDeListaDePerfisResumoEntity,
} from './entities/perfil-resumo.entity';
import { PerfilSelect } from './entities/perfil-select';
import { PerfilEntity } from './entities/perfil.entity';
import {
  RequestPaginaDeListaDeSolicitacoesResumoEntity,
  ResponsePaginaDeListaDeSolicitacoesResumidas,
} from './entities/solicitacao.entity';
import { PerfilResumoMapper } from './mappers/perfil-resumo/perfil-resumo.mapper';
import { listaPerfisResumidos } from './mocks/lista-perfis-resumidos.mock';
import { listaSolicitacoesResumidos } from './mocks/lista-solicitacoes.mock';
import { logsMock } from './mocks/logs.mock';
import { perfilSelectMock } from './mocks/perfil-select.mock';
import { perfilMock } from './mocks/perfil.mock';

@Injectable({
  providedIn: 'root',
})
export class PerfisService {
  constructor() {}

  perfilResumoMapper = new PerfilResumoMapper();

  getPaginaDeListaDePerfisResumidos(
    filtro: RequestPaginaDeListaDePerfisResumoEntity,
  ): Observable<ResponsePaginaDeListaDePerfisResumoEntity> {
    const responsePage: ResponsePaginaDeListaDePerfisResumoEntity = {
      listaPerfisResumidos: listaPerfisResumidos,
      filters: {
        search: filtro.filters.search,
        perfilSede: filtro.filters.perfilSede,
        tipoPerfil: filtro.filters.tipoPerfil,
        lotacao: filtro.filters.lotacao,
        orgao: filtro.filters.orgao,
        formulario: filtro.filters.formulario,
      },
      orderBy: filtro.orderBy,
      totalItems: 56,
      totalPages: 6,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      hasPreviousPage: false,
      nextPage: 1,
      previousPage: undefined,
    };
    return of(responsePage);
  }

  getPerfilDeUsuario(chaveDeUsuario: string): Observable<PerfilEntity> {
    return of(perfilMock);
  }

  updateNotificacaoAtivo(id_notificacaoo: string, ativo: boolean): Observable<unknown> {
    return of('...');
  }

  getLogsPerfil(chaveDeUsuario: string): Observable<LogModel[]> {
    return of(logsMock).pipe(delay(500));
  }
  desativarPerfil(chaveDeUsuario: string): Observable<any> {
    return of('...').pipe(delay(500));
  }

  getPaginaDeListaDeSolicitacoesResumidas(
    filtro: RequestPaginaDeListaDeSolicitacoesResumoEntity,
  ): Observable<ResponsePaginaDeListaDeSolicitacoesResumidas> {
    const responsePage: ResponsePaginaDeListaDeSolicitacoesResumidas = {
      listaSolicitacoesResumidas: listaSolicitacoesResumidos,
      filters: {
        search: filtro.filters.search,
        perfilSede: filtro.filters.perfilSede,
        tipoPerfil: filtro.filters.tipoPerfil,
        lotacao: filtro.filters.lotacao,
        orgao: filtro.filters.orgao,
        formulario: filtro.filters.formulario,
      },
      orderBy: filtro.orderBy,
      totalItems: 30,
      totalPages: 3,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      hasPreviousPage: false,
      nextPage: 1,
      previousPage: undefined,
    };
    return of(responsePage).pipe(delay(500));
  }

  getPerfilSelect(text: string): Observable<PerfilSelect[]> {
    return of(perfilSelectMock).pipe(delay(500));
  }

  getPerfilByFormulario(formularioChave: string): Observable<PerfilSelect[]> {
    return of(perfilSelectMock).pipe(delay(500));
  }
}
