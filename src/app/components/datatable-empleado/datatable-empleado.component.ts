import { Component, OnInit, ViewChild } from '@angular/core';
import{DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';
import { Dependencia } from 'src/app/models/dependencia';
@Component({
  selector: 'app-datatable-empleado',
  templateUrl: './datatable-empleado.component.html',
  styleUrls: ['./datatable-empleado.component.css']
})
export class DatatableEmpleadoComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  empleados:Array<Empleado>=[];
  //salas:Array<Dependencia>=[];
  constructor(private empleadoService:EmpleadoService) { }

  getAllEmpleados(){
  this.empleadoService.getEmpleados().subscribe({
    next:(result) =>{
        this.empleados=result['data']['empleados'];
        console.log(this.empleados);
        this.rerender();
        
    },
    error: () => {
      alert('Error en la peticion');
    },
  })
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

  ngOnInit(): void {
    this.dtOptions = {
      autoWidth: false,
      pagingType: 'full_numbers',
      pageLength: 5,
      scrollX: true
    };
    this.getAllEmpleados();
  }

}
