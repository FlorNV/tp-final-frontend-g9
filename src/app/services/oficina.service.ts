import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oficina } from '../models/oficina';

@Injectable({
  providedIn: 'root'
})
export class OficinaService {

  URL: string;

  constructor(private _http: HttpClient) { 
    this.URL = "http://localhost:8000/api/v1/oficinas/";
  }

  public addOficina(oficina: Oficina): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(oficina);
    return this._http.post(this.URL, body, options);
  }

  public getOficinasByOcupacion(estaOcupada: boolean): Observable<any>{
    const options = {
      headers: new HttpHeaders({}),
      params: new HttpParams().set('estaOcupada', estaOcupada)
    };
    return this._http.get(this.URL, options);
  }

  public getOficinas(): Observable<any>{
    const options = {
      headers: new HttpHeaders({}),
    };
    return this._http.get(this.URL, options);
  }

  public updateOficina(oficina: Oficina): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(oficina);
    return this._http.put(this.URL + oficina._id, body, options)
  }

  public deleteOficina(id: string): Observable<any> {
    const options = { headers: new HttpHeaders ({}) };
    return this._http.delete(this.URL + id, options);
  }
}
