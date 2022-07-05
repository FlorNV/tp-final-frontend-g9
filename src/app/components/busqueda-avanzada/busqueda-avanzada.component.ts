import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Empleado } from 'src/app/models/empleado';
import { Oficina } from 'src/app/models/oficina';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { OficinaService } from 'src/app/services/oficina.service';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-busqueda-avanzada',
  templateUrl: './busqueda-avanzada.component.html',
  styleUrls: ['./busqueda-avanzada.component.css']
})
export class BusquedaAvanzadaComponent implements OnInit {

  empleado!: Empleado;
  empleados!: Array<Empleado>;
  oficina!: Oficina;
  oficinas!: Array<Oficina>;
  reunion!: Reunion;
  reuniones!: Array<Reunion>;
  aux!: Array<any>;
  aux2!: Array<any>;

  respuesta!: any;
  indice: number =0;

  selectedItem!: Array<any>;
  dropdownSettings: IDropdownSettings;
  
  legajo!: string;
  participante!: string;
  participantes!: Array<any>;
  oficinaf!: string;
  fecha!: string;

  filtro1: boolean = false;
  filtro2: boolean = false;
  filtro3: boolean = false;
  filtro4: boolean = false;
  existe!: boolean;

  constructor(private empleadoService: EmpleadoService,
              private oficinaService: OficinaService,
              private reunionService: ReunionService) {
                this.dropdownSettings = {
                  singleSelection: false,
                  idField: '_id',
                  textField: 'nombreCompleto',
                  enableCheckAll: false,
                  itemsShowLimit: 3,
                  allowSearchFilter: true,
                  searchPlaceholderText: 'Buscar'
                }
                this.obtenerEmpelados();
                this.obtenerOficinas();
                this.obtenerReuniones();
              }

  ngOnInit(): void {
  }

  obtenerEmpelados(){
    this.selectedItem = new Array<any>();
    this.empleadoService.getEmpleados().subscribe(
      (result) => {
          this.empleados = new Array<Empleado>();
          this.participantes = new Array<any>();
          result.data.empleados.forEach((element: any) => {
            let participante = {
              _id: element._id,
              nombreCompleto: `${element.apellido}, ${element.nombre}`
            }
            this.participantes.push(participante);
            this.empleado = new Empleado();
            Object.assign(this.empleado,element);
            this.empleados.push(this.empleado);
          })
          //console.log(this.empleados);
      }
    )
  }

  obtenerOficinas(){
    this.oficinaService.getOficinas().subscribe(
      (result) => {
        if(result.status == 200){
          this.oficinas = new Array<Oficina>();
          result.data.oficinas.forEach((elemet: any) => {
            this.oficina = new Oficina();
            Object.assign(this.oficina,elemet);
            this.oficinas.push(this.oficina);
          })
          //console.log(this.oficinas);
        }
      }
    )
  }

  obtenerReuniones(){
    this.reunionService.getReuniones().subscribe(
      (result) => {
        this.reuniones = new Array<Reunion>();
        result.data.reuniones.forEach((element: any) => {
          this.reunion = new Reunion();
          Object.assign(this.reunion,element);
          this.reuniones.push(this.reunion);
        })
        //console.log(this.reuniones);
      }
    )
  }

  onChange1(legajo: string){
    this.filtro1 = true;
  }
  onChange3(legajo: string){
    this.filtro3 = true;
  }


  filtroLegajo(){
    this.aux = new Array<any>();
    this.aux2 = new Array<any>();
    for(this.indice; this.indice < this.reuniones.length; this.indice++){
      this.aux2 = this.reuniones[this.indice].participantes;
      for(let j=0;j < this.aux2.length; j++){
        if(this.aux2[j].legajo == this.legajo){
          this.aux.push(this.reuniones[this.indice]);
        }
      }
    }
    if(this.aux==null){
      alert("El empleado no participa en ninguna reuinio")
    }
    this.indice = 0;
    console.log(this.aux);
  }

  filtroParticipante(){
   /* this.existe = false;
    this.aux = new Array<any>();
    this.aux2 = new Array<any>();
    let a: number;
    for(this.indice; this.indice < this.reuniones.length; this.indice++){
      for(let j=0;j < this.aux2.length; j++){

        for(let k=0; k < this.participantes.length;k++){
          if(this.aux2[j].apellido + ", " + this.aux2[j].nombre == this.participantes[k].nombreCompleto){
            console.log(this.aux2[j]);
            this.existe = true;
            this.aux.push(this.reuniones[this.indice]);
          }
        }
      }
    }
    if(this.existe==false){
      this.filtro2 = false;
      alert("El empleado no participa en ninguna reuinio")
    }
    this.indice = 0;*/
  }

  filtroOficina(){
    this.aux = new Array<any>();
    for(this.indice; this.indice < this.reuniones.length; this.indice++){
      if(this.reuniones[this.indice].oficina.nombre === this.oficinaf){
        this.aux.push(this.reuniones[this.indice]);
      }
    }
    if(this.existe==false){
      this.filtro3 = false;
      alert("El empleado no participa en ninguna reuinio")
    }
    this.indice = 0;
  
    console.log(this.aux);
  }

  filtroFecha(){

  }

  filtroCombinado(){

  }

}
