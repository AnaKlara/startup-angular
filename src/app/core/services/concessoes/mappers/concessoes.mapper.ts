import { ConcessoesModel } from 'src/app/core/models/concessoes.model';
import { Mapper } from 'src/app/shared/base/mapper';
import { ConcessoesEntity } from '../entities/concessoes-entity';

export class ConcessoesMapper extends Mapper<ConcessoesEntity, ConcessoesModel> {
  mapFrom(param: ConcessoesEntity): ConcessoesModel {
    return {
      sigla: param.sigla,
      nome: param.nome,
      versao: param.versao,
      situacao: param.situacao,
      parecer: param.parecer,
    };
  }
  mapTo(param: ConcessoesModel): ConcessoesEntity {
    return {
      sigla: param.sigla,
      nome: param.nome,
      versao: param.versao,
      situacao: param.situacao,
      parecer: param.parecer,
    };
  }
}
