import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChartDataModel } from 'src/app/core/models/chart-data.model';
import { ChartService } from 'src/app/core/services/chartData/chart.service';
import { ChartPageComponent } from './chart-page.component';

describe('ChartPageComponent', () => {
  let component: ChartPageComponent;
  let fixture: ComponentFixture<ChartPageComponent>;
  let chartService: { getChartData: jest.Mock };

  beforeEach(async(() => {
    chartService = { getChartData: jest.fn(() => of(mockModel)) };
    TestBed.configureTestingModule({
      declarations: [ChartPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: ChartService, useValue: chartService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getChartData works', () => {
    jest.spyOn(chartService, 'getChartData').mockReturnValue(of(mockModel));
    component.getChartData();
    expect(chartService.getChartData).toHaveBeenCalled();
    expect(component.chartData).toStrictEqual(mockModel);
  });

  it('initializeAreaChart works', () => {
    component.chartData = mockModel;
    component.initializeAreaChart();
    expect(component.chartOptionsArea.xaxis).toStrictEqual({ categories: ['0', '1'] });
    expect(component.chartOptionsArea.series).toStrictEqual([
      { name: '0', data: [0] },
      { name: '1', data: [2] },
    ]);
  });

  it('getSeriesDataArea works', () => {
    component.chartData = mockModel;
    const res = component.getSeriesDataArea();
    expect(res).toStrictEqual([
      { name: '0', data: [0] },
      { name: '1', data: [2] },
    ]);
  });

  it('initializeRadialChart works', () => {
    component.chartData = mockModel;
    component.initializeRadialChart();
    expect(component.chartOptionsRadial.series).toStrictEqual([75]);
  });

  it('initializeBarChart works', () => {
    component.chartData = mockModel;
    component.initializeBarChart();
    expect(component.chartOptionsBar.xaxis.categories).toStrictEqual(['0', '1']);
  });
});
const mockModel: ChartDataModel[] = [
  {
    group: '0',
    value: 0,
  },
  {
    group: '1',
    value: 2,
  },
];
