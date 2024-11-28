import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartService } from 'src/app/core/services/chartData/chart.service';
import { SharedModule } from '../../shared/shared.module';
import { ChartPageComponent } from './chart-page/chart-page.component';
import { ChartRoutingModule } from './chart-routing.module';

@NgModule({
  declarations: [ChartPageComponent],
  imports: [CommonModule, ChartRoutingModule, NgApexchartsModule, SharedModule],
  providers: [ChartService],
})
export class ChartModule {}
