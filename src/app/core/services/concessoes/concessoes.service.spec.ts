import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConcessoesService } from './concessoes.service';

describe('Service: VehicleHttp', () => {
  let service: ConcessoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcessoesService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(ConcessoesService);
  });

  it('getChartData', () => {
    service.getConcessoes().subscribe((res) => {
      expect(res).toBeDefined();
    });
  });
});
