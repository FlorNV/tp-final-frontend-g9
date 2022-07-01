import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoReunion } from 'src/app/models/tipo-reunion';
import { TipoReunionService } from 'src/app/services/tipo-reunion.service';

@Component({
  selector: 'app-tipo-reunion',
  templateUrl: './tipo-reunion.component.html',
  styleUrls: ['./tipo-reunion.component.css']
})
export class TipoReunionComponent implements OnInit {

  tipo!: TipoReunion;
  respuesta:any;
  constructor(private tipoReunion: TipoReunionService,
    private modalService: NgbModal) { 
      this.tipo = new TipoReunion();
    }

    agregarTipoReunion(content:any){
       
          this.tipoReunion.addTypeMeeting(this.tipo).subscribe(
            (result)=>{
              if(result.status==201){
               this.respuesta=result;
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

    open(content: any) {
      this.modalService.open(content, { centered: true }).result.then(
        (result) =>{
  
        }, (reason) => {
  
        }
      )
    }
  ngOnInit(): void {
  }

}
