import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloRegistrar } from '../../models/modelo-registrar';
import { Success } from '../../models/success/success';
import { FiltroModelo } from '../../models/modelo/filtro-modelo';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private urlBase = 'http://localhost:8080/api/modelo';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }

  public findByAttributes(modelo: FiltroModelo): Observable<Success> {
    return this.http.post<Success>(this.urlBase + "/filtros", modelo);
  }

  public add(modelo: ModeloRegistrar): Observable<Success> {
    return this.http.post<Success>(this.urlBase, modelo);
  }

  public findById(id: string): Observable<Success> {
    return this.http.get<Success>(this.urlBase + `/${id}`);
  }


  public edit(modelo: ModeloRegistrar, id: number): Observable<Success> {
    return this.http.put<Success>(this.urlBase + `/${id}`, modelo);
  }

  public delete(id: number): Observable<Success> {
    return this.http.delete<Success>(this.urlBase + `/${id}`);
  }

  public listarPorIdMarca(idMrc: number): Observable<Success> {
    return this.http.get<Success>(`${this.urlBase}/marca/${idMrc}`);
  }

  public listProductoByModelo(id: string): Observable<Success> {
    return this.http.get<Success>(`${this.urlBase}/productos-modelo/${id}`);
  }
}
