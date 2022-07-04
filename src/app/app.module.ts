import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
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
import { DataTablesModule } from 'angular-datatables';
import { DatatableEmpleadoComponent } from './components/datatable-empleado/datatable-empleado.component'
import { YesNoPipe } from './yes-no.pipe';
import { TipoReunionComponent } from './components/tipo-reunion/tipo-reunion.component';
import { LoginService } from './services/login.service';
import { RecursoFormComponent } from './components/recurso-form/recurso-form.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { OficinaComponent } from './components/oficina/oficina.component';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DatatableEmpleadoComponent,
    YesNoPipe,
    TipoReunionComponent,
    RecursoFormComponent,
    OficinaComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    NgbModalModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ReactiveFormsModule,
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
  providers: [LoginService,
  {
   provide: HTTP_INTERCEPTORS,
   useClass: TokenInterceptorService,
   multi: true
  },
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
