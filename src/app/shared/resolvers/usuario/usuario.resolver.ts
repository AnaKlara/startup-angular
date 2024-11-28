import { inject } from '@angular/core';
import { ResolveFn, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of } from 'rxjs';
import { PerfilEntity } from 'src/app/core/services/perfis/entities/perfil.entity';
import { PerfisService } from 'src/app/core/services/perfis/perfis.service';

export const UsuarioResolver: ResolveFn<Observable<PerfilEntity | UrlTree>> = (route, state) => {
  const perfisService = inject(PerfisService);
  const router = inject(Router);
  const chaveDeUsuario: string | null = route.paramMap.get('chave-de-usuario');
  const toastr = inject(ToastrService);

  if (chaveDeUsuario && typeof chaveDeUsuario === 'string' && chaveDeUsuario.length === 4) {
    return perfisService.getPerfilDeUsuario(chaveDeUsuario).pipe(
      map((usuario: PerfilEntity) => {
        if (usuario && typeof usuario === 'object') {
          return usuario;
        } else {
          return router.createUrlTree(['/perfis']);
        }
      }),
      catchError(() => {
        toastr.warning(`Não foi possível receber dados do usuário.`);
        return of(router.createUrlTree(['/perfis']));
      }),
    );
  } else {
    return of(router.createUrlTree(['/perfis']));
  }
};
