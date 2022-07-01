import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecursoDigital } from '../models/recurso-digital';
import { RecursoFisico } from '../models/recurso-fisico';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  //URL: string;

  constructor(private _http: HttpClient) {
    //this.URL = "http://localhost:27017/api/v1/recursos"
  }

  public addRecursoFisico(recFisico: RecursoFisico): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(recFisico);
    return this._http.post("http://localhost:8000/api/v1/recursos/",body,options);
  }

  public addRecursoDigital(recDigital: RecursoDigital): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(recDigital);
    return this._http.post("http://localhost:8000/api/v1/recursos-digitales/",body,options);
  }
}
