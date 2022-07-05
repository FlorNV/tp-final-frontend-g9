import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { DatatableEmpleadoComponent } from './components/datatable-empleado/datatable-empleado.component';
import { DependenciasComponent } from './components/dependencias/dependencias.component';
import { TipoReunionComponent } from './components/tipo-reunion/tipo-reunion.component';
import { RecursoFormComponent } from './components/recurso-form/recurso-form.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ReunionFormComponent } from './components/reunion-form/reunion-form.component';
import { OficinaComponent } from './components/oficina/oficina.component';
import { AuthGuard } from './services/auth.guard';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { ReunionesComponent } from './components/reuniones/reuniones.component';
  
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'empleado-form/:id', component: EmpleadoFormComponent, canActivate: [AuthGuard]},
    { path: 'empleados', component: DatatableEmpleadoComponent, canActivate: [AuthGuard]},
    { path: 'tipoReunion', component: TipoReunionComponent, canActivate: [AuthGuard]},
    { path: 'recursos', component: RecursoFormComponent, canActivate: [AuthGuard]},
    { path: 'dependencias', component: DependenciasComponent, canActivate: [AuthGuard]},
    { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard]},
    { path: 'reunion-form/:id', component: ReunionFormComponent, canActivate: [AuthGuard]},
    { path: 'reuniones', component: ReunionesComponent, canActivate: [AuthGuard]},
    { path: 'oficina',component: OficinaComponent, canActivate: [AuthGuard]},
    { path: 'estadistica',component:EstadisticaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routingComponents = [
  HeaderComponent, 
  LoginComponent, 
  EmpleadoFormComponent,
  DatatableEmpleadoComponent,
  TipoReunionComponent,
  RecursoFormComponent,
  DependenciasComponent,
  CalendarioComponent,
  ReunionFormComponent,
  ReunionesComponent,
  OficinaComponent,
  EstadisticaComponent,
];
