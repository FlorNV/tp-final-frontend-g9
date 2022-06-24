import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableEmpleadoComponent } from './datatable-empleado.component';

describe('DatatableEmpleadoComponent', () => {
  let component: DatatableEmpleadoComponent;
  let fixture: ComponentFixture<DatatableEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatableEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
