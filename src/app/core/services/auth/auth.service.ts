import { Injectable } from '@angular/core';
import { Observable, map, of as observableOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TokenModel } from '../../models/token.model';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(protected tokenService: TokenService) {}

  getToken(): Observable<TokenModel> {
    return this.tokenService.get();
  }

  isAuthenticated(): Observable<boolean> {
    return this.getToken().pipe(map((token: TokenModel) => this.isValid(token)));
  }

  isAuthenticatedOrRefresh(): Observable<boolean> {
    return this.getToken().pipe(
      switchMap((token) => {
        if (token.accessToken) {
          return this.refreshToken('JWTStrategy', token).pipe(
            switchMap((res) => {
              if (this.isSuccess(res)) {
                return this.isAuthenticated();
              } else {
                return observableOf(false);
              }
            }),
          );
        } else {
          return observableOf(this.isValid(token));
        }
      }),
    );
  }

  refreshToken(strategyName: string, data?: any): Observable<TokenModel> {
    return new Observable<TokenModel>(data).pipe(
      switchMap((result: TokenModel) => {
        return this.processResultToken(result);
      }),
    );
  }

  private processResultToken(result: TokenModel) {
    if (this.isSuccess(result) && this.isValid(result)) {
      return this.tokenService.set(result).pipe(
        map((token: TokenModel) => {
          return result;
        }),
      );
    }

    return observableOf(result);
  }

  onTokenChange(): Observable<TokenModel> {
    return this.tokenService.tokenChange();
  }

  onAuthenticationChange(): Observable<boolean> {
    return this.onTokenChange().pipe(map((token: TokenModel) => this.isValid(token)));
  }

  logout(): Observable<any> {
    return this.tokenService.clear();
  }

  isValid(model: TokenModel): boolean {
    return !!model.accessToken && model.accessToken.length > 0;
  }

  isSuccess(model: TokenModel): boolean {
    return !!model.accessToken && model.accessToken.length > 0;
  }

  islogged() {
    return true;
  }
}
