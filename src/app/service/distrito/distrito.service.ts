import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Success } from '../../models/success/success';
import { Observable } from 'rxjs';
import { Distrito } from '../../models/distrito/distrito';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  private urlBase = 'http://localhost:8080/api/distrito';

  constructor(
    private http: HttpClient
  ) { }

  public findAll(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }

  public findById(id : string): Observable<Success> {
    return this.http.get<Success>(this.urlBase + "/" + id);
  }
  
  public add(distrito: Distrito): Observable<Success> {
    return this.http.post<Success>(this.urlBase, distrito);
  }
  
  public edit(distrito: Distrito, id: number): Observable<Success> {
    return this.http.post<Success>(this.urlBase + "/" + id, distrito);
  }
  
  public delete(id: number): Observable<Success> {
    return this.http.delete<Success>(this.urlBase + "/" + id);
  }
}
