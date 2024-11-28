import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PremissaService } from './premissa.service';

describe('Service: PremissaService', () => {
  let service: PremissaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PremissaService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(PremissaService);
  });

  it('getChartData', () => {
    service.getAll().subscribe(res => {
      expect(res).toBeDefined();
    });
  });
});
