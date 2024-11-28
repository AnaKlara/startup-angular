import { UserModel } from 'src/app/core/models/user.model';
import { Mapper } from 'src/app/shared/base/mapper';
import { UserEntity } from '../entities/user-entity';

export class UserMapper extends Mapper<UserEntity, UserModel> {
  mapFrom(param: UserEntity): UserModel {
    return {
      id: param.id,
      username: param.username,
      password: param.password,
    };
  }
  mapTo(param: UserModel): UserEntity {
    return {
      id: param.id,
      username: param.username,
      password: param.password,
    };
  }
}
