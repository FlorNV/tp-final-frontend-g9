import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL: string;

  constructor( private _http: HttpClient) {
    this.URL = "http://localhost:27017/api/v1/autenticacion/login";
  }

  public autenticacion(login: Login): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const body = JSON.stringify(login)
    return this._http.post(this.URL+"/",body,options);
  }
}
