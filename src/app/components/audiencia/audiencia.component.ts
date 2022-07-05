import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Reunion } from 'src/app/models/reunion';
import { LoginService } from 'src/app/services/login.service';
import { ReunionService } from 'src/app/services/reunion.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-audiencia',
  templateUrl: './audiencia.component.html',
  styleUrls: ['./audiencia.component.css']
})
export class AudienciaComponent implements OnInit, OnDestroy  {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  reuniones!: Array<Reunion>;

  elementType: any;
  correctionLevel: any;
  value: string = "";

  constructor(private reunionService: ReunionService, 
              public loginService: LoginService,
              private modalService: NgbModal) { 
  
    this.elementType = NgxQrcodeElementTypes.URL;
    this.correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
    this.value = window.location.href;
  }

  ngOnInit(): void {
    this.dtOptions = {
      autoWidth: false,
      pagingType: 'full_numbers',
      pageLength: 3,
      scrollX: true
    };
    this.cargarReunionesPorParticipante();
  }

  cargarReunionesPorParticipante() {
    this.reunionService.getReuniones().subscribe(
      result => {
        this.reuniones = new Array<Reunion>();
        result.data.reuniones.forEach((element: any) => {
          let participante = element.participantes.find((p: any) => p._id == this.loginService.idLogged());
          if(participante != undefined){
            let reunion = new Reunion();
            Object.assign(reunion, element);
            this.reuniones.push(reunion);
          }
        });
        this.rerender();
      }
    )
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

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
