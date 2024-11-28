import { PremissaModel } from 'src/app/core/models/premissa.model';
import { Mapper } from 'src/app/shared/base/mapper';
import { PremissaEntity } from '../entities/premissa-entity';

export class PremissaMapper extends Mapper<PremissaEntity, PremissaModel> {
  mapFrom(param: PremissaEntity): PremissaModel {
    return {
      id: param.id,
      name: param.name,
      version: param.version,
      type: param.type,
      associate: param.associate,
      cycle: param.cycle,
      description: param.description,
    };
  }
  mapTo(param: PremissaModel): PremissaEntity {
    return {
      id: param.id,
      name: param.name,
      version: param.version,
      type: param.type,
      associate: param.associate,
      cycle: param.cycle,
      description: param.description,
    };
  }
}
