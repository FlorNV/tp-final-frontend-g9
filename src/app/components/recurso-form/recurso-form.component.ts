import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  fisico: boolean = false;
  digital: boolean = false;
  recurso: boolean = false;
  recFisico!: RecursoFisico;
  recDigital!: RecursoDigital;
  respuesta!: any;
  recursosFisicos!: Array<RecursoFisico>;
  recursosDigitales!: Array<RecursoDigital>; 

  constructor(private recursoService: RecursoService,
              private modalService: NgbModal,
              router: Router) {
    this.recFisico = new RecursoFisico();
    this.recDigital = new RecursoDigital();
  }

  ngOnInit(): void {
    this.dtOptions = {
      autoWidth: false,
      pagingType: 'full_numbers',
      pageLength: 5,
      scrollX: true
    }
    this.cargarRecursosFisicos();
    this.cargarRecursosDigitales();
  }

  cargarRecursosFisicos(): void{
    this.recursoService.getRecursosFisicos().subscribe(
      (result) => {
        this.recursosFisicos = new Array<RecursoFisico>();
        result.data.recursos.forEach((element: any) => {
          let recFisico = new RecursoFisico();
          Object.assign(recFisico, element);
          this.recursosFisicos.push(recFisico);
        });
        this.rerender();
      }
    )
  }

  cargarRecursosDigitales(): void {
    this.recursoService.getRecursosDigitales().subscribe(
    (result) => {
        this.recursosDigitales = new Array<RecursoDigital>();
        result.data.recursos.forEach((element: any) => {
          let recDigital = new RecursoDigital();
          Object.assign(recDigital,element);
          this.recursosDigitales.push(recDigital);
        });
        this.rerender();
      }
    )
  }

  recursoFisico(){
    this.fisico = true;
    this.digital = false;
  }

  recursoDigital(){
    this.digital = true;
    this.fisico = false;
  }

  agregarRecurso(content: any){
    if(this.fisico== true){
      this.recursoService.addRecursoFisico(this.recFisico).subscribe(
        (result) =>{
          if(result.status==201){
            this.respuesta = result;
            this.open(content);
            this.cargarRecursosFisicos();
          }
        },
        (error) => {
          if(error.status == 500){
            this.respuesta = error;
            this.open(content);
          }
          
        }
      )
    }else{
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
    }
  }

  open(content: any) {
    this.modalService.open(content, { centered: true }).result.then(
      (result) =>{
        
      }, (reason) => {
        
      }
    )
  }

  modificarRecursoFisico(id: string){

  }

  eliminarRecursoFisico(id: string){
    this.recursoService.deleteRecursoFisico(id).subscribe(
      (result) => {
        this.respuesta = result;
        this.cargarRecursosFisicos();
        this.rerender();
      }
    )
  }

  modificarRecursoDigital(id: string){

  }

  eliminarRecursoDigital(id: string){

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(undefined);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(undefined);   
    });
  }

}
