import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { DatatableEmpleadoComponent } from './components/datatable-empleado/datatable-empleado.component';
import { RecursoFormComponent } from './components/recurso-form/recurso-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'empleado-form/:id', component: EmpleadoFormComponent },
  { path: 'empleados', component: DatatableEmpleadoComponent},
  { path: 'recurso-form', component: RecursoFormComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
export const routingComponents = [
  LoginComponent, 
  HeaderComponent, 
  EmpleadoFormComponent,
  DatatableEmpleadoComponent,

];
