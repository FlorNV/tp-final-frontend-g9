import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import {DataTablesModule} from 'angular-datatables';
import { DatatableEmpleadoComponent } from './components/datatable-empleado/datatable-empleado.component'
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DatatableEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
