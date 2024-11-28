import { UnitModel } from 'src/app/core/models/unit.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { UnitEntity } from '../entities/unit-entity';

export class UnitMapper extends Mapper<UnitEntity, UnitModel> {
  mapFrom(param: UnitEntity): UnitModel {
    return {
      id: param.id,
      name: param.name,
    };
  }
  mapTo(param: UnitModel): UnitEntity {
    return {
      id: param.id,
      name: param.name,
    };
  }
}
