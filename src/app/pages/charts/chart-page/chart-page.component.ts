import { Component, OnInit } from '@angular/core';
import { ChartDataModel } from 'src/app/core/models/chart-data.model';
import { ChartService } from 'src/app/core/services/chartData/chart.service';
import { Breadcrumb } from 'src/app/shared/components/breadcrumb/breadcrumb.model';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.scss'],
})
export class ChartPageComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Home', url: '/home' },
    { label: 'Gráficos', url: '/' },
  ];

  chartOptionsArea: any;
  chartOptionsRadial: any;
  chartOptionsBar: any;
  chartData!: ChartDataModel[];

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.getChartData();
    this.initializeAreaChart();
    this.initializeRadialChart();
    this.initializeBarChart();
  }

  getChartData() {
    this.chartService.getChartData().subscribe((data) => {
      this.chartData = data;
    });
  }

  initializeAreaChart() {
    this.chartOptionsArea = {
      series: this.getSeriesDataArea(),
      chart: {
        type: 'area',
        height: 350,
      },
      xaxis: {
        categories: this.chartData.map((item) => item.group),
      },
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        enabled: true,
      },
      dataLabels: {
        enabled: false,
      },
    };
  }

  getSeriesDataArea(): any[] {
    const seriesData: any[] = [];

    const uniqueGroups = Array.from(new Set(this.chartData.map((item) => item.group)));

    uniqueGroups.forEach((group) => {
      const series = {
        name: group,
        data: this.chartData.filter((item) => item.group === group).map((item) => item.value),
      };
      seriesData.push(series);
    });

    return seriesData;
  }

  initializeRadialChart() {
    const mockedChartData: ChartDataModel = {
      group: 'Mocked Group',
      date: '2022-03-01',
      value: 75, // You can adjust this value as needed
    };

    this.chartOptionsRadial = {
      series: [mockedChartData.value],
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: function (val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Percent'],
    };
  }

  initializeBarChart() {
    this.chartOptionsBar = {
      series: [
        {
          name: 'Positive Values',
          data: this.chartData.map((item) => Math.abs(item.value)),
        },
        {
          name: 'Negative Values',
          data: this.chartData.map((item) => -Math.abs(item.value)),
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: 'Values',
        },
      },
      xaxis: {
        categories: this.chartData.map((item) => item.group),
      },
      legend: {
        position: 'top',
      },
    };
  }
}
