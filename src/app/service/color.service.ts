import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Success } from '../models/success';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private urlBase = 'http://localhost:8080/api/color';
  constructor(private http: HttpClient) {}

  listarColores(): Observable<Success> {
    return this.http.get<Success>(this.urlBase + "/listado");
    }
}
