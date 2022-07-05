import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
  }

  /* 
  obtenerEmpealdo(){
    this.id = this.loginService.idLogged();
    this.empleadoService.getEmpleado(this.id).subscribe(
      (result) => {
        this.empleado = new Empleado();
        Object.assign(this.empleado,result['data']['empleado']);
        console.log(this.empleado);
      }
    )   
  }

  obtenerNotificaiones(){
    this.notificacionService.getNotificaiones(this.empleado).subscribe(
    (result) => {
      console.log(result);
    }
    )
  }
  */

}
