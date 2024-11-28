import { UserModel } from 'src/app/core/models/user.model';

export interface TokenEntity {
  accessToken: string;
  userModel: UserModel;
}
