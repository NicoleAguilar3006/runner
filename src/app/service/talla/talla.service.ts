import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from '../../models/success/success';
import { Talla } from '../../models/talla/talla';

@Injectable({
  providedIn: 'root'
})
export class TallaService {

  private urlBase = 'http://localhost:8080/api/talla';
  constructor(private http: HttpClient) { }

  public findAll(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }

  public add(talla: Talla): Observable<Success> {
    return this.http.post<Success>(this.urlBase, talla);
  }

  public edit(talla: Talla, id : number): Observable<Success> {
    return this.http.put<Success>(this.urlBase + "/" + id, talla);
  }
  
  public delete(id: number): Observable<Success> {
    return this.http.delete<Success>(this.urlBase + "/" + id);
  }
}
