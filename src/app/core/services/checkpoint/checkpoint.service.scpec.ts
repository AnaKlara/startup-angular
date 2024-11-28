import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CheckpointService } from './checkpoint.service';

describe('Service: CheckpointService', () => {
  let service: CheckpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckpointService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(CheckpointService);
  });

  it('getChartData', () => {
    service.getAll().subscribe((res) => {
      expect(res).toBeDefined();
    });
  });
});
