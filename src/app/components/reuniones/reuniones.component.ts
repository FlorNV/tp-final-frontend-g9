import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as printJS from "print-js";
import { Router } from '@angular/router';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrls: ['./reuniones.component.css']
})
export class ReunionesComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  reuniones!: Array<Reunion>;
  reunion!: Reunion;
  ver: boolean = false;
  respuesta!: any;

  elementType: any;
  correctionLevel: any;
  value: string = "";

  constructor(private reunionService: ReunionService,
              private router: Router,
              private modalService: NgbModal) { 

    this.reunion = new Reunion();
    this.elementType = NgxQrcodeElementTypes.URL;
    this.correctionLevel = NgxQrcodeErrorCorrectionLevels.LOW;
    this.value = window.location.href;
  }

  ngOnInit(): void {
    this.dtOptions = {
      autoWidth: false,
      pagingType: 'full_numbers',
      pageLength: 5,
      scrollX: true
    };
    this.cargarReuniones();
  }

  cargarReuniones(): void {
    this.reunionService.getReuniones().subscribe(
      result => {
        this.reuniones = new Array<Reunion>;
        result.data.reuniones.forEach((element: any) => {
          let reunion = new Reunion();
          Object.assign(reunion, element);
          this.reuniones.push(reunion);
        });
        this.rerender();
      }
    )
  }

  verReunion(reunion: Reunion) {
    this.reunion = reunion;
    this.ver = true;
  }

  imprimir() {
    printJS({
      printable: 'reunion',
      type: 'html',
      targetStyles: ['*'],
      header: 'Reunión',
      headerStyle: 'font-size: 40px; text-align: center'
    })
  }

  modificar(reunion: Reunion): void {
    this.router.navigate(['reunion-form', reunion._id]);
  }

  eliminar(reunion: Reunion, content: any): void {
    this.reunionService.deleteReunion(reunion._id).subscribe(
        result => {
          this.respuesta = result;
        },
        error => {
          this.respuesta = error;
        }
      )
      this.open(content);
      this.ver = false;
      this.cargarReuniones();
  }

  confirmarReunion(reunion: Reunion, content: any) {
    this.reunionService.confirmReunion(reunion._id).subscribe(
      result => {
        this.respuesta = result;
      },
      error => {
        this.respuesta = error;
      }
    )
    this.open(content);
  }

  open(content: any) {
    this.modalService.open(content, { centered: true });
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
