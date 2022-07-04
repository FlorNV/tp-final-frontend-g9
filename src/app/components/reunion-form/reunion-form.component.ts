import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Estado } from 'src/app/models/estado';
import { Oficina } from 'src/app/models/oficina';
import { Prioridad } from 'src/app/models/prioridad';
import { RecursoDigital } from 'src/app/models/recurso-digital';
import { RecursoFisico } from 'src/app/models/recurso-fisico';
import { Reunion } from 'src/app/models/reunion';
import { TipoReunion } from 'src/app/models/tipo-reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EstadosService } from 'src/app/services/estados.service';
import { OficinaService } from 'src/app/services/oficina.service';
import { PrioridadService } from 'src/app/services/prioridad.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { ReunionService } from 'src/app/services/reunion.service';
import { TipoReunionService } from 'src/app/services/tipo-reunion.service';

@Component({
  selector: 'app-reunion-form',
  templateUrl: './reunion-form.component.html',
  styleUrls: ['./reunion-form.component.css']
})
export class ReunionFormComponent implements OnInit {

  reunion!: Reunion;
  prioridades!: Array<Prioridad>;
  tiposReuniones!: Array<TipoReunion>;
  oficinas!: Array<any>;
  empleados!: Array<any>;
  estados!: Array<any>;
  recursosFisicos!: Array<RecursoFisico>;
  recursosDigitales!: Array<RecursoDigital>;
  selectedItemsParticipantes!: Array<any>;
  selectedItemsDigitales!: Array<any>;
  selectedItemsFisicos!: Array<any>;
  dropdownSettingsParticipantes: IDropdownSettings;
  dropdownSettingsDigitales: IDropdownSettings;
  dropdownSettingsFisicos: IDropdownSettings;
  respuesta!: any;
  accion!: string;
  event!: any;

  constructor(private reunionService: ReunionService,
              private empleadoService: EmpleadoService,
              private prioridadService: PrioridadService,
              private recursoService: RecursoService,
              private tipoReunionService: TipoReunionService,
              private oficinaService: OficinaService,
              private estadoService: EstadosService,
              private modalService: NgbModal,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 
    
    this.dropdownSettingsParticipantes = {
      singleSelection: false,
      idField: '_id',
      textField: 'nombreCompleto',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar'
    };
    this.dropdownSettingsDigitales = {
      singleSelection: false,
      idField: '_id',
      textField: 'recurso',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar'
    };
    this.dropdownSettingsFisicos = {
      singleSelection: false,
      idField: '_id',
      textField: 'nombre',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar'
    };
    this.event = {
      kind: "calendar#event",
      status: "confirmed",
      summary: "summary",
      creator: {
        email: "eventos.grupo9@gmail.com"
      },
      start: {
        dateTime: "2022-06-26T13:30:00-03:00",
        timeZone: "America/Argentina/Jujuy"
      },
      end: {
        dateTime: "2022-06-26T14:30:00-03:00",
        timeZone: "America/Argentina/Jujuy"
      }
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id'] == '0'){
          this.accion = 'new';
          this.iniciarReunion();
          this.cargarPrioridades();
          this.cargarParticipantes();
          this.cargarRecursosDigitales();
          this.cargarRecursosFisicos();
          this.cargarTiposReuniones();
          this.cargarOficinas();
          this.cargarEstados();
        } else {
          this.accion = 'update';
          // this.cargarPrioridades();
          // this.cargarParticipantes();
          // this.cargarRecursosDigitales();
          // this.cargarRecursosFisicos();
          // this.cargarTiposReuniones();
          // this.cargarOficinas();
          // this.cargarEstados();
          this.cargarReunion(params['id']);
        }
       
      }
    )
  }

  iniciarReunion(): void {
    this.reunion = new Reunion();
    this.selectedItemsParticipantes = new Array<any>();
    this.selectedItemsDigitales = new Array<any>();
    this.selectedItemsFisicos = new Array<any>();
  }

  agregarReunion(content: any): void {
    this.setReunion();
    console.log(this.reunion);
    this.reunionService.addReunion(this.reunion).subscribe(
      result => {
        if(result.status == 201) {
          this.respuesta = result;
          console.log(result);
        }
      },
      error => {
        this.respuesta = error.error;
      }
    )
    this.reunionService.createEvent(this.event).subscribe(
      result=>{ console.log(result); }, 
      error=>{ console.log(error); } 
    )
    this.open(content);
  }

  async cargarReunion(id: string) {
    await this.cargarParticipantes();
    await this.cargarRecursosDigitales();
    await this.cargarRecursosFisicos();
    await this.cargarPrioridades();
    await this.cargarTiposReuniones();
    await this.cargarOficinas();
    await this.cargarEstados();
    this.reunionService.getReunionById(id).subscribe(
      result=>{
        this.iniciarReunion();
        this.reunion.horaInicio = new Date(result.data.reunion.horaInicio).toISOString().slice(0, -8);
        this.reunion.horaFinal = new Date(result.data.reunion.horaFinal).toISOString().slice(0, -8);
        this.selectedItemsDigitales = result.data.reunion.recursosDigitales;
        this.selectedItemsFisicos = result.data.reunion.recursos;
        this.selectedItemsParticipantes = this.crearListaParticipantes(result.data.reunion.participantes);
        this.reunion.prioridad = result.data.reunion.prioridad._id;
        this.reunion.tipoReunion = result.data.reunion.tipoReunion._id;
        this.reunion.oficina = result.data.reunion.oficina._id;
        this.reunion.estado = result.data.reunion.estado._id;
      },
      error => {
        this.respuesta = error.error;
      },
    )
  }

  modificarReunion(content: any): void {
    // this.reunionService.updateReunion(this.reunion).subscribe(
    //   result => {
    //     if(result.status == 201) {
    //       this.respuesta = result;
    //       console.log(result);
    //     }
    //   },
    //   error => {
    //     this.respuesta = error.error;
    //     console.log(error.error);
    //   }
    // )
  }

  async cargarParticipantes() {
    this.empleadoService.getEmpleadosByEstado(false).subscribe(
      result => {
        this.empleados = new Array<any>();
        this.empleados = this.crearListaParticipantes(result.data.empleados);
      }
    )
  }

  async cargarPrioridades() {
    this.prioridadService.getPrioridades().subscribe(
      result => {
        this.prioridades = new Array<Prioridad>();
        result.data.prioridades.forEach((element: any) => {
          let prioridad = new Prioridad();
          Object.assign(prioridad, element);
          this.prioridades.push(prioridad);
        });
      }
    )
  }

  async cargarRecursosFisicos() {
    this.recursoService.getRecursosFisicosByReservacion(false).subscribe(
      result => {
        this.recursosFisicos = new Array<RecursoFisico>();
        result.data.recursos.forEach((element: any) => {
          let recurso = new RecursoFisico();
          Object.assign(recurso, element);
          this.recursosFisicos.push(recurso);
        });
      }
    )
  }

  async cargarRecursosDigitales() {
    this.recursoService.getRecursosDigitales().subscribe(
      result => {
        this.recursosDigitales = new Array<RecursoDigital>();
        result.data.recursos.forEach((element: any) => {
          let recurso = new RecursoDigital();
          Object.assign(recurso, element);
          this.recursosDigitales.push(recurso);
        });
      }
    )
  }

  async cargarTiposReuniones() {
    this.tipoReunionService.getTiposReunion().subscribe(
      result => {
        this.tiposReuniones = new Array<TipoReunion>();
        result.data.tiposReunion.forEach((element: any) => {
          let tipoReunion = new TipoReunion();
          Object.assign(tipoReunion, element);
          this.tiposReuniones.push(tipoReunion);
        });
      }
    )
  }

  async cargarOficinas() {
    this.oficinaService.getOficinasByEstado(false).subscribe(
      result => {
        this.oficinas = new Array<Oficina>();
        result.data.oficinas.forEach((element: any) => {
          let oficina = new Oficina();
          Object.assign(oficina, element);
          this.oficinas.push(oficina);
        });
      }
    )
  }

  async cargarEstados() {
    this.estadoService.getEstados().subscribe(
      result => {
        this.estados = new Array<Estado>();
        result.data.estados.forEach((element: any) => {
          let estado = new Estado();
          Object.assign(estado, element);
          this.estados.push(estado);
        });
      }
    )
  }

  crearListaParticipantes(arr: any): Array<any> {
    let participantes: Array<any> = new Array<any>;
    arr.forEach((element: any) => {
      let participante = {
        _id: element._id,
        nombreCompleto: `${element.apellido}, ${element.nombre}`
      }
      participantes.push(participante);
    });
    return participantes;
  }

  setReunion(): void {
    
    this.event.start.dateTime = this.toIsoString(new Date(this.reunion.horaInicio)); 
    this.event.end.dateTime = this.toIsoString(new Date(this.reunion.horaFinal)); 
    this.event.summary = this.reunion.tipoReunion.tipoReunion;


    let participantes: string[] = [];
    this.selectedItemsParticipantes.forEach(element => {
      participantes.push(element._id);
    });
    this.reunion.participantes = participantes;
    this.reunion.recursos = this.selectedItemsFisicos;
    this.reunion.recursosDigitales = this.selectedItemsDigitales;
  }

  toIsoString(date: Date) { 
    var tzo = -date.getTimezoneOffset(), 
    dif = tzo >= 0 ? '+' : '-', 
    pad = function(num:any) { 
      return (num < 10 ? '0' : '') + num; 
    };
    return date.getFullYear() + 
    '-' + pad(date.getMonth() + 1) + 
    '-' + pad(date.getDate()) + 
    'T' + pad(date.getHours()) + 
    ':' + pad(date.getMinutes()) + 
    ':' + pad(date.getSeconds()) + 
    dif + pad(Math.floor(Math.abs(tzo) / 60)) + 
    ':' + pad(Math.abs(tzo) % 60); 
  }

  open(content: any): void {
    this.modalService.open(content, { centered: true }).result.then(()=>{
      if(this.respuesta.status == 201 || this.respuesta.status == 200){
        this.router.navigate(['calendario']);
      }
    });
  }

  cancelar(): void{
    this.router.navigate(['reuniones']);
  }
}
