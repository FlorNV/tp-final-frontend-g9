import { Component, OnInit, Query, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RecursoDigital } from 'src/app/models/recurso-digital';
import { RecursoFisico } from 'src/app/models/recurso-fisico';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrls: ['./recurso-form.component.css']
})
export class RecursoFormComponent implements OnInit {

  @ViewChildren(DataTableDirective)
  dtElements!: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();

  recursoForm = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    recurso: new FormControl('',[Validators.required])
  })

  fisico: boolean = false;
  digital: boolean = false;
  recurso: boolean = false;
  modificar: boolean= false;
  new: boolean = false;

  recFisico!: RecursoFisico;
  recDigital!: RecursoDigital;
  respuesta!: any;
  recursosFisicos!: Array<RecursoFisico>;
  recursosDigitales!: Array<RecursoDigital>; 

  constructor(private recursoService: RecursoService,
              private modalService: NgbModal,
              router: Router) {
    
    
  }

  get nombre(){return this.recursoForm.get('nombre');}
  get recursoF(){return this.recursoForm.get('recurso');}

  ngOnInit():void {
    this.dtOptions = {
      autoWidth: false,
      pagingType: 'full_numbers',
      pageLength: 5,
      scrollX: true
    }
    this.cargarRecursosFisicos();
    this.cargarRecursosDigitales();
  }

  /** Accedo al servico para obtener todos los recursos fisicos de la Base de Datos*/
  cargarRecursosFisicos():void{
    this.recursoService.getRecursosFisicos().subscribe({
      next: (result) => {
        this.recursosFisicos = new Array<RecursoFisico>();
        result.data.recursos.forEach((element: any) => {
          let recFisico = new RecursoFisico();
          Object.assign(recFisico, element);
          this.recursosFisicos.push(recFisico);
        });
        this.new = false;
        this.rerender();
      }
    })
  }

  /** Accedo al servico para obtener todos los recursos digitales de la Base de Datos*/
  cargarRecursosDigitales(): void{
    this.recursoService.getRecursosDigitales().subscribe({
    next: (result) => {
        this.recursosDigitales = new Array<RecursoDigital>();
        result.data.recursos.forEach((element: any) => {
          let recDigital = new RecursoDigital();
          Object.assign(recDigital,element);
          this.recursosDigitales.push(recDigital);
        });
        this.new = false;
        this.rerender();
      }
    })
  }

  /** Carga un nuevo recurso fisico*/
  recursoFisico(){
    this.recFisico = new RecursoFisico();
    this.fisico = true;
    this.digital = false;
    this.new = true;
  }

  /** Carga un nuevo recurso digital*/
  recursoDigital(){
    this.recDigital = new RecursoDigital();
    this.digital = true;
    this.fisico = false;
    this.new = true;
  }

  /** Alta de un recurso fisico*/
  agregarRecursoFisico(content: any){
    this.recursoService.addRecursoFisico(this.recFisico).subscribe(
      (result) =>{
        if(result.status==201){
          this.respuesta = result;
          this.open(content);
        }
      },
      (error) => {
        if(error.status == 500){
          this.respuesta = error;
          this.open(content);
        }
      }
    )
    this.fisico= false;
    this.cargarRecursosFisicos();
    this.rerender();
  }

  /** Alta de un recurso digital*/
  agregarRecursoDigital(content: any) {
    this.recursoService.addRecursoDigital(this.recDigital).subscribe(
      (result) => {
        if(result.status==201){
          this.respuesta = result;
          this.open(content);
        }
      },
      (error) => {
        if(error.status == 500){
          this.respuesta = error;
          this.open(content);
        }
      }
    )
    this.digital = false;
    this.cargarRecursosDigitales();
    this.rerender();
  }

  cancelar(recursoForm: NgForm){
    this.modificar = false;
    recursoForm.resetForm();
  }

  /** Modal*/
  open(content: any) {
    this.modalService.open(content, { centered: true }).result.then(
      (result) =>{
        
      }, (reason) => {
        
      }
    )
  }

  /** Buscar recurso fisico por id*/
  cargarRecursoFisico(id: string){
    this.fisico = true;
    this.recFisico = new RecursoFisico();
    let result = this.recursosFisicos.filter(rf => rf._id == id)[0];
    Object.assign(this.recFisico,result);
    this.modificar = true;
  }

  /** Buscar recurso digital por id*/
  cargarRecursoDigital(id: string){
    this.digital = true;
    this.recDigital = new RecursoDigital();
    let result = this.recursosDigitales.filter(rd => rd._id == id)[0];
    Object.assign(this.recDigital,result);
    this.modificar = true;
  }

  /** Modificar un recurso fisico o digital*/
  modificarRecurso(content: any){
    if(this.fisico == true){
      this.recursoService.updateRecursosFisicos(this.recFisico).subscribe(
        (result) => {
          if(result.status == 200){
            this.respuesta = result;
            this.open(content);
          }
        }
      )
      this.fisico = false;
      this.modificar = false;
      this.cargarRecursosFisicos();
      this.rerender();
    }else{
      this.recursoService.updateRecursosDigital(this.recDigital).subscribe(
        (result) => {
          if(result.status == 200){
            this.respuesta = result;
            this.open(content);
          }
        }
      )
      this.digital = false;
      this.modificar = false;
      this.cargarRecursosDigitales();
      this.rerender();
    }
  }

  /** Elimina un recurso fisico por id (Falta arreglar)*/
  eliminarRecursoFisico(id: string){
    this.recursoService.deleteRecursoFisico(id).subscribe(
      (result) => {
        this.respuesta = result;
        this.cargarRecursosFisicos();
        this.rerender();
      }
    )
  }

  /** Eliminar recurso digital por id*/
  eliminarRecursoDigital(id: string){
    this.recursoService.deleteRecursoDigital(id).subscribe(
      (result) => {
        this.respuesta = result;
        this.cargarRecursosDigitales();
        this.rerender();
      }
    )
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(undefined);
    this.dtTrigger2.next(undefined);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }

  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      if(dtElement.dtInstance){
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      }
    });
      this.dtTrigger.next(undefined);
      this.dtTrigger2.next(undefined); 
  }

}
