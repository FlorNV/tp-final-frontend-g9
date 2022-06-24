import { Component, OnInit, ViewChild } from '@angular/core';
import{DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs';

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


  constructor() { }

  ngOnInit(): void {
  }

}
