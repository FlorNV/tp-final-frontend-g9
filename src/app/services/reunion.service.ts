import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reunion } from '../models/reunion';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  URL: string;
  
  constructor(private _http: HttpClient) { 
    this.URL = "http://localhost:8000/api/v1/reuniones/";
  }

  addReunion(reunion: Reunion): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(reunion);
    return this._http.post(this.URL, body, options);
  }

  getReuniones(): Observable<any> {
    const options = {
      headers: new HttpHeaders({})
    };
    return this._http.get(this.URL, options);
  }
}
