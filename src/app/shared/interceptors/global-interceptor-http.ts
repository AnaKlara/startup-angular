import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import {
//   CarregarNotificacaoUtil,
//   NotificacaoService,
// } from 'src/domain/util/carregar-notificacao-util';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  // mensagemNotificacao!: ToastContent;

  constructor(
    private toastr: ToastrService,
    // private notificationService :NotificationService,
    // private notificacao: CarregarNotificacaoUtil,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        let caption = '';
        // Erro de conexao com o servidor
        if (error.status == 0) {
          this.toastr.error('ERRO', 'Ocorreu um erro ao tentar se comunicar com o servidor');
          return throwError(() => error);
        }

        // Erro do lado do servidor
        if (error.error.traceId != undefined && error.error.traceId > 0) {
          errorMessage = `Tente novamente ou entre em contato com o gestor do sistema.`;
          caption = `ID: ${error.error.traceId}`;
          this.toastr.error('ERRO ' + caption, errorMessage);
        }

        // Erro do lado do cliente
        return throwError(() => error);
      }),
    );
  }

  getToken(): string {
    // Ver outra forma de validar a Sessao do Local Storage
    const usr = localStorage.getItem('user');
    if (usr) {
      const usrObj = JSON.parse(usr);
      return usrObj.token;
    } else {
      return '';
    }
  }
}
