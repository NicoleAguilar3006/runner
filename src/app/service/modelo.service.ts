import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from '../models/success';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private urlBase = 'http://localhost:8080/api/modelo';

  constructor(private http: HttpClient) {}

  listarModelos(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
    }
}
