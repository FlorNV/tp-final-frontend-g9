import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Dependencia } from 'src/app/models/dependencia';
import { Empleado } from 'src/app/models/empleado';
import { DependenciaService } from 'src/app/services/dependencia.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  empleado: Empleado;
  dependencias!: Array<Dependencia>;
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  respuesta: any;

  constructor(private empleadoService: EmpleadoService, 
              private dependenciaService: DependenciaService, 
              private modalService: NgbModal) { 
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'tipo',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar'
    };
    this.empleado = new Empleado();
    this.empleado.rol = '';
    this.obtenerDependencias();
  }

  ngOnInit(): void {
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  guardarEmpleado(content: any) {
    this.empleado.dependencias = this.assignDependencias(this.selectedItems);
    this.empleadoService.addEmpleado(this.empleado).subscribe(
      (result) => {
        if(result.status == 201) {
          this.respuesta = result;
          this.open(content);
        }
      },
      (error) => {
        if(error.status == 500) {
          this.respuesta = error;
          this.open(content);
        }
      }
    )
  }

  obtenerDependencias() {
    this.dependenciaService.getDependencias().subscribe(
      (result) => {
        this.dependencias = new Array<Dependencia>();
        this.dependencias = this.assignDependencias(result.data.dependencias);
      }
    )
  }

  assignDependencias(arr: any): Array<Dependencia> {
    let dependencias = new Array<Dependencia>();
    arr.forEach((element: any) => {
      let dependencia = new Dependencia();
      Object.assign(dependencia, element);
      dependencias.push(dependencia);
    });
    return dependencias;
  }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  limpiarForm(form: NgForm) {
    form.resetForm();
  }
}
