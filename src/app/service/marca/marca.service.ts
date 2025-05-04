import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../../models/marca/marca';
import { Success } from '../../models/success/success';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private urlBase = 'http://localhost:8080/api/marca';

  constructor(private http: HttpClient) { }

  public findAllMarcas(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }

  public registrar(marca: Marca): Observable<Success> {
    return this.http.post<Success>(this.urlBase, marca);
  }
}
