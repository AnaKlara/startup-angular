import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ChartService } from './chart.service';

describe('Service: ChartService', () => {
  let service: ChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(ChartService);
  });

  it('getChartData', () => {
    service.getChartData().subscribe((res) => {
      expect(res).toBeDefined();
    });
  });
});
