import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoResponse } from '../models/producto-response';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlBase = 'http://localhost:8080/api/producto/listado';

  constructor(private http: HttpClient) {}

  listarProductos(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(this.urlBase);
    }
    
}
