import { TokenModel } from 'src/app/core/models/token.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { TokenEntity } from '../entities/token-entity';

export class TokenMapper extends Mapper<TokenEntity, TokenModel> {
  mapFrom(param: TokenEntity): TokenModel {
    return {
      accessToken: param.accessToken,
      userModel: param.userModel,
    };
  }
  mapTo(param: TokenModel): TokenEntity {
    return {
      accessToken: param.accessToken,
      userModel: param.userModel,
    };
  }
}
