import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { filter, share } from 'rxjs/operators';

import { TokenModel } from '../../models/token.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  protected token$: BehaviorSubject<TokenModel> = new BehaviorSubject<TokenModel>(null!);

  constructor(protected tokenStorageService: TokenStorageService) {}

  tokenChange(): Observable<TokenModel> {
    return this.token$.pipe(
      filter(value => !!value),
      share(),
    );
  }

  set(token: TokenModel): Observable<TokenModel> {
    this.tokenStorageService.set(token);
    this.publishStoredToken();
    return observableOf(token);
  }

  get(): Observable<TokenModel> {
    const token = this.tokenStorageService.get();
    return observableOf(token);
  }

  clear(): Observable<null> {
    this.tokenStorageService.clear();
    this.publishStoredToken();
    return observableOf(null);
  }

  protected publishStoredToken() {
    this.token$.next(this.tokenStorageService.get());
  }
}
