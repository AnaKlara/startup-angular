import { FormularioResumoModel } from 'src/app/core/models/formulario-resumo.model';

import { FormularioResumoEntity } from '../../Entities/formulario-resumo.entity';
import { FormularioResumoMapper } from './formulario-resumo.mapper';

describe('FormularioResumoMapper', () => {
  let mapper: FormularioResumoMapper;

  beforeEach(() => {
    mapper = new FormularioResumoMapper();
  });

  it('should correctly map a FormularioResumoEntity to a FormularioResumoModel', () => {
    const formularioResumoEntity: FormularioResumoEntity = {
      id: '1',
      tipoDoFormulario: 'Type A',
      nomeDoArquivo: 'FileName.pdf',
      editorChave: 'Editor123',
      orgao: 'Organization',
      dataCriacao: new Date('2024-01-01'),
      dataEnvio: new Date('2024-01-02'),
      situacaoArquivo: 'Situation',
      nomePoco: 'WellName',
      responsavel: 'ResponsiblePerson',
    };

    const expectedFormularioResumoModel: FormularioResumoModel = {
      id: formularioResumoEntity.id,
      tipoDoFormulario: formularioResumoEntity.tipoDoFormulario,
      nomeDoArquivo: formularioResumoEntity.nomeDoArquivo,
      editorChave: formularioResumoEntity.editorChave,
      orgao: formularioResumoEntity.orgao,
      dataCriacao: formularioResumoEntity.dataCriacao,
      dataEnvio: formularioResumoEntity.dataEnvio,
      situacaoArquivo: formularioResumoEntity.situacaoArquivo,
      nomePoco: formularioResumoEntity.nomePoco,
      responsavel: formularioResumoEntity.responsavel,
    };

    const result = mapper.mapFrom(formularioResumoEntity);

    expect(result).toEqual(expectedFormularioResumoModel);
  });
});
