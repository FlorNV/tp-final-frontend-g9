import { Component, ContentChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Dependencia } from 'src/app/models/dependencia';
import { Empleado } from 'src/app/models/empleado';
import { DependenciaService } from 'src/app/services/dependencia.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.css']
})
export class UpdateEmpleadoComponent implements OnInit {

  empleado: Empleado;
  dependencias!: Array<Dependencia>;
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  respuesta: any;

  constructor(private empleadoService: EmpleadoService, 
              private dependenciaService: DependenciaService, 
              private modalService: NgbModal,
              private activatedRoute:ActivatedRoute,
              private router:Router) { 
    
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
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => this.empleado._id=param.get('id')||'')
    this.cargarEmpleado(this.empleado._id)
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  modificarEmpleado(content: any) {
    this.empleado.dependencias = this.assignDependencias(this.selectedItems);
    this.empleadoService.updateEmpleado(this.empleado).subscribe(
      (result) => {
        if(result.status == 200) {
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

  cargarEmpleado(id:string){
  this.empleadoService.getEmpleado(id).subscribe({
    next:(result)=>{
        Object.assign(this.empleado,result['data']['empleado']);
    },
    error: () => {
      alert('Error en la peticion');
    },
  })
  }

  open(content: any) {
    this.modalService.open(content, { centered: true }).result.then((result)=>{
      this.router.navigate(['empleados']);
    },(reason)=>{
      this.router.navigate(['empleados']);
    });

  }

  limpiarForm(form: NgForm) {
    form.resetForm();
  }

  
  
  

  

}



