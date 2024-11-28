import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { toastConfig } from './shared/config/toast.config';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot(toastConfig),
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class AppModule {}
