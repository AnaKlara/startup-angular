import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { usuariosMock } from './mock/usuarios.mock';
import { UsuarioResumo } from './usuario.entity';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor() {}

  gelListaUsuariosAutocomplete(termo: string): Observable<UsuarioResumo[]> {
    return of(usuariosMock).pipe(delay(500)); // delay de metade de 1 segundo para testar o loading
  }
}
