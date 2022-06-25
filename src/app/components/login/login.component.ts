import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  respuesta!: any;
  message!: string;

  indice!: number;
  constructor(private loginService: LoginService,
              private router: Router,
              private modalService: NgbModal) {
    this.login = new Login();
  }

  ngOnInit(): void {
  }
  
  ingresar(content: any){
    this.loginService.autenticacion(this.login).subscribe(
      (result) => {
        
        if(result.status == 200){
          this.rol = result.data.empleado.rol;
          if(this.rol=="ADMINISTRADOR"){
            this.respuesta = result;
            this.message = "Autenticacion Exitosa"
            this.open(content);
            this.router.navigate(['empleado'])
          }
          if(this.rol=="PARTICIPANTE"){
            this.respuesta = result;
            this.message = "Autenticacion Exitosa"
            this.open(content);
            //redirige a la vista del calendario
          }
        } 
      },
      (error) =>{
        this.respuesta = error;
        this.message = "Email o contraseña incorrecta";
        this.open(content)
      }
    )
  }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

}
