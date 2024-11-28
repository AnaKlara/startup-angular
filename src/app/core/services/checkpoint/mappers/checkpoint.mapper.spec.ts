import { CheckpointModel } from 'src/app/core/models/checkpoint.model';
import { CheckpointEntity } from '../entities/checkpoint-entity';
import { CheckpointMapper } from './checkpoint.mapper';

describe('Service: VehicleHttp', () => {
  let mapper: CheckpointMapper;

  beforeEach(() => {
    mapper = new CheckpointMapper();
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
const mockModel: CheckpointModel = {
  id: 'id',
  sonda: 'sonda',
  uo: 'uo',
  campo: 'campo',
  poco: 'poco',
  intervencao: 'intervencao',
  simulado: 'simulado',
  concluido: false,
  avaliacao: 2,
  prazo: 4,
};
const mockEntity: CheckpointEntity = {
  id: 'id',
  sonda: 'sonda',
  uo: 'uo',
  campo: 'campo',
  poco: 'poco',
  intervencao: 'intervencao',
  simulado: 'simulado',
  concluido: false,
  avaliacao: 2,
  prazo: 4,
};
