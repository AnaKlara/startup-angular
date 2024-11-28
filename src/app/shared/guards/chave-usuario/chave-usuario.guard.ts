import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const ChaveDeUsuarioGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router = inject(Router);
  const chaveDeUsuario = route.paramMap.get('chave-de-usuario');
  const toastr = inject(ToastrService);

  if (chaveDeUsuario && /^[A-Z0-9]{4}$/.test(chaveDeUsuario)) {
    return true;
  } else {
    toastr.warning(`Chave de usuário ${chaveDeUsuario} inválida.`);
    return router.createUrlTree(['/perfis']);
  }
};
