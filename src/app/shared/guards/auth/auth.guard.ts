import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const toastService: ToastrService = inject(ToastrService);
  const router: Router = inject(Router);
  // console.log('Passou pelo guard');
  if (!authService.islogged()) {
    router.navigate(['auth']);
    toastService.info('Efetue o login');
    return false;
  } else {
    return true;
  }
};
