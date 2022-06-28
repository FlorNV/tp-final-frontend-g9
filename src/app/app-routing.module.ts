import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { DatatableEmpleadoComponent } from './components/datatable-empleado/datatable-empleado.component';
import { UpdateEmpleadoComponent } from './components/update-empleado/update-empleado.component';
import { DependenciasComponent } from './components/dependencias/dependencias.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'empleado', component: EmpleadoComponent },
  {path:'empleados',component:DatatableEmpleadoComponent},
  {path:'empleado/:id', component:UpdateEmpleadoComponent},
  { path: 'dependencias', component: DependenciasComponent },
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
  EmpleadoComponent,
  DependenciasComponent,

];
