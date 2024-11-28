import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import { SelectOption } from '../../models/selectOption.model';
import { OrgaoMapper } from './mappers/orgao/orgao-mapper';
import { OrgaosMock } from './mocks/orgaos.mock';

@Injectable({
  providedIn: 'root',
})
export class OrgaosService {
  orgaoMapper = new OrgaoMapper();

  orgaosConsulta(searchString: string): Observable<SelectOption[]> {
    return of(OrgaosMock).pipe(
      delay(2000),
      map((orgaos) => orgaos.map((orgao) => this.orgaoMapper.mapFrom(orgao))),
    );
  }
}
