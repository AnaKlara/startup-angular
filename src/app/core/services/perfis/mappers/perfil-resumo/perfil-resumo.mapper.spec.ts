import { PerfilResumoModel } from 'src/app/core/models/perfil.model';

import { PerfilResumoEntity } from '../../entities/perfil-resumo.entity';
import { PerfilResumoMapper } from './perfil-resumo.mapper';

describe('PerfilResumoMapper', () => {
  let mapper: PerfilResumoMapper;

  beforeEach(() => {
    mapper = new PerfilResumoMapper();
  });

  it('should correctly map PerfilResumoEntity to PerfilResumoModel', () => {
    const entity: PerfilResumoEntity = {
      codigo: '1234',
      chave: 'key123',
      nome: 'Sample Perfil',
      lotacao: 'Dept A',
      orgaos: [
        {
          codigo: '123',
          nome: 'kakakakaka',
        },
        {
          codigo: '124',
          nome: 'kkkkk',
        },
      ],
      formularios: [
        {
          codigo: '123',
          nome: 'kakakakaka',
        },
        {
          codigo: '124',
          nome: 'kkkkk',
        },
      ],
      tiposPerfis: [
        {
          codigo: '123',
          nome: 'kakakakaka',
        },
        {
          codigo: '124',
          nome: 'kkkkk',
        },
      ],
    };

    const expectedModel: PerfilResumoModel = {
      codigo: '1234',
      chave: 'key123',
      nome: 'Sample Perfil',
      lotacao: 'Dept A',
      orgaos: [
        {
          codigo: '123',
          nome: 'kakakakaka',
        },
        {
          codigo: '124',
          nome: 'kkkkk',
        },
      ],
      formularios: [
        {
          codigo: '123',
          nome: 'kakakakaka',
        },
        {
          codigo: '124',
          nome: 'kkkkk',
        },
      ],
      tiposPerfis: [
        {
          codigo: '123',
          nome: 'kakakakaka',
        },
        {
          codigo: '124',
          nome: 'kkkkk',
        },
      ],
    };

    const result = mapper.mapFrom(entity);

    expect(result).toEqual(expectedModel);
  });
});
