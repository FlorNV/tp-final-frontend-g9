import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoReunion } from '../models/tipo-reunion';

@Injectable({
  providedIn: 'root'
})
export class TipoReunionService {

  constructor(private _http:HttpClient) { }

  public addTypeMeeting(tipoReunion: TipoReunion):Observable<any>{
    const options ={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    const body = JSON.stringify(tipoReunion);
    return this._http.post("http://localhost:8000/api/v1/tipo-reunion/",body,options);
  }
}
