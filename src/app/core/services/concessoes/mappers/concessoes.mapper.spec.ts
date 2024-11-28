import { ConcessoesModel } from 'src/app/core/models/concessoes.model';
import { ConcessoesEntity } from '../entities/concessoes-entity';
import { ConcessoesMapper } from './concessoes.mapper';

describe('Service: VehicleHttp', () => {
  let mapper: ConcessoesMapper;

  beforeEach(() => {
    mapper = new ConcessoesMapper();
  });

  it('mapFrom', () => {
    const res = mapper.mapFrom(mockEntity);
    expect(res).toStrictEqual(mockModel);
  });

  it('mapTo', () => {
    const res = mapper.mapTo(mockModel);
    expect(res).toStrictEqual(mockEntity);
  });
});
const mockModel: ConcessoesModel = {
  sigla: 'sigla',
  nome: 'nome',
  versao: 'versao',
  situacao: 'situacao',
  parecer: 'parecer',
};
const mockEntity: ConcessoesEntity = {
  sigla: 'sigla',
  nome: 'nome',
  versao: 'versao',
  situacao: 'situacao',
  parecer: 'parecer',
};
