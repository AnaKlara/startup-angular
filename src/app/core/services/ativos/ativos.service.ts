import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import { SelectOption } from '../../models/selectOption.model';
import { AtivoMapper } from './mappers/ativo-mapper';
import { AtivosMock } from './mocks/ativos.mock';

@Injectable({
  providedIn: 'root',
})
export class AtivosService {
  ativoMapper = new AtivoMapper();

  ativosConsulta(searchString: string): Observable<SelectOption[]> {
    return of(AtivosMock).pipe(
      delay(2000),
      map((ativos) => ativos.map((ativo) => this.ativoMapper.mapFrom(ativo))),
    );
  }
}
