import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Empleado } from 'src/app/models/empleado';
import { Prioridad } from 'src/app/models/prioridad';
import { RecursoDigital } from 'src/app/models/recurso-digital';
import { RecursoFisico } from 'src/app/models/recurso-fisico';
import { Reunion } from 'src/app/models/reunion';
import { TipoReunion } from 'src/app/models/tipo-reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
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
  participantes!: Array<any>;
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
  }

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
        this.participantes = new Array<any>();
        result.data.empleados.forEach((element: any) => {
          let participante = {
            _id: element._id,
            nombreCompleto: `${element.apellido}, ${element.nombre}`
          }
          this.participantes.push(participante);
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
    // this.recursoService.getRecursosFisicos().subscribe(
    //   result => {
    //     this.recursosFisicos = new Array<RecursoFisico>();
    //     result.data.recursos.forEach((element: any) => {
    //       let recurso = new RecursoFisico();
    //       Object.assign(recurso, element);
    //       this.recursosFisicos.push(recurso);
    //     });
    //     console.log(result);
    //   }
    // )
    this.recursosFisicos = [
      { _id: "62c04aaaa2dce049812eacbf", nombre: "proyector", estaReservado: true },
      { _id: "62c06e42a2dce049812eacea", nombre: "computadora", estaReservado: false },
      { _id: "62c08099c4299a4d26f2a165", nombre: "Pantalla", estaReservado: false }
    ];
    this.recursosFisicos = this.recursosFisicos.filter(rf => !rf.estaReservado);
  }

  cargarRecursosDigitales(): void {
    // this.recursoService.getRecursosDigitales().subscribe(
    //   result => {
    //     this.recursosDigitales = new Array<RecursoDigital>();
    //     result.data.recursos.forEach((element: any) => {
    //       let recurso = new RecursosDigital();
    //       Object.assign(recurso, element);
    //       this.recursosDigitales.push(recurso);
    //     });
    //     console.log(result);
    //   }
    // )

    this.recursosDigitales = [
      { _id: "62c04c46a2dce049812eacd4", nombre: "pdf", recurso: "pdf" },
      { _id: "62c088adc4299a4d26f2a19a", nombre: "diapositivas", recurso: "diapositivas" }
    ];
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
    this.oficinas = [
      { _id: "62c084e9c4299a4d26f2a179", nombre: "Oficina 1", estaOcupada: true },
      { _id: "62c084f6c4299a4d26f2a17b", nombre: "Oficina 2", estaOcupada: true },
      { _id: "62c084fcc4299a4d26f2a17d", nombre: "Oficina 3", estaOcupada: false },
      { _id: "62c084ffc4299a4d26f2a17f", nombre: "Oficina 4", estaOcupada: false },
      { _id: "62c08503c4299a4d26f2a181", nombre: "Oficina 5", estaOcupada: false },
      { _id: "62c08524c4299a4d26f2a183", nombre: "Sala de junta", estaOcupada: false }
    ];
    this.oficinas = this.oficinas.filter(oficina => !oficina.estaOcupada);
  }

  cargarEstados(): void {
    this.estados = [
      { _id: "62c0860bc4299a4d26f2a186", nombreEstado: "Celebrada" },
      { _id: "62c08620c4299a4d26f2a188", nombreEstado: "No celebrada" },
      { _id: "62c086b8c4299a4d26f2a190", nombreEstado: "Pospuesta" },
      { _id: "62c086ccc4299a4d26f2a192", nombreEstado: "En proceso" },
      { _id: "62c086d4c4299a4d26f2a194", nombreEstado: "Cancelada" }
    ];
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
