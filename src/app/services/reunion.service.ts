import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reunion } from '../models/reunion';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  URL: string;
  urlGoogleCalendar: string;
  
  constructor(private _http: HttpClient) { 
    this.URL = "http://localhost:8000/api/v1/reuniones/";
    this.urlGoogleCalendar = "https://www.googleapis.com/calendar/v3/calendars/bdilsomkl60pj67m0hpf687bt0@group.calendar.google.com/events";
  }

  public createEvent(event: any): Observable<any> { 
    const httpOptions = { 
      headers: new HttpHeaders({ 
        "Authorization": "Bearer ya29.a0ARrdaM_irStzOB0uPe_d4LS48fUKd7JpLtXVOtDUNY66-VkpfMJGieXE-bVfCcBamdP684mZJDsjVD6lRz3CawX5SO7QXcDzmN_CIj7LB-Zz7eA8IXT3bWJqpi5nVM7Gq0GW3I4wcB4E2WqqvFObDrkHwYi3", 
        "Accept": "application/ecmascript", 
        "Content-Type": "application/json" 
      }) 
    }; 
    let body = JSON.stringify(event);
    console.log(body); 
    return this._http.post(this.urlGoogleCalendar, body , httpOptions);
  }

  public addReunion(reunion: Reunion): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(reunion);
    return this._http.post(this.URL, body, options);
  }

  public getReuniones(): Observable<any> {
    const options = {
      headers: new HttpHeaders({})
    };
    return this._http.get(this.URL, options);
  }

  public updateReunion(reunion: Reunion): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(reunion);
    return this._http.put(this.URL + reunion._id, body, options);
  }

  public deleteReunion(id: string): Observable<any> {
    const options = {headers: new HttpHeaders({})};
    return this._http.delete(this.URL + id, options);
  }

  public getReunionById(id: string): Observable<any> {
    const options = {headers: new HttpHeaders({})};
    return this._http.get(this.URL + id, options);
  }
}
