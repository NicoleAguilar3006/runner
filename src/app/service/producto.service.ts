import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Success } from '../models/success/success';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlBase = 'http://localhost:8080/api/producto';

  constructor(private http: HttpClient) {}

  listarProductos(): Observable<Success> {
    return this.http.get<Success>(this.urlBase);
    }
    
}
