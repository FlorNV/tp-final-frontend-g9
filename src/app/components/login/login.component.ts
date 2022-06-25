import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { findIndex } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login!: Login;
  empleado!: Empleado;
  rol!: string;

  usuarios: Array<any> = [{"id":0, "nombre": "Administrador","usuarioCorreo":"admin@gmail.com","usuarioPassword":"admin"},
                          {"id":1, "nombre": "Joaquin","usuarioCorreo":"joako@gmail.com","usuarioPassword":"1234"},
                          {"id":2, "nombre": "Florencia","usuarioCorreo":"flor@gmail.com","usuarioPassword":"4567"},
                          {"id":3, "nombre": "Rocio","usuarioCorreo":"roog@gmail.com","usuarioPassword":"1596"}];
  validateEmail: boolean = true
  indice!: number;
  constructor(private loginService: LoginService,
              private router: Router) {
    this.login = new Login();
  }

  ngOnInit(): void {
  }
  
  ingresar(){
    this.loginService.autenticacion(this.login).subscribe(
      (result) => {

        this.empleado = new Empleado();
        this.empleado = result.data.empleado;
        this.rol = result.data.empleado.rol;
        
        if(result.status == 200){
          if(this.rol=="ADMINISTRADOR"){
            alert("Bienvenido")
            this.router.navigate(['empleado'])
          }
          if(this.rol=="PARTICIPANTE"){
            //redirige a la vista del calendario
            alert("Bienvenido: " + this.empleado.apellido + " " + this.empleado.nombre)
          }
        } 
      },
      (error) =>{
        console.log(error)
      }
    )
  }

}
