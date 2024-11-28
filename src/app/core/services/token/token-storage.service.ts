import { Injectable } from '@angular/core';

import { TokenModel } from '../../models/token.model';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  protected readonly key = 'auth_app_token';

  constructor() {}

  get(): TokenModel {
    const raw = localStorage.getItem(this.key);
    const token = JSON.parse(raw!);
    const newToken: TokenModel = {
      accessToken: '',
      userModel: null!,
    };

    if (token && token.accessToken && token.userModel) {
      newToken.userModel = token.userModel as UserModel;
      newToken.accessToken = token.accessToken;
    }

    return newToken;
  }

  set(token: TokenModel) {
    const raw = JSON.stringify(token);
    localStorage.setItem(this.key, raw);
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
