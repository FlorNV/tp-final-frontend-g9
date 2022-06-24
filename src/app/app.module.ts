import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CustomFormsModule } from 'ng2-validation';
/* Gráficos */
import { NgChartsModule } from "ng2-charts";
/* Calendario */
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
/* Código QR */
import { NgxQRCodeModule } from "@techiediaries/ngx-qrcode";
/* Notificaciones */
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderParticipanteComponent } from './components/header-participante/header-participante.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderParticipanteComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgxQRCodeModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CustomFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
