import { PerfilResumoModel } from 'src/app/core/models/perfil.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { PerfilResumoEntity } from '../../entities/perfil-resumo.entity';

export class PerfilResumoMapper extends Mapper<PerfilResumoEntity, PerfilResumoModel> {
  // para a tabela
  mapFrom(param: PerfilResumoEntity): PerfilResumoModel {
    return {
      codigo: param.codigo,
      chave: param.chave,
      nome: param.nome,
      lotacao: param.lotacao,
      orgaos: param.orgaos,
      formularios: param.formularios,
      tiposPerfis: param.tiposPerfis,
    };
  }
}
