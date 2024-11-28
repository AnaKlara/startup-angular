import { ChartDataModel } from 'src/app/core/models/chart-data.model';
import { Mapper } from 'src/app/shared/base/mapper';
import { ChartDataEntity } from '../entities/chart-data.entity';

export class ChartDataMapper extends Mapper<ChartDataEntity, ChartDataModel> {
  mapFrom(param: ChartDataEntity): ChartDataModel {
    return {
      group: param.group,
      date: param.date,
      value: param.value,
    };
  }
  mapTo(param: ChartDataModel): ChartDataEntity {
    return {
      group: param.group,
      date: param.date,
      value: param.value,
    };
  }
}
