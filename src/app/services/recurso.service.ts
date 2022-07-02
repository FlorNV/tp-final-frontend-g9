import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecursoDigital } from '../models/recurso-digital';
import { RecursoFisico } from '../models/recurso-fisico';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor(private _http: HttpClient) {
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

  public getRecursosFisicos(): Observable<any>{
    const options = {headers: new HttpHeaders({})};
    return this._http.get("http://localhost:8000/api/v1/recursos/",options);
  }

  public updateRecursosFisicos(recFisico: RecursoFisico): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(recFisico);
    return this._http.put("http://localhost:8000/api/v1/recursos/",body,options)
  }

  public deleteRecursoFisico(id: string): Observable<any> {
    const options = {headers: new HttpHeaders ({})};
    return this._http.delete("http://localhost:8000/api/v1/recursos/"+id,options);
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

  public getRecursosDigitales(): Observable<any>{
    const options = {headers: new HttpHeaders({})};
    return this._http.get("http://localhost:8000/api/v1/recursos-digitales/",options);
  }

  public updateRecursosDigital(recDigital: RecursoDigital): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(recDigital);
    return this._http.put("http://localhost:8000/api/v1/recursos-digitales/",body,options)
  }

  public deleteRecursoDigital(id: string): Observable<any> {
    const options = {headers: new HttpHeaders ({})};
    return this._http.delete("http://localhost:8000/api/v1/recursos-digitales/"+id,options);
  }

}
