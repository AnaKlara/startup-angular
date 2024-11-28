import { PremissaModel } from 'src/app/core/models/premissa.model';

import { PremissaEntity } from '../entities/premissa-entity';
import { PremissaMapper } from './premissa.mapper';

describe('Service: VehicleHttp', () => {
  let mapper: PremissaMapper;

  beforeEach(() => {
    mapper = new PremissaMapper();
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
const mockModel: PremissaModel = {
  id: 'id',
  name: 'name',
  version: 'version',
  type: 'type',
  associate: 'associate',
  cycle: 0,
  description: 'description',
};
const mockEntity: PremissaEntity = {
  id: 'id',
  name: 'name',
  version: 'version',
  type: 'type',
  associate: 'associate',
  cycle: 0,
  description: 'description',
};
