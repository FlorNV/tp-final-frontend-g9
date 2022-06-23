import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Dependencia } from 'src/app/models/dependencia';
import { Empleado } from 'src/app/models/empleado';
import { DependenciaService } from 'src/app/services/dependencia.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

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

  constructor(private empleadoService: EmpleadoService, private dependenciaService: DependenciaService) { 
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'tipo',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true
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

  guardarEmpleado() {
    this.empleado.dependencias = this.assignDependencias(this.selectedItems);
    this.empleadoService.addEmpleado(this.empleado).subscribe(
      (result) => {
        if(result.status == 201) {
          alert(result.message);
        }
      },
      (error) => {
        if(error.status == 500) {
          alert(error.message);
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

  limpiarForm(form: NgForm) {
    form.resetForm();
  }
}
