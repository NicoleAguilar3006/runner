import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoRegistrar } from '../models/producto-registrar';
import { Success } from '../models/success';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlBase = 'http://localhost:8080/api/producto';

  constructor(private http: HttpClient) { }

  listarProductos(): Observable<Success> {
    return this.http.get<Success>(this.urlBase + "/listado");
  }

  public registrar(producto: ProductoRegistrar): Observable<Success> {
    return this.http.post<Success>(this.urlBase, producto);
  }

  public buscar(id: string): Observable<Success> {
    return this.http.get<Success>(this.urlBase + `/${id}`);
  }

  public actualizar(id: string, producto: ProductoRegistrar): Observable<Success> {
    return this.http.put<Success>(this.urlBase + `/${id}`, producto);
  }
  
  public eliminar(id: string): Observable<Success> {
    return this.http.delete<Success>(this.urlBase + `/${id}`);
    }    
}
