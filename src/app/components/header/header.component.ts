import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { Notificacion } from 'src/app/models/notificacion';
import { Oficina } from 'src/app/models/oficina';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { LoginService } from 'src/app/services/login.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { OficinaService } from 'src/app/services/oficina.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  empleado!: Empleado;
  reunion!: Reunion;
  reuniones!: Array<Reunion>;
  participante!: any;
  notificacion!: Notificacion;
  oficina!: Oficina;
  oficinas!: Array<Oficina>;
  id!: any;

  constructor(public loginService: LoginService,
              public empleadoService: EmpleadoService,
              public notificacionService: NotificacionService,
              public oficinaService: OficinaService) {
                this.obtenerOficinas();
                this.obtenerEmpealdo();
                this.obtenerNotificaiones();
              }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
  }

   
  obtenerEmpealdo(){
    this.id = this.loginService.idLogged();
    this.empleadoService.getEmpleado(this.id).subscribe(
      (result) => {
        this.empleado = new Empleado();
        Object.assign(this.empleado,result['data']['empleado']);
      }
    )
    
  }

  obtenerNotificaiones(){
    this.oficina = new Oficina();
    this.reuniones = new Array<Reunion>();
    this.notificacionService.getNotificaiones(this.empleado).subscribe(
    (result) => {
      //let id: string = (result['data']['notificaciones'][0]['reunion']['oficina'])
      //console.log(this.oficina)
      for(let i=0;i<result.data.notificaciones.length;i++){
        //this.oficina = this.oficinas.find((o) => (o._id === result['data']['notificaciones'][i]['reunion']))!;
        this.participante = result['data']['notificaciones'][i]['empleado'];
        
        if(this.participante._id == this.id){
          this.reunion = new Reunion();
          Object.assign(this.reunion,result['data']['notificaciones'][i].reunion);
          console.log(result['data']['notificaciones'][i]['reunion']['oficina'])
          //this.reunion.oficina = this.oficinas.find((o) => (o._id === result['data']['notificaciones'][i]['reunion']['oficina']))! 
          this.reuniones.push(this.reunion);
        }
      }
      console.log(this.reuniones)
      //this.obtenerOficina(this.reuniones[0]._id)
    },
    (error) => {
      console.log(error);
    }
    )
  }

  obtenerOficinas(){
    this.oficinas = new Array<Oficina>;
    this.oficinaService.getOficinas().subscribe(
      (result) => {
        this.oficina = new Oficina();
        Object.assign(this.oficina,result['data']['oficinas']);
        this.oficinas.push(this.oficina);
        console.log(this.oficinas);
      }
    )
  }
  
  /*obtenerOficina(id: string): void{
    console.log(this.oficinas[1])
    this.oficina = new Oficina();
    for(let i=0;i<this.oficinas.length;i++){
      console.log(this.oficinas[i]._id);
      if(this.oficinas[i]._id==id){
        
        this.oficina = this.oficinas[i];
        console.log(this.oficina);
      }
    }
  }*/

}
