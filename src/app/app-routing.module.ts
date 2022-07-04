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
import { ReunionesComponent } from './components/reuniones/reuniones.component';
  
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'empleado-form/:id', component: EmpleadoFormComponent },
    { path: 'empleados', component: DatatableEmpleadoComponent},
    { path: 'tipoReunion', component: TipoReunionComponent },
    { path: 'recursos', component: RecursoFormComponent},
    { path: 'dependencias', component: DependenciasComponent },
    { path: 'calendario', component: CalendarioComponent },
    { path: 'reunion-form/:id', component: ReunionFormComponent },
    { path: 'reuniones', component: ReunionesComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
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

];
