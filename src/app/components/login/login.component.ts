import { Component, OnInit } from '@angular/core';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo!: string;
  password!: string;
  usuarios: Array<any> = [{"id":0, "nombre": "Administrador","usuarioCorreo":"admin@gmail.com","usuarioPassword":"admin"},
                          {"id":1, "nombre": "Joaquin","usuarioCorreo":"joako@gmail.com","usuarioPassword":"1234"},
                          {"id":2, "nombre": "Florencia","usuarioCorreo":"flor@gmail.com","usuarioPassword":"4567"},
                          {"id":3, "nombre": "Rocio","usuarioCorreo":"roog@gmail.com","usuarioPassword":"1596"}];
  validateEmail: boolean = true
  indice!: number;
  constructor() { }

  ngOnInit(): void {
  }
  
  ingresar(){
    //*llamada al servicio de empleados para buscar por correo y contraseña
    this.indice = this.usuarios.findIndex(i => this.correo ===i.usuarioCorreo && this.password===i.usuarioPassword);
    //*si el indice devuelto es -1 significa que el correo o la contraseña no se encuentran en la base de datos
    if(this.indice!=-1){
      if(this.correo === "admin@gmail.com"){
        //*Redireccionar a la seccion de administrador
        alert("Bienvenido: " + this.usuarios[this.indice].nombre);
        alert("Accediendo al menu del administrador...");
      }else{
        //*Redireccionar a la seccion de empleado
        alert("Bienvenido/a: " + this.usuarios[this.indice].nombre);
      }      
    }else{
      //*El correo o la contraseña son incorrectos
      alert("El correo o la contraseña es incorrecta.")
    }
  }

}
