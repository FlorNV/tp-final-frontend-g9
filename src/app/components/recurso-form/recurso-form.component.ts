import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecursoDigital } from 'src/app/models/recurso-digital';
import { RecursoFisico } from 'src/app/models/recurso-fisico';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrls: ['./recurso-form.component.css']
})
export class RecursoFormComponent implements OnInit {

  fisico: boolean = false;
  digital: boolean = false;
  recurso: boolean = false;
  recFisico!: RecursoFisico;
  recDigital!: RecursoDigital;
  respuesta!: any;

  constructor(private recursoService: RecursoService,
              private modalService: NgbModal) {
    this.recFisico = new RecursoFisico();
    this.recDigital = new RecursoDigital();
  }

  ngOnInit(): void {
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

}
