import { UserModel } from './user.model';

export interface TokenModel {
  accessToken: string;
  userModel: UserModel;
}
