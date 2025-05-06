import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoRegistrar } from '../../models/producto-registrar';
import { Success } from '../../models/success/success';
import { FiltroProducto } from '../../models/producto/filtro-producto';
import { ProductoDTO } from '../../models/producto/producto-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase = 'http://localhost:8080/api/producto';

  constructor(private http: HttpClient) { }

  public findAllProductos(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
  }

  public findByAttributes(producto: FiltroProducto): Observable<Success> {
    return this.http.post<Success>(this.urlBase + "/filtros", producto);
  }

  public save(producto: ProductoDTO): Observable<Success> {
    return this.http.post<Success>(this.urlBase, producto);
  }

  public findById(id: string): Observable<Success> {
    return this.http.get<Success>(this.urlBase + `/${id}`);
  }

  public edit(producto: ProductoRegistrar, id: number): Observable<Success> {
    return this.http.put<Success>(this.urlBase + `/${id}`, producto);
  }

  public delete(id: string): Observable<Success> {
    return this.http.delete<Success>(this.urlBase + `/${id}`);
  }

  public listarPorIdModelo(idMdl: number): Observable<Success> {
    return this.http.get<Success>(`${this.urlBase}/modelo/${idMdl}`);
  }
}
