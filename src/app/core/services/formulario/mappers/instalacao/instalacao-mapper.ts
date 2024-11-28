import { SelectOption } from 'src/app/core/models/selectOption.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { InstalacaoEntity } from '../../Entities/instalacao.entity';

export class InstalacaoMapper extends Mapper<InstalacaoEntity, SelectOption> {
  mapFrom(param: InstalacaoEntity): SelectOption {
    return {
      value: param.codigoInstalacao,
      label: param.nomeDaInstalacao,
    };
  }
}
