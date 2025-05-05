import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from '../../models/success/success';
import { Color } from '../../models/color/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private urlBase = 'http://localhost:8080/api/color';
  constructor(private http: HttpClient) { }

  public findAll(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }

  public add(color: Color): Observable<Success> {
    return this.http.post<Success>(this.urlBase, color);
  }

  public edit(color: Color, id: number): Observable<Success> {
    return this.http.put<Success>(this.urlBase + "/" + id, color);
  }
  
  public delete(id: number): Observable<Success> {
    return this.http.delete<Success>(this.urlBase + "/" + id);
  }
}
