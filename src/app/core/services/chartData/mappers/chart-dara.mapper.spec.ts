import { ChartDataModel } from 'src/app/core/models/chart-data.model';
import { ChartDataEntity } from '../entities/chart-data.entity';
import { ChartDataMapper } from './chart-data.mapper';

describe('Service: VehicleHttp', () => {
  let mapper: ChartDataMapper;

  beforeEach(() => {
    mapper = new ChartDataMapper();
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
const mockModel: ChartDataModel = {
  group: '1',
  value: 0,
  date: '2023-04-12',
};
const mockEntity: ChartDataEntity = {
  group: '1',
  value: 0,
  date: '2023-04-12',
};
