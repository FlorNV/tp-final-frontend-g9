import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Empleado } from 'src/app/models/empleado';
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

  // public reunionForm: FormGroup;
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

  constructor(private reunionService: ReunionService,
              private empleadoService: EmpleadoService,
              private prioridadService: PrioridadService,
              private recursoService: RecursoService,
              private tipoReunionService: TipoReunionService,
              private oficinaService: OficinaService,
              private estadoService: EstadosService,
              private modalService: NgbModal,
              private fb: FormBuilder,
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
    // this.reunionForm = this.fb.group({ 
    //   horaInicio: new FormControl('', [Validators.required]), 
    //   horaFinal: new FormControl('', [Validators.required]),
    //   prioridad: new FormControl('', [Validators.required]),
    //   tipoReunion: new FormControl('', [Validators.required]),
    //   oficina: new FormControl('', [Validators.required]),
    //   participantes: new FormControl('', [Validators.required]),
    //   digitales: new FormControl('', [Validators.required]),
    //   fisicos: new FormControl('', [Validators.required]),
    //   estado: new FormControl('', [Validators.required]),
    // });
  }

  // get horaInicio(){ return this.reunionForm.get('horaInicio'); }
  // get horaFinal(){ return this.reunionForm.get('horaFinal'); }
  // get prioridad(){ return this.reunionForm.get('prioridad'); }
  // get tipoReunion(){ return this.reunionForm.get('tipoReunion'); }
  // get oficina(){ return this.reunionForm.get('oficina'); }
  // get participantes(){ return this.reunionForm.get('participantes'); }
  // get digitales(){ return this.reunionForm.get('inicio'); }
  // get fisicos(){ return this.reunionForm.get('inicio'); }
  // get estado(){ return this.reunionForm.get('estado'); }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id'] == '0'){
          this.accion = 'new';
          this.iniciarReunion();
        } else {
          this.accion = 'update';
          this.cargarReunion(params['id']);
        }
        this.cargarPrioridades();
        this.cargarParticipantes();
        this.cargarRecursosDigitales();
        this.cargarRecursosFisicos();
        this.cargarTiposReuniones();
        this.cargarOficinas();
        this.cargarEstados();
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
        }
      },
      error => {
        this.respuesta = error.error;
      }
    )
    this.open(content);
  }

  cargarReunion(id: string): void {
    
  }

  modificarReunion(content: any): void {

  }

  cargarParticipantes(): void {
    this.empleadoService.getEmpleados().subscribe(
      result => {
        this.empleados = new Array<any>();
        result.data.empleados.forEach((element: any) => {
          let participante = {
            _id: element._id,
            nombreCompleto: `${element.apellido}, ${element.nombre}`
          }
          this.empleados.push(participante);
        });
      }
    )
  }

  cargarPrioridades(): void {
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

  cargarRecursosFisicos(): void {
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

  cargarRecursosDigitales(): void {
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

  cargarTiposReuniones(): void {
    this.tiposReuniones = [
      { _id: "62c046cba2dce049812eaca0", tipoReunion: "Marketing" },
      { _id: "62c046e6a2dce049812eaca4", tipoReunion: "Presentación de avances" },
      { _id: "62c082f1c4299a4d26f2a172", tipoReunion: "Estadisticas" },
      { _id: "62c082fac4299a4d26f2a174", tipoReunion: "Recorte" },
      { _id: "62c08302c4299a4d26f2a176", tipoReunion: "Novedades" }
    ];
  }

  cargarOficinas(): void {
    this.oficinaService.getOficinasByOcupacion(false).subscribe(
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

  cargarEstados(): void {
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

  setReunion(): void {
    let participantes: string[] = [];
    let recursosFisicos: string[] = [];
    let recursosDigitales: string[] = [];
    this.selectedItemsParticipantes.forEach(element => {
      participantes.push(element._id);
    });
    this.selectedItemsFisicos.forEach(element => {
      recursosFisicos.push(element._id);
    });
    this.selectedItemsDigitales.forEach(element => {
      recursosDigitales.push(element._id);
    });
    this.reunion.participantes = participantes;
    this.reunion.recursos = recursosFisicos;
    this.reunion.recursosDigitales = recursosDigitales;
  }

  open(content: any): void {
    this.modalService.open(content, { centered: true }).result.then(()=>{
      if(this.respuesta.status == 201 || this.respuesta.status == 200){
        this.router.navigate(['calendario']);
      }
    });
  }

  cancelar(): void{
    this.router.navigate(['calendario']);
  }
}
