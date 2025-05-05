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

  findAll(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }

  add(color: Color): Observable<Success> {
    return this.http.post<Success>(this.urlBase, color);
  }
}
