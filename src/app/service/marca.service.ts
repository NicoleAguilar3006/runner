import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Success } from '../models/success';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private urlBase = 'http://localhost:8080/api/marca';

  constructor(private http: HttpClient) {}

  listarMarcas(): Observable<Success> {
    return this.http.get<Success>(this.urlBase + "/listado");
  }

  public registrar(marca: Marca): Observable<Success> {
          return this.http.post<Success>(this.urlBase + "/crear", marca);
        }
}
