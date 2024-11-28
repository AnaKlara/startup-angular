import { TestBed } from '@angular/core/testing';

import { TasksMocks } from './mocks/tasks.mock';
import { TaskCardService } from './task-card.service';

describe('TaskCardService', () => {
  let service: TaskCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks', done => {
    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(TasksMocks);
      done(); // Indicates the asynchronous operation is complete
    });
  });
});
