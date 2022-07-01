import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { id } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  URL: string;

  constructor(private _http: HttpClient) { 
    this.URL = "http://localhost:27017/api/v1/empleados/";
  }

  public addEmpleado(empleado: Empleado): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(empleado);
    return this._http.post(this.URL, body, options);
  }

  public getEmpleados(): Observable<any> {
    const options = { headers: new HttpHeaders({}) };
    return this._http.get(this.URL, options);
  }

  public getEmpleado(id: string): Observable<any> {
    const option = { headers: new HttpHeaders({}) };
    return this._http.get(this.URL + id, option);
  }

  public updateEmpleado(empleado: Empleado): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(empleado);
    return this._http.put(this.URL + empleado._id, body, options);
  }

  public deleteEmpleado(id: string): Observable<any> {
    const options = {headers: new HttpHeaders({})};
    return this._http.delete(this.URL + id, options);
  }
}
