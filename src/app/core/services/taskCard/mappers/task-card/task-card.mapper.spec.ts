import { TaskCardModel } from 'src/app/core/models/task-card.model';

import { TaskCardEntity } from '../../entities/task-card-entity';
import { TaskCardMapper } from './task-card.mapper';

describe('TaskCardMapper', () => {
  let mapper: TaskCardMapper;

  beforeEach(() => {
    mapper = new TaskCardMapper();
  });

  describe('mapFrom', () => {
    it('should map TaskCardEntity to TaskCardModel', () => {
      const comomTimestamp = new Date().getTime().toString();
      const entity: TaskCardEntity = {
        id: '1',
        name: 'Task Name',
        timestamp: comomTimestamp,
      };

      const model: TaskCardModel = mapper.mapFrom(entity);

      expect(model).toEqual({
        id: '1',
        name: 'Task Name',
        timestamp: comomTimestamp,
      });
    });
  });

  describe('mapTo', () => {
    it('should map TaskCardModel to TaskCardEntity', () => {
      const comomTimestamp = new Date().getTime().toString();

      const model: TaskCardModel = {
        id: '1',
        name: 'Task Name',
        timestamp: comomTimestamp,
      };

      const entity: TaskCardEntity = mapper.mapTo(model);

      expect(entity).toEqual({
        id: '1',
        name: 'Task Name',
        timestamp: comomTimestamp,
      });
    });
  });
});
