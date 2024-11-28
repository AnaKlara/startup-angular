import { SelectOption } from 'src/app/core/models/selectOption.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { LicencaEntity } from '../../Entities/licenca.entity';

export class LicencaMapper extends Mapper<LicencaEntity, SelectOption> {
  mapFrom(param: LicencaEntity): SelectOption {
    return {
      value: param.codigoLicenca,
      label: param.nomeLicenca,
    };
  }
}
