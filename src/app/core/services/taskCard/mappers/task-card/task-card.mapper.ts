import { TaskCardModel } from 'src/app/core/models/task-card.model';
import { Mapper } from 'src/app/shared/base/mapper';

import { TaskCardEntity } from '../../entities/task-card-entity';

export class TaskCardMapper extends Mapper<TaskCardEntity, TaskCardModel> {
  mapFrom(param: TaskCardEntity): TaskCardModel {
    return {
      id: param.id,
      name: param.name,
      timestamp: param.timestamp,
    };
  }
  mapTo(param: TaskCardModel): TaskCardEntity {
    return {
      id: param.id,
      name: param.name,
      timestamp: param.timestamp,
    };
  }
}
