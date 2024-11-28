import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

import { SelectOption } from '../../models/selectOption.model';
import { BlocoMapper } from './mappers/bloco-mapper';
import { BlocosMock } from './mocks/blocos.mock';

@Injectable({
  providedIn: 'root',
})
export class BlocosService {
  blocoMapper = new BlocoMapper();

  blocosConsulta(searchString: string): Observable<SelectOption[]> {
    return of(BlocosMock).pipe(
      delay(2000),
      map((blocos) => blocos.map((bloco) => this.blocoMapper.mapFrom(bloco))),
    );
  }
}
