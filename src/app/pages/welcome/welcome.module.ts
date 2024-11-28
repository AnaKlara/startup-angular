import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '../../shared/shared.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, WelcomeRoutingModule, MatCardModule, SharedModule],
})
export class WelcomeModule {}
