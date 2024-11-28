import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TaskCardModel } from '../../models/task-card.model';
import { TaskCardMapper } from './mappers/task-card/task-card.mapper';
import { TasksMocks } from './mocks/tasks.mock';

@Injectable({
  providedIn: 'root',
})
export class TaskCardService {
  taskCardMapper = new TaskCardMapper();

  getTasks(): Observable<TaskCardModel[]> {
    return of(TasksMocks);
  }
}
