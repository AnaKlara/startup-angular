import { FormularioResumoModel } from 'src/app/core/models/formulario-resumo.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { FormularioResumoEntity } from '../../Entities/formulario-resumo.entity';

export class FormularioResumoMapper extends Mapper<FormularioResumoEntity, FormularioResumoModel> {
  mapFrom(param: FormularioResumoEntity): FormularioResumoModel {
    return {
      id: param.id,
      tipoDoFormulario: param.tipoDoFormulario,
      nomeDoArquivo: param.nomeDoArquivo,
      editorChave: param.editorChave,
      orgao: param.orgao,
      dataCriacao: param.dataCriacao,
      dataEnvio: param.dataEnvio,
      situacaoArquivo: param.situacaoArquivo,
      nomePoco: param.nomePoco,
      responsavel: param.responsavel,
    };
  }
}
